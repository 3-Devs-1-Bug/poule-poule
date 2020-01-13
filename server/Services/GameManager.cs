using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Hubs;
using System.IO;
using Api.Extensions;
using System.Threading;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Api.Services
{
  public interface IGameManager
  {
    Task StartRound(int gameId);
    void HitPile(int gameId, string playerId);
  }

  // This class is responsible for managing all on-going games on the platform.
  public class GameManager : IGameManager
  {
    private IHubContext<GameHub> _hub;
    private readonly IGameService _gameService;

    // Using a static property for keeping all game rounds in memory.
    // It needs to be thread safe, in case players hit the pile at the same time.
    private readonly static ConcurrentDictionary<int, GameRound> Rounds = new ConcurrentDictionary<int, GameRound>();

    public GameManager(IHubContext<GameHub> hub, IGameService gameService)
    {
      _hub = hub;
      _gameService = gameService;
    }

    public Task StartRound(int gameId)
    {
      var game = _gameService.Get(gameId);
      var round = new GameRound(_hub, gameId, game.CardSpeed);
      Rounds.AddOrUpdate(gameId, round, (key, oldValue) => round);
      return Task.CompletedTask;
    }

    public void HitPile(int gameId, string playerId)
    {
      Rounds.TryGetValue(gameId, out var round);
      int scoreToAdd = round.EndRound(playerId);
      _gameService.UpdatePlayerScore(playerId, scoreToAdd);
    }
  }
}
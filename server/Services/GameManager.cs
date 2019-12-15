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
    void EndRound(int gameId);
  }

  public class GameManager : IGameManager
  {
    private IHubContext<GameHub> _hub;
    private readonly IGameService _gameService;
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

    public void EndRound(int gameId)
    {
      Rounds.TryGetValue(gameId, out var round);
      round.EndRound();
    }
  }
}
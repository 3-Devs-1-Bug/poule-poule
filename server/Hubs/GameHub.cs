using Api.DTO;
using Api.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using Api.Extensions;

namespace Api.Hubs
{
  public class GameHub : Hub
  {
    private readonly IGameService _gameService;
    private readonly IGameManager _gameManager;
    private readonly static ConcurrentDictionary<int, GameRound> Rounds = new ConcurrentDictionary<int, GameRound>();

    public GameHub(IGameService gameService, IGameManager gameManager)
    {
      _gameService = gameService;
      _gameManager = gameManager;
    }

    private string GetPlayerId()
    {
      return Context.ConnectionId;
    }

    private int GetGameId()
    {
      int gameId = 0;
      if (!int.TryParse(Context.GetHttpContext().Request.Query["gameId"], out gameId))
        throw new InvalidOperationException("Game id is missing from query string");

      return gameId;
    }

    public override Task OnConnectedAsync()
    {
      string playerId = GetPlayerId();
      int gameId = GetGameId();
      string groupName = "game-" + gameId;

      _gameService.AddPlayer(gameId, playerId);

      var game = _gameService.Get(gameId);
      var gameDto = new GameDTO(game);

      Groups.AddToGroupAsync(Context.ConnectionId, groupName);
      Clients.Group(groupName).SendAsync("refreshGame", gameDto);

      return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
      string playerId = GetPlayerId();
      int gameId = GetGameId();
      string groupName = "game-" + gameId;

      Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
      _gameService.RemovePlayer(playerId);

      var game = _gameService.Get(gameId);
      var gameDto = new GameDTO(game);

      Clients.Group(groupName).SendAsync("refreshGame", gameDto);

      return base.OnDisconnectedAsync(exception);
    }

    public Task UpdateGameSettings(SettingsDTO settings)
    {
      int gameId = GetGameId();
      string groupName = "game-" + gameId;

      if (!Enum.TryParse(settings.difficulty, out Difficulty difficulty))
        throw new ArgumentException("Difficulty has an invalid value");

      if (settings.cardSpeed <= 0)
        throw new ArgumentException("Card speed must be a positive value");

      if (settings.roundsToWin <= 0)
        throw new ArgumentException("Rounds to win must be a positive value");

      var cardSpeed = TimeSpan.FromSeconds(settings.cardSpeed);

      var game = _gameService.UpdateSettings(gameId, difficulty, cardSpeed, settings.roundsToWin);
      var gameDto = new GameDTO(game);

      return Clients.Group(groupName).SendAsync("refreshGame", gameDto);
    }

    public Task HitPile()
    {
      string playerId = GetPlayerId();
      int gameId = GetGameId();
      string groupName = "game-" + gameId;

      _gameManager.HitPile(gameId, playerId);

      var game = _gameService.Get(gameId);
      _gameService.UpdateStatus(gameId, GameStatus.ROUND_ENDED);
      var gameDto = new GameDTO(game);
      Clients.Group(groupName).SendAsync("refreshGame", gameDto);

      return Task.CompletedTask;
    }

    public Task StartGame()
    {
      int gameId = GetGameId();
      var game = _gameService.UpdateStatus(gameId, GameStatus.ROUND_IN_PROGRESS);
      string groupName = "game-" + gameId;
      var gameDto = new GameDTO(game);
      Clients.Group(groupName).SendAsync("refreshGame", gameDto);

      _gameManager.StartRound(gameId);

      return Task.CompletedTask;
    }
  }
}
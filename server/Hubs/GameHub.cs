using Api.DTO;
using Api.Services;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Hubs
{
  public class GameHub : Hub
  {
    private readonly IGameService _gameService;

    public GameHub(IGameService gameService)
    {
      _gameService = gameService;
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

      Groups.AddToGroupAsync(Context.ConnectionId, groupName);
      Clients.Group(groupName).SendAsync("refreshGame");

      return base.OnConnectedAsync();
    }
    public override Task OnDisconnectedAsync(Exception exception)
    {
      string playerId = GetPlayerId();
      int gameId = GetGameId();
      string groupName = "game-" + gameId;

      Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
      _gameService.RemovePlayer(playerId);

      Clients.Group(groupName).SendAsync("refreshGame");

      return base.OnDisconnectedAsync(exception);
    }
  }
}
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

    public override Task OnConnectedAsync()
    {
      return base.OnConnectedAsync();
    }
  }
}
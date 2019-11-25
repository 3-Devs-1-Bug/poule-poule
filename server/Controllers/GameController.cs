using System;
using System.Collections.Generic;
using System.Linq;
using Api.DTO;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class GameController : ControllerBase
  {
    private readonly IGameService _gameService;

    public GameController(IGameService gameService)
    {
      _gameService = gameService;
    }

    [HttpPost]
    public ActionResult CreateGame()
    {
      var game = _gameService.Create();
      var gameDto = new GameDTO(game);
      return Ok(gameDto);
    }

    [HttpGet("{gameId}")]
    public ActionResult GetGame(int gameId)
    {
      var game = _gameService.Get(gameId);
      var gameDto = new GameDTO(game);
      return Ok(gameDto);
    }

    [HttpPost("{gameId}/player")]
    public ActionResult AddPlayer(int gameId)
    {
      string playerId = _gameService.AddPlayer(gameId);
      return Ok(new { playerId = playerId });
    }
  }
}

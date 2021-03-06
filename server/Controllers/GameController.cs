﻿using System;
using System.Collections.Generic;
using System.Linq;
using Api.DTO;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
  [ApiController]
  [Route("games")]
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

    [HttpPost("{gameId}/players")]
    public ActionResult AddPlayer(int gameId)
    {
      try
      {
        var player = _gameService.AddPlayer(gameId);
        var playerDto = new PlayerDTO(player);
        return Ok(playerDto);
      }
      catch (InvalidOperationException exception)
      {
        return BadRequest(new { error = exception.Message });
      }
    }

    [HttpGet]
    public ActionResult GetGames()
    {
      var games = _gameService.GetActive();
      var gameItemsDto = games.Select(game => new GameItemDTO(game));
      return Ok(gameItemsDto);
    }
  }
}

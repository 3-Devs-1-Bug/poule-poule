using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Data;

namespace Api.Services
{
  public interface IGameService
  {
    Game Create();
    Game Get(int gameId);
    string AddPlayer(int gameId, string playerId = null);
  }

  public class GameService : IGameService
  {
    private readonly PouleContext _dbContext;

    public GameService(PouleContext dbContext)
    {
      _dbContext = dbContext;
    }

    public Game Create()
    {
      var game = new Game();
      game.CreationDate = DateTime.UtcNow;
      game.HostId = Guid.NewGuid().ToString();
      game.Status = GameStatus.PENDING_START;

      _dbContext.Games.Add(game);
      _dbContext.SaveChanges();

      this.AddPlayer(game.Id, game.HostId);

      return game;
    }

    public Game Get(int gameId)
    {
      var game = _dbContext.Games
        .Include(g => g.Players)
        .Where(game => game.Id == gameId)
        .FirstOrDefault();
      return game;
    }

    public string AddPlayer(int gameId, string playerId = null)
    {
      var game = _dbContext.Games.Find(gameId);

      if(game.Status != GameStatus.PENDING_START)
        throw new InvalidOperationException("You can't join a game that has already started");

      var player = new Player();
      player.Id = playerId ?? Guid.NewGuid().ToString();
      player.CreationDate = DateTime.UtcNow;

      game.Players.Add(player);
      _dbContext.SaveChanges();

      return player.Id;
    }
  }
}
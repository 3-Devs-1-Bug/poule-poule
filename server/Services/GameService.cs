using System;
using System.Linq;
using System.Collections.Generic;
using Api.Data.Entities;
using Api.Data;

namespace Api.Services
{
  public interface IGameService
  {
    Game Create();
    Game Get(int gameId);
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
      game.Status = GameStatus.PendingStart;

      _dbContext.Games.Add(game);
      _dbContext.SaveChanges();
      return game;
    }

    public Game Get(int gameId)
    {
      var game = _dbContext.Games.Find(gameId);
      return game;
    }
  }
}
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Data;
using System.IO;

namespace Api.Services
{
  public interface IGameService
  {
    Game Create();
    Game Get(int gameId);
    Player AddPlayer(int gameId, string playerId = null);
    void RemovePlayer(string playerId);
    Game UpdateSettings(int gameId, Difficulty difficulty, TimeSpan cardSpeed, int roundsToWin);
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

      game.CardSpeed = new TimeSpan(0, 0, 0, 1, 500);
      game.Difficulty = Difficulty.EASY;
      game.RoundsToWin = 3;

      _dbContext.Games.Add(game);
      _dbContext.SaveChanges();

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

    public Game UpdateSettings(int gameId, Difficulty difficulty, TimeSpan cardSpeed, int roundsToWin)
    {
      var game = this.Get(gameId);
      game.CardSpeed = cardSpeed;
      game.Difficulty = difficulty;
      game.RoundsToWin = roundsToWin;
      _dbContext.SaveChanges();
      return game;
    }

    public Player AddPlayer(int gameId, string playerId = null)
    {
      var game = _dbContext.Games.Find(gameId);

      if (game.Status != GameStatus.PENDING_START)
        throw new InvalidOperationException("You can't join a game that has already started");

      var player = new Player();
      player.Id = playerId ?? Guid.NewGuid().ToString();
      player.Name = GetRandomName();
      player.CreationDate = DateTime.UtcNow;

      game.Players.Add(player);
      _dbContext.SaveChanges();

      return player;
    }

    public void RemovePlayer(string playerId)
    {
      var player = _dbContext.Players.Find(playerId);
      if (player == null)
        throw new ArgumentException($"The playerId {playerId} was not found.");
      _dbContext.Players.Remove(player);
      _dbContext.SaveChanges();
    }

    private string GetRandomName()
    {
      Random random = new Random();
      string filePath = Path.Combine(Environment.CurrentDirectory, "Data/video-game-characters.txt");
      List<string> names = File.ReadLines(filePath).ToList();
      int randomInt = random.Next(0, names.Count);
      string randomName = names[randomInt];
      return randomName;
    }
  }
}
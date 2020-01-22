using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Data;
using System.IO;
using Api.Extensions;

namespace Api.Services
{
  public interface IGameService
  {
    Game Create();
    List<Game> GetActive();
    Game Get(int gameId);
    Player AddPlayer(int gameId, string playerId = null);
    void RemovePlayer(int gameId, string playerId);
    Game UpdateSettings(int gameId, Difficulty difficulty, TimeSpan cardSpeed, int roundsToWin);
    Game UpdateStatus(int gameId, GameStatus status);
    int? UpdatePlayerScore(string playerId, int value);
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
      game.Status = GameStatus.WAITING_FOR_PLAYERS;

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

    public List<Game> GetActive()
    {
      var games = _dbContext.Games
        .Include(game => game.Players)
        .Where(game => game.Status != GameStatus.GAME_OVER && game.Players.Count > 0)
        .OrderByDescending(game => game.CreationDate)
        .ToList();
      return games;
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

    public Game UpdateStatus(int gameId, GameStatus status)
    {
      var game = this.Get(gameId);
      game.Status = status;
      _dbContext.SaveChanges();
      return game;
    }

    public Player AddPlayer(int gameId, string playerId = null)
    {
      var game = _dbContext.Games.Find(gameId);

      if (game.Status == GameStatus.GAME_OVER || game.Status == GameStatus.ROUND_IN_PROGRESS)
        return null;

      var player = new Player();
      player.Id = playerId ?? Guid.NewGuid().ToString();
      player.Name = GetRandomName();
      player.CreationDate = DateTime.UtcNow;

      game.Players.Add(player);
      _dbContext.SaveChanges();

      return player;
    }

    public void RemovePlayer(int gameId, string playerId)
    {
      var game = this.Get(gameId);

      var player = game.Players.Where(player => player.Id == playerId).FirstOrDefault();
      if (player == null)
        throw new ArgumentException($"The playerId {playerId} was not found.");

      // Keep player if game is over to persist score
      if (game.Status != GameStatus.GAME_OVER)
      {
        _dbContext.Players.Remove(player);
        _dbContext.SaveChanges();
      }
    }

    // A player can win or lose points
    // If the player can't be found, it means he has probably left the game: do nothing
    public int? UpdatePlayerScore(string playerId, int value)
    {
      var player = _dbContext.Players.Find(playerId);
      if (player == null)
        return null;
      player.Score = player.Score + value;
      _dbContext.SaveChanges();
      return player.Score;
    }

    private string GetRandomName()
    {
      Random random = new Random();
      string filePath = Path.Combine(Environment.CurrentDirectory, "Data/video-game-characters.txt");
      List<string> names = File.ReadLines(filePath).ToList();
      names.Shuffle();
      return names[0];
    }
  }
}
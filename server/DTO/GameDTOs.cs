using System;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;
using Api.Data.Entities;

namespace Api.DTO
{
  public class CreateGameDTO
  {
    // game options would go here
  }

  public class GameDTO
  {
    public GameDTO(Game game)
    {
      id = game.Id;
      hostId = game.HostId;
      status = game.Status.ToString();
      creationDate = game.CreationDate.ToString("o", CultureInfo.InvariantCulture);
      difficulty = game.Difficulty.ToString();
      cardSpeed = game.CardSpeed.TotalSeconds;
      roundsToWin = game.RoundsToWin;
      players = game.Players.OrderBy(p => p.CreationDate).Select(player => new PlayerDTO(player)).ToArray();
    }
    public int id { get; set; }
    public string hostId { get; set; }
    public string status { get; set; }
    public string creationDate { get; set; }
    public string difficulty { get; set; }
    public double cardSpeed { get; set; }
    public int roundsToWin { get; set; }
    public PlayerDTO[] players { get; set; }
  }

  // A lightweight version of a GameDTO, used to display a list of games
  public class GameItemDTO
  {
    public GameItemDTO(Game game)
    {
      id = game.Id;
      creationDate = game.CreationDate.ToString("o", CultureInfo.InvariantCulture);
      difficulty = game.Difficulty.ToString();
      cardSpeed = game.CardSpeed.TotalSeconds;
      roundsToWin = game.RoundsToWin;
      playerCount = game.Players.Count;
    }
    public int id { get; set; }
    public string creationDate { get; set; }
    public string difficulty { get; set; }
    public double cardSpeed { get; set; }
    public int roundsToWin { get; set; }
    public int playerCount { get; set; }
  }

  public class SettingsDTO
  {
    public string difficulty { get; set; }
    public double cardSpeed { get; set; }
    public int roundsToWin { get; set; }
  }

  public class PlayerDTO
  {
    public PlayerDTO(Player player)
    {
      id = player.Id;
      name = player.Name;
      score = player.Score;
    }
    public string id { get; set; }
    public string name { get; set; }
    public int score { get; set; }
  }

  public class RoundResultDTO
  {
    public int count { get; set; }
    public string playerId { get; set; }
    public bool hasWon { get; set; }
  }
}
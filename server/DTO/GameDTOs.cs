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
      players = game.Players.OrderBy(p => p.CreationDate).Select(player => new PlayerDTO(player)).ToArray();
    }
    public int id { get; set; }
    public string hostId { get; set; }
    public string status { get; set; }
    public string creationDate { get; set; }
    public PlayerDTO[] players { get; set; }
  }

  public class PlayerDTO
  {
    public PlayerDTO(Player player)
    {
       id = player.Id;
       name = player.Name;
    }
    public string id { get; set; }
    public string name { get; set; }
  }
}
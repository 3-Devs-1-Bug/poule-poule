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
      playerIds = game.Players.Select(p => p.Id).ToArray();
    }
    public int id { get; set; }
    public string hostId { get; set; }
    public string status { get; set; }
    public string creationDate { get; set; }
    public string[] playerIds { get; set; }
  }
}
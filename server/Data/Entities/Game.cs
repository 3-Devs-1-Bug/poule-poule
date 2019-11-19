using System;
using System.Collections.Generic;

namespace Api.Data.Entities
{
  public class Game
  {
    public string Id { get; set; }
    public string HostId { get; set; }
    public GameStatus Status { get; set; }
    public DateTime CreationDate { get; set; }
  }
}
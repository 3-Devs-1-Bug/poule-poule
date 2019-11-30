using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Data.Entities
{
  public class Game
  {
    [Key]
    public int Id { get; set; }
    public string HostId { get; set; }
    public GameStatus Status { get; set; }
    public DateTime CreationDate { get; set; }

    public ICollection<Player> Players { get; } = new List<Player>();
  }
}
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
    public Difficulty Difficulty { get; set; }
    public TimeSpan CardSpeed { get; set; }
    public int RoundsToWin { get; set; }

    public ICollection<Player> Players { get; } = new List<Player>();
  }
}
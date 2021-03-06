using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Data.Entities
{
  public class Player
  {
    [Key]
    public string Id { get; set; }
    public string Name { get; set; }
    public int Score { get; set; }
    public DateTime CreationDate { get; set; }

    public Game Game { get; set; }
  }
}
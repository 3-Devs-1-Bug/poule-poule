using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Data.Entities
{
  public class Saying
  {
    [Key]
    public int Id { get; set; }
    public string Content { get; set; }
  }
}
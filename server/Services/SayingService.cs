using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Data;
using System.IO;

namespace Api.Services
{
  public interface ISayingService
  {
    string GetRandom();
  }

  public class SayingService : ISayingService
  {
    private readonly PouleContext _dbContext;

    public SayingService(PouleContext dbContext)
    {
      _dbContext = dbContext;
    }

    public string GetRandom()
    {
      var randomSaying = _dbContext.Sayings.OrderBy(saying => Guid.NewGuid())
                                           .Take(1)
                                           .FirstOrDefault();
      return randomSaying.Content;
    }
  }
}
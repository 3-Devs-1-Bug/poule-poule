using System.Collections.Generic;
using Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class PouleContext : DbContext
  {
    public PouleContext(DbContextOptions<PouleContext> options)
      : base(options)
    { }

    public DbSet<Game> Games { get; set; }
    public DbSet<Player> Players { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // prevent pluralization of table names
      modelBuilder.Entity<Game>().ToTable("Game");
      modelBuilder.Entity<Player>().ToTable("Player");

      modelBuilder.Entity<Game>()
        .HasMany(g => g.Players)
        .WithOne(p => p.Game);
    }
  }
}
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
    public DbSet<Saying> Sayings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // prevent pluralization of table names
      modelBuilder.Entity<Game>().ToTable("Game");
      modelBuilder.Entity<Player>().ToTable("Player");
      modelBuilder.Entity<Saying>().ToTable("Saying");

      modelBuilder.Entity<Game>()
        .HasMany(g => g.Players)
        .WithOne(p => p.Game);

      Seed(modelBuilder);
    }

    private void Seed(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 1, Content = "Mon coq est lâché, gardez vos poules !"});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 2, Content = "Il ne faut pas compter les œufs au cul de la poule."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 3, Content = "Poule qui chante et coq qui danse méritent la potence."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 4, Content = "Qui prend le coq pour guide aura un poulailler pour refuge."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 5, Content = "Si l'on veut l'œuf, qu'on supporte la poule."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 6, Content = "Poule promeneuse devient la proie du renard."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 7, Content = "Quand le renard se met à prêcher, prends garde à ta poule."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 8, Content = "Une poule ne se confesse pas au renard."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 9, Content = "La poule affamée trouve elle-même l'orge au grenier."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 10, Content = "On ne confie pas des poules à un renard."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 11, Content = "L'œuf d'aujourd'hui vaut mieux que la poule de demain."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 12, Content = "Même la poule à un cœur."});
      modelBuilder.Entity<Saying>().HasData(new Saying {Id = 13, Content = "La poule domestique chasse la poule sauvage."});
    }
  }
}
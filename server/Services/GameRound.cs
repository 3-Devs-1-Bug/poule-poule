using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Api.Data.Entities;
using Api.Hubs;
using System.IO;
using Api.Extensions;
using System.Threading;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Api.Services
{
  public class GameRound
  {
    private readonly int EggCards = 10;
    private readonly int HenCards = 5;
    private readonly int FoxCards = 5;

    private Timer GameTimer;

    public List<Card> Deck { get; set; }
    private List<Card> Pile { get; set; }

    // Amount of eggs, taking into account the amount of hens and foxes
    public int Count { get; private set; }

    public bool RoundOver { get; private set; }
    public bool CorrectCount { get { return Count == 5; } }

    private IHubContext<GameHub> Hub { get; set; }

    private int GameId { get; set; }

    public GameRound(IHubContext<GameHub> hub, int gameId, TimeSpan cardSpeed)
    {
      Hub = hub;
      GameId = gameId;

      Deck = new List<Card>();
      Pile = new List<Card>();

      for (int i = 0; i < EggCards; i++)
        Deck.Add(Card.EGG);

      for (int i = 0; i < HenCards; i++)
        Deck.Add(Card.HEN);

      for (int i = 0; i < FoxCards; i++)
        Deck.Add(Card.FOX);

      Deck.Shuffle();

      Hub.Clients.Group($"game-{gameId}").SendAsync("roundStart");

      int delay = (int)cardSpeed.TotalMilliseconds;

      GameTimer = new Timer(state => DrawCard(), null, delay, delay);
    }

    public void DrawCard()
    {
      if (Deck.Count <= 0)
        throw new InvalidOperationException("Deck is empty");

      var card = Deck[0];
      Deck.RemoveAt(0);
      Pile.Add(card);

      Hub.Clients.Group($"game-{GameId}").SendAsync("receiveCard", card.ToString());
    }

    public void EndRound()
    {
      GameTimer.Dispose();
      RoundOver = true;
      int eggs = 0;
      int activeChickens = 0;
      int activeFoxes = 0;

      Pile.ForEach(card =>
      {
        switch (card)
        {
          case Card.EGG:
            eggs++;
            break;
          case Card.HEN:
            if (eggs > 0)
            {
              eggs--;
              activeChickens++;
            }
            break;
          case Card.FOX:
            if (activeChickens > 0)
            {
              activeFoxes++;
              eggs++;
              activeChickens--;
            }
            break;
        }
      });
      Count = eggs;
      Hub.Clients.Group($"game-{GameId}").SendAsync("roundEnded", Count);
    }
  }

  public enum Card
  {
    EGG,
    HEN,
    FOX
  }
}
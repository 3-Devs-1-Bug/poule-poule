using System;
using System.Linq;
using System.Collections.Generic;
using Api.Hubs;
using Api.Extensions;
using System.Threading;
using Microsoft.AspNetCore.SignalR;
using Api.DTO;

namespace Api.Services
{
  public class GameRound
  {
    private readonly int EggCards = 19;
    private readonly int HenCards = 10;
    private readonly int FoxCards = 10;

    private Timer GameTimer;

    private List<CardType> Deck { get; set; }
    private List<CardType> Pile { get; set; }
    private bool CorrectCount(int count) { return count >= 5; }
    private IHubContext<GameHub> Hub { get; set; }
    private string GroupName { get; set; }

    public GameRound(IHubContext<GameHub> hub, int gameId, TimeSpan cardSpeed)
    {
      Hub = hub;
      GroupName = Helpers.GetGroupName(gameId);

      Hub.Clients.Group(GroupName).SendAsync("roundStart");

      Deck = new List<CardType>();
      Pile = new List<CardType>();

      for (int i = 0; i < EggCards; i++)
        Deck.Add(CardType.EGG);

      for (int i = 0; i < HenCards; i++)
        Deck.Add(CardType.HEN);

      for (int i = 0; i < FoxCards; i++)
        Deck.Add(CardType.FOX);

      Deck.Shuffle();

      int delay = Convert.ToInt32(cardSpeed.TotalMilliseconds);
      GameTimer = new Timer(state => DrawCard(), null, delay, delay);
    }

    private void DrawCard()
    {
      if (Deck.Count <= 0)
      {
        EndRound(null);
        return;
      }

      var card = Deck[0];
      Deck.RemoveAt(0);
      Pile.Add(card);

      Hub.Clients.Group(GroupName).SendAsync("receiveCard", card.ToString());
    }

    public int EndRound(string playerId)
    {
      GameTimer.Dispose();
      // amount of eggs taking into account hens and foxes
      int count = 0;
      int activeHens = 0;
      int activeFoxes = 0;

      Pile.ForEach(card =>
      {
        switch (card)
        {
          case CardType.EGG:
            count++;
            break;
          case CardType.HEN:
            if (count > 0)
            {
              count--;
              activeHens++;
            }
            break;
          case CardType.FOX:
            if (activeHens > 0)
            {
              activeFoxes++;
              count++;
              activeHens--;
            }
            break;
        }
      });
      var result = new RoundResultDTO();
      result.count = count;
      result.playerId = playerId;
      result.hasWon = CorrectCount(count);

      Hub.Clients.Group(GroupName).SendAsync("roundEnded", result);

      int scoreToAdd = result.hasWon ? 1 : -1;
      return scoreToAdd;
    }
  }
}
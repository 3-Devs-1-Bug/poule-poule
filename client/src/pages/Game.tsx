import React, { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps } from '@reach/router'
import { HubConnection } from '@microsoft/signalr'
import { uniqueId } from 'lodash-es'

import connectToGameHub from '../utils/signalrConnector'
import { Game as GameType } from '../types/Game'
import { GameStatus } from '../types/GameStatus'
import { RoundResult } from '../types/RoundResult'
import { CardType } from '../types/CardType'
import { Card } from '../types/Card'
import Round from './Round'
import Scores from './Scores'
import Lobby from './Lobby'
import { Settings } from '../types/Settings'
import Podium from '../components/Podium'

export interface GameProps extends RouteComponentProps {
  id?: string
}

const Game: FC<GameProps> = (props: GameProps) => {
  const [game, setGame] = useState<GameType>()
  const [hubConnection, setHubConnection] = useState<HubConnection>()
  const [currentPlayerId, setCurrentPlayerId] = useState<string>()
  const [cards, setCards] = useState<Array<Card>>([])
  const [result, setResult] = useState<RoundResult>()

  useEffect(() => {
    const loadGame = async () => {
      const getGameResponse: AxiosResponse<GameType> = await axios.get(
        `/games/${props.id}`
      )
      return getGameResponse.data
    }
    const onLoad = async () => {
      var game = await loadGame()
      setGame(game)

      if (game.status !== GameStatus.ROUND_IN_PROGRESS) {
        const connection = connectToGameHub(game.id)
        connection.start().then(() => {
          connection.connectionId && setCurrentPlayerId(connection.connectionId)
        })
        connection.on('refreshGame', (game: GameType) => {
          setGame(game)
        })
        connection.on('roundStart', () => {
          setResult(undefined)
          setCards([])
        })
        connection.on('receiveCard', (receivedCard: CardType) =>
          setCards(cards =>
            cards.concat({ type: receivedCard, id: uniqueId() })
          )
        )
        connection.on('roundEnded', (result: RoundResult) => {
          setResult(result)
        })

        setHubConnection(connection)
      }
    }

    onLoad()
  }, [props.id])

  if (game) {
    if (game.status === GameStatus.GAME_OVER) {
      const topPlayers = game.players.sort((a, b) =>
        a.score > b.score ? -1 : a.score < b.score ? 1 : 0
      )
      return <Podium players={topPlayers} currentPlayerId={currentPlayerId} />
    }

    if (!currentPlayerId && game.status === GameStatus.ROUND_IN_PROGRESS)
      return <p>La partie est en cours, vous ne pouvez la rejoindre.</p>

    if (currentPlayerId && game.players.length && hubConnection) {
      // The oldest member of the lobby is the host
      const isGameHost = game.players[0].id === currentPlayerId

      switch (game.status) {
        case GameStatus.WAITING_FOR_PLAYERS:
          return (
            <Lobby
              game={game}
              currentPlayerId={currentPlayerId}
              isGameHost={isGameHost}
              startGame={() => hubConnection.invoke('StartGame')}
              updateGameSettings={(settings: Settings) =>
                hubConnection.invoke('UpdateGameSettings', settings)
              }
            />
          )
        case GameStatus.ROUND_IN_PROGRESS:
          return (
            <Round
              game={game}
              cards={cards}
              hitPile={() => hubConnection.invoke('HitPile')}
            />
          )
        case GameStatus.ROUND_ENDED:
          if (result) {
            return (
              <Scores
                game={game}
                currentPlayerId={currentPlayerId}
                isGameHost={isGameHost}
                result={result}
                startGame={() => hubConnection.invoke('StartGame')}
              />
            )
          }
      }
    }
  }
  return null
}

export default Game

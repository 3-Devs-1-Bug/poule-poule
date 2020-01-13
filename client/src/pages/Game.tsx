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
import Lobby from './Lobby'
import { Settings } from '../types/Settings'

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

  if (game && currentPlayerId && game.players.length && hubConnection) {
    // The oldest member of the lobby is the host
    const isGameHost = game.players[0].id === currentPlayerId

    if (game.status === GameStatus.WAITING_FOR_PLAYERS) {
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
    } else if (
      game.status === GameStatus.ROUND_IN_PROGRESS ||
      game.status === GameStatus.ROUND_ENDED
    ) {
      return (
        <Round
          game={game}
          currentPlayerId={currentPlayerId}
          isGameHost={isGameHost}
          cards={cards}
          result={result}
          hitPile={() => hubConnection.invoke('HitPile')}
          startGame={() => hubConnection.invoke('StartGame')}
        />
      )
    }
  }
  return <>La partie est en cours.</>
}

export default Game

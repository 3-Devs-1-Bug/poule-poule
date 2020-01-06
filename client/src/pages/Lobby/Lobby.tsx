import React, { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps } from '@reach/router'
import { HubConnection } from '@microsoft/signalr'
import { uniqueId } from 'lodash-es'

import { Settings as SettingsType } from '../../types/Settings'
import connectToGameHub from '../../utils/signalrConnector'
import { Game } from '../../types/Game'
import Settings from '../../components/Settings'
import PlayerList from '../../components/PlayerList'
import './Lobby.scss'
import Button from '../../components/Button'
import CardPile from '../../components/CardPile'
import { GameStatus } from '../../types/GameStatus'
import { RoundResult } from '../../types/RoundResult'
import { Player } from '../../types/Player'
import { CardType } from '../../types/CardType'
import { Card } from '../../types/Card'

export interface LobbyProps extends RouteComponentProps {
  id?: string
}

const Lobby: FC<LobbyProps> = (props: LobbyProps) => {
  const [game, setGame] = useState<Game>()
  const [hubConnection, setHubConnection] = useState<HubConnection>()
  const [currentPlayerId, setCurrentPlayerId] = useState<string>()
  const [cards, setCards] = useState<Array<Card>>([])
  const [result, setResult] = useState<RoundResult>()

  useEffect(() => {
    const loadGame = async () => {
      const getGameResponse: AxiosResponse<Game> = await axios.get(
        `/games/${props.id}`
      )
      return getGameResponse.data
    }
    const onLoad = async () => {
      var game = await loadGame()
      setGame(game)

      if (game.status === GameStatus.PENDING_START) {
        const connection = connectToGameHub(game.id)
        connection.start().then(() => {
          connection.connectionId && setCurrentPlayerId(connection.connectionId)
        })
        connection.on('refreshGame', (game: Game) => {
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

  // The oldest member of the lobby is the host
  const isGameHost = (game: Game, playerId: string) => {
    return game.players[0].id === playerId
  }

  const buildResultText = (
    result: RoundResult,
    players: Array<Player>
  ): string => {
    if (!result.playerId) return `Personne n'a tapé sur la pile`
    else {
      let firstPart = ''
      if (result.playerId === currentPlayerId) {
        firstPart = 'Vous avez'
      } else {
        const player = players.find(player => player.id === result.playerId)
        firstPart = `${(player && player.name) || 'Un joueur inconnu'} a`
      }
      return `${firstPart} ${result.hasWon ? 'gagné' : 'perdu'}`
    }
  }

  return (
    <div className='Lobby'>
      {game && currentPlayerId && game.players.length && hubConnection && (
        <>
          <p className='Lobby__Intro'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
            tempore nihil ut amet suscipit quis ab dolorem ipsam repellat quidem
            quaerat sunt necessitatibus eum, earum sed consectetur eligendi
            cupiditate laborum.
          </p>
          {isGameHost(game, currentPlayerId) ? (
            <Settings
              className='Lobby__Settings'
              difficulty={game.difficulty}
              roundsToWin={game.roundsToWin}
              cardSpeed={game.cardSpeed}
              updateSettings={(settings: SettingsType) =>
                hubConnection.invoke('UpdateGameSettings', settings)
              }
            />
          ) : (
            <ul>
              <li>
                Niveau de difficulté: <strong>{game.difficulty}</strong>
              </li>
              <li>
                Nombre de manches pour gagner:{' '}
                <strong>{game.roundsToWin}</strong>
              </li>
              <li>
                Temps entre chaque carte: <strong>{game.cardSpeed}</strong>{' '}
                secondes
              </li>
            </ul>
          )}

          <PlayerList
            className='Lobby__Players'
            players={game.players}
            currentPlayerId={currentPlayerId}
          />
          <div>
            <h2>Cartes</h2>
            <CardPile cards={cards} />
            {result && (
              <>
                <p>{buildResultText(result, game.players)}</p>
                <p>{`Il y avait ${result.count} oeuf(s).`}</p>
              </>
            )}
          </div>
          {game.status === GameStatus.PENDING_START &&
            isGameHost(game, currentPlayerId) && (
              <Button onClick={() => hubConnection.invoke('StartGame')}>
                Commencer la partie
              </Button>
            )}
          {game.status === GameStatus.IN_PROGRESS && (
            <Button onClick={() => hubConnection.invoke('HitPile')}>
              Taper sur le tas
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Lobby

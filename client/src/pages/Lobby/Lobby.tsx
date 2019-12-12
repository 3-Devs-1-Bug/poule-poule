import React, { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import moment from 'moment'
import { RouteComponentProps } from '@reach/router'
import { HubConnection } from '@microsoft/signalr'

import { Settings as SettingsType } from '../../types/Settings'
import connectToGameHub from '../../utils/signalrConnector'
import { Game } from '../../types/Game'
import Settings from '../../containers/Settings'
import './Lobby.scss'
import PlayerBox from '../../components/PlayerBox'
import { GameStatus } from '../../types/GameStatus'

export interface LobbyProps extends RouteComponentProps {
  id?: string
}

const Lobby: FC<LobbyProps> = (props: LobbyProps) => {
  const [game, setGame] = useState<Game>()
  const [hubConnection, setHubConnection] = useState<HubConnection>()
  const [currentPlayerId, setCurrentPlayerId] = useState<string>()

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
          console.log('setGame(game)')
          setGame(game)
        })
        setHubConnection(connection)
      }
    }

    onLoad()
  }, [props.id])

  // The oldest member of the lobby is the host
  const isGameHost = (game: Game, playerId: string | undefined) => {
    return game.players && game.players[0].id === playerId
  }

  return (
    <div className='Lobby'>
      {game && game.players.length && hubConnection && (
        <>
          <h1>Details de la partie ({game.id})</h1>
          <h2>{`Créé ${moment.utc(game.creationDate).fromNow()}`}</h2>
          {isGameHost(game, currentPlayerId) ? (
            <Settings
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

          <div className='Players'>
            {game.players.map(player => (
              <PlayerBox
                key={player.id}
                name={player.name}
                isSelf={currentPlayerId === player.id || false}
                isHost={isGameHost(game, player.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Lobby

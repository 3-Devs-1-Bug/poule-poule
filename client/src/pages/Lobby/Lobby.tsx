import React, { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps } from '@reach/router'
import { Game } from '../../types/Game'
import * as moment from 'moment'

import connectToGameHub from '../../utils/signalrConnector'

import './Lobby.scss'
import PlayerBox from '../../components/PlayerBox'

export interface LobbyProps extends RouteComponentProps {
  id?: string
}

const Lobby: FC<LobbyProps> = (props: LobbyProps) => {
  const [game, setGame] = useState<Game>()
  const [currentPlayerId, setCurrentPlayerId] = useState<string>()

  useEffect(() => {
    const loadGame = async () => {
      const getGameResponse: AxiosResponse<Game> = await axios.get(
        `/games/${props.id}`
      )
      const game = getGameResponse.data
      return game
    }
    const onLoad = async () => {
      var game = await loadGame()
      setGame(game)

      if (game.status === 'PENDING_START') {
        const hubConnection = connectToGameHub(game.id)
        hubConnection.start().then(() => {
          hubConnection.connectionId &&
            setCurrentPlayerId(hubConnection.connectionId)
        })
        hubConnection.on('refreshGame', () => {
          loadGame().then(game => setGame(game))
        })
      }
    }

    onLoad()
  }, [props.id])

  return (
    <div className='Lobby'>
      {game && (
        <>
          <h1>Details de la partie ({game.id})</h1>
          <h2>{`Créé ${moment.utc(game.creationDate).fromNow()}`}</h2>
          <h3>Statut {game.status}</h3>
          <br></br>
          <h4>Joueurs</h4>
          <div className='Players'>
            {game.players.map(player => (
              <PlayerBox
                name={player.name}
                isSelf={currentPlayerId === player.id || false}
                isHost={game.hostId === player.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Lobby

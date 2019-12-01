import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { RouteComponentProps } from '@reach/router'
import { Game } from '../../types/Game'
import * as moment from 'moment'

import './Lobby.scss'

export interface LobbyProps extends RouteComponentProps {
  id?: string
}

const Lobby: FC<LobbyProps> = (props: LobbyProps) => {
  const [game, setGame] = useState<Game>()
  
  useEffect(() => {
    axios.get(`/games/${props.id}`).then(response => {
      setGame(response.data as Game)
    })
  }, [props.id])

  const getHostName = (game: Game) => {
    const host = game.players.find(player => player.id === game.hostId)
    return host ? host.name : 'host unknown'
  }

  const getSubtitle = (game: Game) => {
    return `Créé par ${getHostName(game)} ${moment
      .utc(game.creationDate)
      .fromNow()}`
  }

  return (
    <div className='Lobby'>
      {game && (
        <>
          <h1>Details de la partie ({game.id})</h1>
          <h2>{getSubtitle(game)}</h2>
          <h3>Statut {game.status}</h3>
          <br></br>
          <h4>Joueurs</h4>
          <div className='Players'>
            {game.players.map(player => (
              <div className='Player' title={player.id} key={player.id}>
                {player.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Lobby

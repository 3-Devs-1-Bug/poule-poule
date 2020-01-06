import React, { FC } from 'react'
import classnames from 'classnames'

import { Player } from '../../types/Player'
import PlayerItem from '../PlayerItem'
import './PlayerList.scss'

export interface PlayerListProps {
  players: Array<Player>
  currentPlayerId: string
  className?: string
}

const PlayerList: FC<PlayerListProps> = ({
  players,
  currentPlayerId,
  className
}) => {
  const classes = classnames(className, 'PlayerList')
  return (
    <div className={classes}>
      <h2>Joueurs</h2>
      <ul className='PlayerList__Grid'>
        {players.map(player => (
          <PlayerItem
            key={player.id}
            className='PlayerList__GridItem'
            name={player.name}
            isSelf={currentPlayerId === player.id}
            isHost={players[0].id === player.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlayerList

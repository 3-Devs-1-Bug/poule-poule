import React, { FC } from 'react'
import classnames from 'classnames'

import { Player } from '../../types/Player'
import PlayerItem from '../../components/PlayerItem'
import './PlayersList.scss'

export interface PlayersListProps {
  players: Array<Player>
  currentPlayerId: string
  className?: string
}

const PlayersList: FC<PlayersListProps> = ({
  players,
  currentPlayerId,
  className
}) => {
  const classes = classnames(className, 'PlayersList')
  return (
    <div className={classes}>
      <h2>Joueurs</h2>
      <ul className='PlayersList__Grid'>
        {players.map(player => (
          <PlayerItem
            key={player.id}
            className='PlayersList__GridItem'
            name={player.name}
            isSelf={currentPlayerId === player.id}
            isHost={players[0].id === player.id}
          />
        ))}
      </ul>
    </div>
  )
}

export default PlayersList

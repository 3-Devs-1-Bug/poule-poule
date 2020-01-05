import React, { FC } from 'react'
import classnames from 'classnames'

import { Player } from '../../types/Player'
import PlayerItem from '../PlayerItem'
import './ScoreBoard.scss'

export interface ScoreBoardProps {
  players: Array<Player>
  currentPlayerId: string
  className?: string
}

const ScoreBoard: FC<ScoreBoardProps> = ({
  players,
  currentPlayerId,
  className
}) => {
  const classes = classnames(className, 'ScoreBoard')
  return (
    <div className={classes}>
      <h2>Tableau des scores</h2>
      <ul className='ScoreBoard__Grid'>
        {players.map(player => (
          <div>
            <PlayerItem
              key={player.id}
              className='ScoreBoard__GridItem'
              name={player.name}
              isSelf={currentPlayerId === player.id}
              isHost={players[0].id === player.id}
            />
            {player.score}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default ScoreBoard

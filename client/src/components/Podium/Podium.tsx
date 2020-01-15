import React, { FC } from 'react'
import classnames from 'classnames'

import { Player } from '../../types/Player'

export interface PodiumProps {
  players: Array<Player>
  currentPlayerId?: string
  className?: string
}

const Podium: FC<PodiumProps> = ({ players, currentPlayerId, className }) => {
  const classes = classnames(className, 'Podium')

  return (
    <div className={classes}>
      <h2>Podium</h2>
      <ol>
        {players.map((player, index) => (
          <li key={player.id}>
            {`${index + 1}. ${player.name} ${player.score} ${
              currentPlayerId && player.id === currentPlayerId ? '(moi)' : ''
            }`}
          </li>
        ))}
      </ol>
      <p>La partie est terminée</p>
    </div>
  )
}

export default Podium

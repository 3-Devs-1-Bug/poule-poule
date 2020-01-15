import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import { Player } from '../../types/Player'
import './Podium.scss'

export interface PodiumProps {
  players: Array<Player>
  currentPlayerId?: string
  className?: string
}

const Podium: FC<PodiumProps> = ({ players, currentPlayerId, className }) => {
  const classes = classnames(className, 'Podium')

  const isWinner = players[0].id === currentPlayerId
  useEffect(() => {
    if (isWinner)
      new Audio(
        'https://statics.blob.core.windows.net/public/victory.mp3'
      ).play()
  }, [currentPlayerId, isWinner])

  const { width, height } = useWindowSize()

  return (
    <div className={classes}>
      {isWinner && <Confetti width={width} height={height} />}
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
      {isWinner ? (
        <span className='VictoryMessage'>Vous avez gagné !</span>
      ) : (
        'La partie est terminée'
      )}
    </div>
  )
}

export default Podium

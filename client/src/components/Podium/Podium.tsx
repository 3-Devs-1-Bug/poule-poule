import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
import Confetti from 'react-confetti'

import { Player } from '../../types/Player'
import './Podium.scss'

export interface PodiumProps {
  players: Array<Player>
  currentPlayerId?: string
  className?: string
}

const victoryMusicUrl =
  'https://statics.blob.core.windows.net/public/victory.mp3'

const Podium: FC<PodiumProps> = ({ players, currentPlayerId, className }) => {
  const classes = classnames(className, 'Podium')

  const isWinner = players[0].id === currentPlayerId
  useEffect(() => {
    if (isWinner) new Audio(victoryMusicUrl).play()
  }, [currentPlayerId, isWinner])

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
      {isWinner ? (
        <>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <span className='Podium__VictoryMessage'>Vous avez gagné !</span>
        </>
      ) : (
        'La partie est terminée'
      )}
    </div>
  )
}

export default Podium

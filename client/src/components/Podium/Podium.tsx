import React, { FC, useEffect } from 'react'
import classnames from 'classnames'
import Confetti from 'react-confetti'

import { Game } from '../../types/Game'
import { Player } from '../../types/Player'
import './Podium.scss'
import { Helmet } from 'react-helmet'
import ScoreBoard from '../ScoreBoard'

export interface PodiumProps {
  players: Array<Player>
  game: Game
  currentPlayerId?: string
  className?: string
}

const victoryMusicUrl =
  'https://statics.blob.core.windows.net/public/victory.mp3'

const Podium: FC<PodiumProps> = ({
  players,
  currentPlayerId,
  className,
  game
}) => {
  const classes = classnames(className, 'Podium')

  const isWinner = players[0].id === currentPlayerId
  useEffect(() => {
    if (isWinner) new Audio(victoryMusicUrl).play()
  }, [currentPlayerId, isWinner])

  return (
    <>
      <Helmet>
        <title>{`Partie n°${game.id}`}</title>
      </Helmet>
      <div className={classes}>
        {currentPlayerId && (
          <p className='Podium__Result'>
            <span className='Podium__Emoji' aria-hidden='true'>
              {isWinner ? '🏆' : '😭'}
            </span>
            {isWinner ? 'Vous avez gagné !' : 'Vous avez perdu !'}
            <span className='Podium__Emoji' aria-hidden='true'>
              {isWinner ? '🏆' : '😭'}
            </span>
          </p>
        )}
        <ScoreBoard players={players} currentPlayerId={currentPlayerId} />
        {isWinner && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    </>
  )
}

export default Podium

import React, { FC } from 'react'
import classnames from 'classnames'

import { GameItem as GameItemType } from '../../types/GameItem'
import GameItem from '../GameItem'

export interface GameListProps {
  games: Array<GameItemType>
  className?: string
}

const GameList: FC<GameListProps> = ({ games, className }) => {
  const classes = classnames(className, 'GameList')
  return (
    <div className={classes}>
      <h2>Rejoindre une partie</h2>
      <p>Rejoins directement une partie et joue avec d'autres joueurs.</p>
      {games.length ? (
        <ul className='list'>
          {games.map(game => (
            <li key={game.id}>
              <GameItem game={game} />
            </li>
          ))}
        </ul>
      ) : (
        <span>Aucune partie en cours.</span>
      )}
    </div>
  )
}

export default GameList

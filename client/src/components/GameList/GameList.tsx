import React, { FC } from 'react'
import classnames from 'classnames'

import { GameItem as GameItemType } from '../../types/GameItem'
import './GameList.scss'
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
        <ul className='GameList__List'>
          {games.map(game => (
            <li className='GameList__Item' key={game.id}>
              <GameItem game={game} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune partie en cours.</p>
      )}
    </div>
  )
}

export default GameList

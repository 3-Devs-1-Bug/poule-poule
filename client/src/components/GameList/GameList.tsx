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
      <h2>List des parties</h2>
      {games.length ? (
        <ul className='GameList__Grid'>
          {games.map(game => (
            <li className='GameList__GridItem' key={game.id}>
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

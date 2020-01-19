import React, { FC } from 'react'
import { Link } from '@reach/router'

import { GameItem as GameItemType } from '../../types/GameItem'

export interface GameItemProps {
  game: GameItemType
  className?: string
}

const GameItem: FC<GameItemProps> = ({ game, className }) => {
  const linkText = `Partie #${game.id} (${game.playerCount} joueur${
    game.playerCount > 1 ? 's' : ''
  })`
  return (
    <Link className={className} to={`/game/${game.id}`}>
      {linkText}
    </Link>
  )
}

export default GameItem

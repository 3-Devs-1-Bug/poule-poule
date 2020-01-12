import React, { FC } from 'react'
import moment from 'moment'

import { GameItem as GameItemType } from '../../types/GameItem'
import Button from '../Button'
import { navigate } from '@reach/router'

export interface GameItemProps {
  game: GameItemType
  className?: string
}

const GameItem: FC<GameItemProps> = ({ game, className }) => {
  return (
    <div className={className}>
      <h3>Partie {game.id}</h3>
      <p>Créée {moment.utc(game.creationDate).fromNow()}</p>
      <p>{game.playerCount} joueur(s)</p>
      <Button onClick={() => navigate(`/lobby/${game.id}`)}>Rejoindre</Button>
    </div>
  )
}

export default GameItem

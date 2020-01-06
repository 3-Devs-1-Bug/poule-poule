import React, { FC } from 'react'

import './PlayingCard.scss'
import { CardType } from '../../types/CardType'

const cardToEmoji = (card: CardType) => {
  let emoji
  let label
  switch (card) {
    case CardType.EGG:
      emoji = '🥚'
      label = 'Egg'
      break
    case CardType.HEN:
      emoji = '🐔'
      label = 'Hen'
      break
    case CardType.FOX:
      emoji = '🦊'
      label = 'Fox'
      break
  }
  return (
    <span className='Card__Emoji' role='img' aria-label={label}>
      {emoji}
    </span>
  )
}

export interface CardProps {
  type: CardType
  className?: string
}

const Card: FC<CardProps> = ({ type, className }) => {
  const classes = 'Card__Container ' + className
  return <div className={classes}>{cardToEmoji(type)}</div>
}

export default Card

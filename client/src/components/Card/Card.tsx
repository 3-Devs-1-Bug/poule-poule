import React, { FC } from 'react'

import './Card.scss'
import { Card as CardType } from '../../types/Card'

const cardToEmoji = (card: CardType) => {
  let emoji
  let label
  switch (card) {
    case CardType.EGG:
      emoji = '🥚'
      label = 'Egg'
      break
    case CardType.CHICKEN:
      emoji = '🐔'
      label = 'Chicken'
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
}

const Card: FC<CardProps> = ({ type }) => {
  return (
    <div className='Card__Container'>
      <div className='Card__AspectRatio'>
        <div className='Card__Content'>{cardToEmoji(type)}</div>
      </div>
    </div>
  )
}

export default Card

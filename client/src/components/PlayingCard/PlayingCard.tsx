import React, { FC } from 'react'
import { times } from 'lodash-es'

import './PlayingCard.scss'
import { CardType } from '../../types/CardType'

const cardList: { type: string; emoji: string; label: string }[] = [
  { type: 'EGG', emoji: '🥚', label: 'Oeuf' },
  { type: 'HEN', emoji: '🐔', label: 'Poule' },
  { type: 'FOX', emoji: '🦊', label: 'Renard' }
]

export interface CardProps {
  type: CardType
  className?: string
}

const Card: FC<CardProps> = ({ type, className }) => {
  const classes = 'Card ' + className
  const currentCard = cardList.find(card => card.type === type)
  return (
    <div className={classes} aria-label={currentCard && currentCard.label}>
      <div className='Card__Stripe Card__Stripe--Left'>
        {times(11, i => (
          <div className='Card__Stripe--Hole' key={i} />
        ))}
      </div>

      <div className='Card__Content'>
        {times(3, i => (
          <span role='img' key={i}>
            {currentCard && currentCard.emoji}
          </span>
        ))}
      </div>

      <div className='Card__Stripe Card__Stripe--Right'>
        {[...Array(11)].map((_, i) => {
          return <div className='Card__Stripe--Hole' key={i} />
        })}
      </div>
    </div>
  )
}

export default Card

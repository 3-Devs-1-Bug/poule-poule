import React, { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Card from '../Card'
import { Card as CardType } from '../../types/Card'
import './CardPile.scss'

export interface CardPileProps {
  cards: {
    type: CardType
    id: string
  }[]
  className?: string
}

const CardPile: FC<CardPileProps> = ({ cards, className }) => {
  const lastTwoCards = cards.slice(-2)
  const classes = 'CardPile ' + className

  return (
    <TransitionGroup className={classes}>
      {lastTwoCards.map(({ id, type }) => (
        <CSSTransition
          appear
          key={id}
          in={true}
          timeout={{ appear: 250, enter: 250, exit: 0 }}
          classNames='card-animation'
        >
          <Card type={type} className='CardPile__Card' />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default CardPile

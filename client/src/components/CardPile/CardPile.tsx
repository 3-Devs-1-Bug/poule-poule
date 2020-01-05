import React, { FC } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import PlayingCard from '../PlayingCard'
import { Card } from '../../types/Card'
import './CardPile.scss'

export interface CardPileProps {
  cards: Array<Card>
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
          <PlayingCard type={type} className='CardPile__Card' />
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default CardPile

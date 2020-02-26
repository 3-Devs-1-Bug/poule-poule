import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Helmet } from 'react-helmet'

import { Game } from '../../types/Game'
import './Round.scss'
import Button from '../../components/Button'
import CardPile from '../../components/CardPile'
import { GameStatus } from '../../types/GameStatus'
import { Card } from '../../types/Card'

export interface RoundProps extends RouteComponentProps {
  game: Game
  cards: Array<Card>
  hitPile: () => void
}

const Round: FC<RoundProps> = (props: RoundProps) => {
  const safeHit = () => {
    if (props.game.status === GameStatus.ROUND_IN_PROGRESS) props.hitPile()
  }

  return (
    <>
      <Helmet>
        <title>{`Partie n°${props.game.id}`}</title>
      </Helmet>
      <div className='Round'>
        <p className='subtitle'>
          La partie est lancée ! Tape sur le tas dès qu’il y a{' '}
          <strong>5 oeufs ou plus</strong> !
        </p>
        <button
          aria-labelledby='hitPile'
          onClick={safeHit}
          className='Round__Cards'
        >
          <CardPile cards={props.cards} />
        </button>
        {props.game.status === GameStatus.ROUND_IN_PROGRESS && (
          <Button id='hitPile' onClick={props.hitPile} autoFocus>
            Taper sur la pile
          </Button>
        )}
      </div>
    </>
  )
}

export default Round

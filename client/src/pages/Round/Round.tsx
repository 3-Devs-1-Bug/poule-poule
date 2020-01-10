import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Game } from '../../types/Game'
import './Round.scss'
import Button from '../../components/Button'
import CardPile from '../../components/CardPile'
import { GameStatus } from '../../types/GameStatus'
import { RoundResult } from '../../types/RoundResult'
import { Player } from '../../types/Player'
import { Card } from '../../types/Card'
import ScoreBoard from '../../components/ScoreBoard'

export interface RoundProps extends RouteComponentProps {
  game: Game
  currentPlayerId: string
  isGameHost: boolean
  cards: Array<Card>
  result?: RoundResult
  hitPile: () => void
  startGame: () => void
}

const Round: FC<RoundProps> = (props: RoundProps) => {
  const buildResultText = (
    result: RoundResult,
    players: Array<Player>
  ): string => {
    if (!result.playerId) return `Personne n'a tapé sur la pile`
    else {
      let firstPart = ''
      if (result.playerId === props.currentPlayerId) {
        firstPart = 'Vous avez'
      } else {
        const player = players.find(player => player.id === result.playerId)
        firstPart = `${(player && player.name) || 'Un joueur inconnu'} a`
      }
      return `${firstPart} ${result.hasWon ? 'gagné' : 'perdu'}, `
    }
  }

  const safeHit = () => {
    if (props.game.status === GameStatus.ROUND_IN_PROGRESS) props.hitPile()
  }

  return (
    <div className='Round'>
      <>
        <ScoreBoard
          className='Round__Players'
          players={props.game.players}
          currentPlayerId={props.currentPlayerId}
        />
        {props.game.status === GameStatus.ROUND_ENDED && props.isGameHost && (
          <Button onClick={props.startGame}>Commencer la manche</Button>
        )}
        <div>
          <h2>Cartes</h2>
          <button
            aria-label='Taper sur la pile'
            onClick={safeHit}
            className='Round__Cards'
          >
            <CardPile cards={props.cards} />
          </button>
          {props.game.status === GameStatus.ROUND_IN_PROGRESS && (
            <Button onClick={props.hitPile}>Taper sur la pile</Button>
          )}
          {props.result && (
            <p>
              {buildResultText(props.result, props.game.players)}
              {`il y avait ${props.result.count} oeuf(s).`}
            </p>
          )}
        </div>
      </>
    </div>
  )
}

export default Round

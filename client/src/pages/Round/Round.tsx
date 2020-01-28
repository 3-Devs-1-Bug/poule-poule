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
        {props.result ? (
          <>
            {' '}
            {/* Score view */}
            <p className='subtitle'>
              {buildResultText(props.result, props.game.players)}{' '}
              {`il y avait ${props.result.count} oeuf(s)`}. La manche est
              terminée, voici l’état actuel des scores. Prépare toi pour la
              suivante !
            </p>
            <ScoreBoard
              className='Round__Players'
              players={props.game.players}
              currentPlayerId={props.currentPlayerId}
            />
            {props.game.status === GameStatus.ROUND_ENDED && props.isGameHost && (
              <Button
                className='Round__NewRoundButton'
                onClick={props.startGame}
              >
                Lancer la prochaine manche
              </Button>
            )}
          </>
        ) : (
          <>
            {' '}
            {/* Game view */}
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
          </>
        )}
      </>
    </div>
  )
}

export default Round

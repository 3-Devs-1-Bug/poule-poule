import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Game } from '../../types/Game'
import './Scores.scss'
import Button from '../../components/Button'
import { GameStatus } from '../../types/GameStatus'
import { RoundResult } from '../../types/RoundResult'
import { Player } from '../../types/Player'
import ScoreBoard from '../../components/ScoreBoard'

export interface ScoresProps extends RouteComponentProps {
  game: Game
  currentPlayerId: string
  isGameHost: boolean
  result?: RoundResult | undefined
  startGame: () => void
}

const Scores: FC<ScoresProps> = (props: ScoresProps) => {
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

  return (
    <div className='Scores'>
      {props.result && (
        <>
          <p className='subtitle'>
            {buildResultText(props.result, props.game.players)}{' '}
            {`il y avait ${props.result.count} oeuf(s)`}. La manche est
            terminée, voici l’état actuel des scores. Prépare toi pour la
            suivante !
          </p>
          <ScoreBoard
            className='Scores__Players'
            players={props.game.players}
            currentPlayerId={props.currentPlayerId}
          />
          {props.game.status === GameStatus.ROUND_ENDED && props.isGameHost && (
            <Button
              className='Scores__NewRoundButton'
              onClick={props.startGame}
            >
              Lancer la prochaine manche
            </Button>
          )}
        </>
      )}
    </div>
  )
}

export default Scores

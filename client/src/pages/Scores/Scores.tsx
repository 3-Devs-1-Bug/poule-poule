import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Helmet } from 'react-helmet'

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
  result: RoundResult
  startGame: () => void
}

const Scores: FC<ScoresProps> = ({
  game,
  currentPlayerId,
  isGameHost,
  result,
  startGame
}) => {
  const buildResultText = (
    result: RoundResult,
    players: Array<Player>
  ): string => {
    if (!result.playerId) return `Personne n'a tapé sur la pile`
    else {
      let firstPart = ''
      if (result.playerId === currentPlayerId) {
        firstPart = 'Tu as'
      } else {
        const player = players.find(player => player.id === result.playerId)
        firstPart = `${(player && player.name) || 'Un joueur inconnu'} a`
      }
      return `${firstPart} ${result.hasWon ? 'gagné' : 'perdu'}, `
    }
  }

  return (
    <>
      <Helmet>
        <title>{`Partie n°${game.id}`}</title>
      </Helmet>
      <div className='Scores'>
        <p className='subtitle'>
          {buildResultText(result, game.players)} il y avait {result.count}{' '}
          oeuf(s). La manche est terminée, voici l’état actuel des scores.
          Prépare toi pour la suivante !
        </p>
        <ScoreBoard
          className='Scores__Players'
          players={game.players}
          currentPlayerId={currentPlayerId}
        />
        {game.status === GameStatus.ROUND_ENDED && isGameHost && (
          <Button className='Scores__NewRoundButton' onClick={startGame}>
            Lancer la prochaine manche
          </Button>
        )}
      </div>
    </>
  )
}

export default Scores

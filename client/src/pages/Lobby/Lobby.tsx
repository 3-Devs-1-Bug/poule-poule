import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import { Settings as SettingsType } from '../../types/Settings'
import { Game } from '../../types/Game'
import Settings from '../../components/Settings'
import PlayerList from '../../components/PlayerList'
import './Lobby.scss'
import Button from '../../components/Button'

export interface LobbyProps extends RouteComponentProps {
  game: Game
  currentPlayerId: string
  isGameHost: boolean
  startGame: () => void
  updateGameSettings: (settings: SettingsType) => void
}

const Lobby: FC<LobbyProps> = ({
  game,
  currentPlayerId,
  isGameHost,
  startGame,
  updateGameSettings
}) => {
  return (
    <div className='Lobby'>
      <>
        {isGameHost ? (
          <Settings
            className='Lobby__Settings'
            difficulty={game.difficulty}
            roundsToWin={game.roundsToWin}
            cardSpeed={game.cardSpeed}
            updateSettings={updateGameSettings}
          />
        ) : (
          <ul>
            <li>
              Niveau de difficulté: <strong>{game.difficulty}</strong>
            </li>
            <li>
              Nombre de manches pour gagner: <strong>{game.roundsToWin}</strong>
            </li>
            <li>
              Temps entre chaque carte: <strong>{game.cardSpeed}</strong>{' '}
              secondes
            </li>
          </ul>
        )}

        <PlayerList
          className='Lobby__Players'
          players={game.players}
          currentPlayerId={currentPlayerId}
        />

        {isGameHost && <Button onClick={startGame}>Commencer la partie</Button>}
      </>
    </div>
  )
}

export default Lobby

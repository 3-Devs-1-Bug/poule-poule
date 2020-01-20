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
      <p className='subtitle'>
        {isGameHost
          ? 'Choisis les paramètres, invite d’autres joueurs et lance la partie.'
          : 'Installe toi bien, le créateur de la partie va la démarrer sous peu...'}
      </p>
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
          <>
            <h2>Paramètres</h2>
            <ul className='list'>
              <li>
                Temps entre chaque carte : <strong>{game.cardSpeed}</strong>{' '}
                secondes
              </li>
            </ul>
          </>
        )}

        <PlayerList
          className='Lobby__Players'
          players={game.players}
          currentPlayerId={currentPlayerId}
        />

        {isGameHost && (
          <Button className='Lobby__Button' onClick={startGame}>
            Commencer la partie
          </Button>
        )}
      </>
    </div>
  )
}

export default Lobby

import React, { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps } from '@reach/router'
import { Game } from '../../types/Game'
import * as moment from 'moment'

import connectToHub from '../../utils/signalrConnector'

import './Lobby.scss'
import { HubConnection } from '@microsoft/signalr'
import Button from '../../components/Button'
import { Player } from '../../types/Player'

export interface LobbyProps extends RouteComponentProps {
  id?: string
}

const Lobby: FC<LobbyProps> = (props: LobbyProps) => {
  const [game, setGame] = useState<Game>()
  const [hubConnection, setHubConnection] = useState<HubConnection>()
  const [gameHost, setGameHost] = useState<Player>()
  const [currentPlayer, setCurrentPlayer] = useState<Player>()

  useEffect(() => {
    const onLoad = async () => {
      const getGameResponse: AxiosResponse<Game> = await axios.get(
        `/games/${props.id}`
      )
      const game = getGameResponse.data
      setGame(game)

      if (game.status === 'PENDING_START') {
        // consider player in the game if playerId is found in storage
        // could be either game host or player refreshing window
        let playerId = localStorage.getItem(`poule-poule-${game.id}`)
        let newPlayer = null
        if (!playerId) {
          // first visit, join the game
          const { data: player } = await axios.post(
            `/games/${props.id}/players`
          )

          localStorage.setItem(`poule-poule-${game.id}`, player.id)
          playerId = player.id
          newPlayer = player
        }

        // connect to hub
        if (playerId) {
          const hubConnection = connectToHub('gameHub', playerId)

          hubConnection.on('playerJoined', (player: Player) => {
            const updatedGame = {
              ...game,
              players: game.players.concat(player)
            }
            setGame(updatedGame)
          })
          setHubConnection(hubConnection)
          const gameHost = game.players.find(
            player => player.id === game.hostId
          )
          setGameHost(gameHost)

          setCurrentPlayer(
            newPlayer || game.players.find(player => player.id === playerId)
          )
        }
      }
    }

    onLoad()
  }, [props.id])

  const getSubtitle = (game: Game) => {
    let creator = ''
    if (currentPlayer && gameHost && currentPlayer.id === gameHost.id)
      creator = 'vous'
    else creator = (gameHost && gameHost.name) || ''
    return `Créé par ${creator} ${moment.utc(game.creationDate).fromNow()}`
  }

  return (
    <div className='Lobby'>
      {game && (
        <>
          <h1>Details de la partie ({game.id})</h1>
          <h2>{getSubtitle(game)}</h2>
          <h3>Statut {game.status}</h3>
          <br></br>
          <h4>Joueurs</h4>
          <div className='Players'>
            {game.players.map(player => (
              <div className='Player' title={player.id} key={player.id}>
                {player.name} - {game.hostId === player.id ? '(host)' : ''} -
                {currentPlayer && currentPlayer.id === player.id ? '(you)' : ''}
              </div>
            ))}
          </div>
          {hubConnection &&
            currentPlayer &&
            currentPlayer.id === game.hostId &&
            game.status === 'PENDING_START' && (
              <Button primary onClick={() => hubConnection.invoke('StartGame')}>
                Commencer la partie
              </Button>
            )}
        </>
      )}
    </div>
  )
}

export default Lobby

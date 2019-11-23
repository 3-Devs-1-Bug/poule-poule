import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import Radio from '../components/Radio/Radio'
import Player from '../components/Player'
import './Game.scss'

export interface GameProps extends RouteComponentProps {
  id?: string
}

const Game: FC<GameProps> = ({ id }) => {
  const players = [
    { name: 'Bob', avatarUrl: 'https://picsum.photos/id/1/50' },
    {
      name: 'George',
      avatarUrl: 'https://picsum.photos/id/2/50',
      leader: true
    },
    { name: 'John', avatarUrl: 'https://picsum.photos/id/3/50', user: true }
  ]
  return (
    <div className='Game'>
      This is the game with id <em>{id}</em>.
      <form>
        {['one', 'two', 'three'].map(option => (
          <Radio key={option} name='number' label={option} value={option} />
        ))}
      </form>
      <ul>
        {players.map(player => (
          <Player
            className='Game__player'
            key={player.name}
            avatarSrc={player.avatarUrl}
            name={player.name}
            isCurrentUser={player.user}
            isLeader={player.leader}
          />
        ))}
        <Player isPlaceholder />
      </ul>
    </div>
  )
}
export default Game

import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'
import Radio from '../components/Radio/Radio'

export interface GameProps extends RouteComponentProps {
  id?: string
}

const Game: FC<GameProps> = ({ id }) => (
  <>
    This is the game with id <em>{id}</em>.
    <form>
      {['one', 'two', 'three'].map(option => (
        <Radio key={option} name='number' label={option} value={option} />
      ))}
    </form>
  </>
)

export default Game

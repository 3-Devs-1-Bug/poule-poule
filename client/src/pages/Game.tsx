import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

export interface GameProps extends RouteComponentProps {
  id?: string
}

const Game: FC<GameProps> = ({ id }) => (
  <>
    This is the game with id <em>{id}</em>.
  </>
)

export default Game

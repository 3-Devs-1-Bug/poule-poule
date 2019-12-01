import React, { FC } from 'react'
import axios from 'axios'
import { RouteComponentProps, navigate } from '@reach/router'

import Button from '../components/Button'

import { Game } from '../types/Game'

export interface IndexProps extends RouteComponentProps {}

const Index: FC<IndexProps> = () => {
  const createGame = () => {
    axios.post('/games').then(response => {
      const game = response.data as Game
      navigate(`/lobby/${game.id}`)
    })
  }

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
        temporibus voluptatum pariatur, deserunt voluptas natus impedit tempore
        deleniti officia facilis cum expedita, vero illum debitis magnam. Enim,
        inventore! Reprehenderit, nulla.
      </p>

      <Button>I'm a normal button</Button>
      <Button primary>I'm a primary button</Button>
      <Button onClick={createGame}>Create a game</Button>
    </>
  )
}

export default Index

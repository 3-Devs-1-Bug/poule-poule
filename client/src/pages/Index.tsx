import React, { FC } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps, navigate } from '@reach/router'

import Button from '../components/Button'

import { Game } from '../types/Game'

export interface IndexProps extends RouteComponentProps {}

const Index: FC<IndexProps> = () => {
  const createGame = async () => {
    const postGameResponse: AxiosResponse<Game> = await axios.post(`/games`)
    const game = postGameResponse.data
    navigate(`/lobby/${game.id}`)
  }

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
        temporibus voluptatum pariatur, deserunt voluptas natus impedit tempore
        deleniti officia facilis cum expedita, vero illum debitis magnam. Enim,
        inventore! Reprehenderit, nulla.
      </p>

      <Button>Rejoindre une partie</Button>
      <Button primary onClick={createGame}>
        Créer une nouvelle partie
      </Button>
    </>
  )
}

export default Index

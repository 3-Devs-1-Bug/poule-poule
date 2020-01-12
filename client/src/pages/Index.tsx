import React, { FC, useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps, navigate } from '@reach/router'

import Button from '../components/Button'

import { GameItem } from '../types/GameItem'
import GameList from '../components/GameList'

export interface IndexProps extends RouteComponentProps {}

const Index: FC<IndexProps> = () => {
  const [games, setGames] = useState<Array<GameItem>>([])

  useEffect(() => {
    axios.get(`/games`).then(response => setGames(response.data))
  }, [])

  const createGame = async () => {
    const postGameResponse: AxiosResponse<GameItem> = await axios.post(`/games`)
    const game = postGameResponse.data
    navigate(`/game/${game.id}`)
  }

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
        temporibus voluptatum pariatur, deserunt voluptas natus impedit tempore
        deleniti officia facilis cum expedita, vero illum debitis magnam. Enim,
        inventore! Reprehenderit, nulla.
      </p>

      <Button primary onClick={createGame}>
        Créer une nouvelle partie
      </Button>
      <GameList games={games} />
    </>
  )
}

export default Index

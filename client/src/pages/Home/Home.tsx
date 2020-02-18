import React, { FC, useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps, navigate } from '@reach/router'
import { Helmet } from 'react-helmet'

import './Home.scss'

import { GameItem } from '../../types/GameItem'
import NewGame from '../../components/NewGame'
import GameList from '../../components/GameList'

export interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = () => {
  const [games, setGames] = useState<Array<GameItem>>([])

  useEffect(() => {
    axios.get(`/games`).then(response => setGames(response.data))
  }, [])

  const createGame = async () => {
    const postGameResponse: AxiosResponse<GameItem> = await axios.post(`/games`)
    const game = postGameResponse.data
    navigate(`/partie/${game.id}`)
  }

  return (
    <>
      <Helmet>
        <title>Poule Poule</title>
      </Helmet>
      <div className='Home'>
        <p className='subtitle'>
          Crée ta propre partie ou rejoins une partie déjà existante !
        </p>
        <NewGame createGame={createGame} />
        <GameList className='Home__GameList' games={games} />
      </div>
    </>
  )
}

export default Home

import React, { FC, useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { RouteComponentProps, navigate } from '@reach/router'

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
    navigate(`/game/${game.id}`)
  }

  return (
    <div className='Home'>
      <p className='subtitle'>
        Crée ta propre partie ou rejoins une partie déjà existante !
      </p>
      <NewGame clickHandler={createGame} />
      <GameList className='Home__GameList' games={games} />
    </div>
  )
}

export default Home

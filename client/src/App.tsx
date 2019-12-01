import React from 'react'
import BaseLayout from './layouts/BaseLayout'
import { Router } from '@reach/router'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Game from './pages/Game'
import Lobby from './pages/Lobby'
import axios from 'axios'

const App: React.FC = () => {
  axios.defaults.baseURL = 'https://localhost:5001'

  return (
    <BaseLayout>
      <Router>
        <Index path='/' />
        <Game path='/game/:id' />
        <Lobby path='/lobby/:id' />
        <NotFound path='*' />
      </Router>
    </BaseLayout>
  )
}

export default App

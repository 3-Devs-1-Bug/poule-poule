import React from 'react'
import axios from 'axios'
import { Router } from '@reach/router'

import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Game from './pages/Game'

const App: React.FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL

  return (
    <BaseLayout>
      <Router style={{ boxShadow: 'none' }}>
        <Home path='/' />
        <About path='/a-propos' />
        <Game path='/partie/:id' />
        <NotFound path='*' />
      </Router>
    </BaseLayout>
  )
}

export default App

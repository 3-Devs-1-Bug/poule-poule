import React from 'react'
import axios from 'axios'
import { Router } from '@reach/router'

import BaseLayout from './layouts/BaseLayout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Game from './pages/Game'

const App: React.FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL

  return (
    <BaseLayout>
      <Router>
        <Index path='/' />
        <Game path='/game/:id' />
        <NotFound path='*' />
      </Router>
    </BaseLayout>
  )
}

export default App

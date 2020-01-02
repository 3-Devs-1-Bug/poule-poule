import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BaseLayout from './layouts/BaseLayout'
import { Router } from '@reach/router'

import BaseLayout from './layouts/BaseLayout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Game from './pages/Game'

const App: React.FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  const [subtitle, setSubtitle] = useState<string>('Cool subtitle bro')
  useEffect(() => {
    axios.get(`/sayings`).then(result => setSubtitle(result.data))
  }, [])
  return (
    <BaseLayout subtitle={subtitle}>
      <Router>
        <Index path='/' />
        <Game path='/game/:id' />
        <NotFound path='*' />
      </Router>
    </BaseLayout>
  )
}

export default App

import React from 'react'
import BaseLayout from './layouts/BaseLayout'
import { Router } from '@reach/router'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Game from './pages/Game'

const App: React.FC = () => {
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

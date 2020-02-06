import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Router } from '@reach/router'

import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Game from './pages/Game'
import { Helmet } from 'react-helmet'

interface helmetProps {
  title: string
}

const App: React.FC = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL

  const [title, setTitle] = useState('')
  const titleRef = useRef<HTMLParagraphElement>(null)
  const onHelmetChange = ({ title }: helmetProps) => setTitle(title)

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus()
  })

  return (
    <BaseLayout>
      <p tabIndex={-1} ref={titleRef} className='sr-only'>
        {title}
      </p>
      <Helmet onChangeClientState={onHelmetChange} />
      <Router>
        <Home path='/' />
        <About path='/a-propos' />
        <Game path='/game/:id' />
        <NotFound path='*' />
      </Router>
    </BaseLayout>
  )
}

export default App

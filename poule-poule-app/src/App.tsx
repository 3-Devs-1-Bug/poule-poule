import React from 'react'
import Button from './components/Button'
import BaseLayout from './layouts/BaseLayout'

const App: React.FC = () => {
  return (
    <BaseLayout>
      <Button>I'm a normal button</Button>
      <Button primary>I'm a primary button</Button>
    </BaseLayout>
  )
}

export default App

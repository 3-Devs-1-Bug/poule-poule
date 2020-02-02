import React, { FC, useState } from 'react'
import { RouteComponentProps } from '@reach/router'

import Countdown from '../components/Countdown'
import Button from '../components/Button'

export interface DemoProps extends RouteComponentProps {}

const Demo: FC<DemoProps> = () => {
  const [count, setCount] = useState(10)
  const [countdownStarted, setCountdownStarted] = useState(false)

  const startCountdown = () => {
    setInterval(() => {
      setCount(current => current - 1)
    }, 1000)
    setCountdownStarted(true)
  }

  return (
    <>
      <Button onClick={startCountdown} disabled={countdownStarted}>
        Start countdown
      </Button>
      {countdownStarted && <Countdown count={count} />}
    </>
  )
}

export default Demo

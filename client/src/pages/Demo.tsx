import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'

import Countdown from '../components/Countdown'

export interface DemoProps extends RouteComponentProps {}

const Demo: FC<DemoProps> = () => {
  const [count, setCount] = useState(10)

  useEffect(() => {
    setInterval(() => {
      setCount(current => current - 1)
    }, 1000)
  }, [])

  return <Countdown count={count} />
}

export default Demo

import React, { FC, useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import classnames from 'classnames'

import './Countdown.scss'

export interface CountdownProps {
  count: number

  className?: string
}

const Countdown: FC<CountdownProps> = ({ count, className }) => {
  const [last, setLast] = useState<number | null>(null)

  const classes = classnames('Countdown', className)

  useEffect(() => {
    setLast(count)
  }, [count])

  const lastTwoCounts = last ? [last, count] : [count]

  return (
    <TransitionGroup className={classes}>
      {lastTwoCounts.map((i: number) => (
        <CSSTransition key={i} timeout={250} classNames='countdown-animation'>
          <div className='Countdown__Count'>{i}</div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}

export default Countdown

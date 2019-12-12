import React, { FC } from 'react'
import classnames from 'classnames'

import './PlayerItem.scss'

export interface PlayerProps {
  name: string
  isHost?: boolean
  isSelf?: boolean
  className?: string
}

const PlayerItem: FC<PlayerProps> = ({ name, isHost, isSelf, className }) => {
  const classes = classnames(className, 'Player', {
    Player__Host: isHost,
    Player__Self: isSelf
  })
  return (
    <div className={classes}>
      <div className='Player__Avatar'>
        {isHost && <div className='Player__Badge' />}
      </div>
      {name} {isSelf && ' (you)'}
    </div>
  )
}

export default PlayerItem

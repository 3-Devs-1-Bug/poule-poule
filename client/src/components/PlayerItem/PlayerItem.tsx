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
  const classes = classnames(className, 'Player')
  return (
    <div className={classes}>
      <div className='Player__Avatar'>
        {isHost && <div className='Player__Badge' />}
      </div>
      {name} {isSelf && ' (moi)'}{' '}
      {isHost && <span className='sr-only'>créateur de la partie</span>}
    </div>
  )
}

export default PlayerItem

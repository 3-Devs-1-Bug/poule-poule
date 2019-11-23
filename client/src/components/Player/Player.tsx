import React, { FC } from 'react'
import classnames from 'classnames'

import './Player.scss'

export interface PlayerProps {
  avatarSrc?: string
  name?: string
  isLeader?: boolean
  isCurrentUser?: boolean
  isPlaceholder?: boolean

  className?: string
}

const Player: FC<PlayerProps> = ({
  isPlaceholder,
  avatarSrc,
  name,
  isLeader,
  isCurrentUser,
  className
}) => {
  const classes = classnames(className, 'Player')
  const textClasses = classnames('Player__name', {
    'Player__name--placeholder': isPlaceholder
  })
  return (
    <div className={classes}>
      <div className='Player__avatar-container'>
        {isPlaceholder ? (
          <div className='Player__avatar-container__placeholder' />
        ) : (
          <img
            src={avatarSrc}
            alt=''
            className='Player__avatar-container__image'
          />
        )}

        {isLeader && <span className='Player__avatar-container__badge' />}
      </div>
      <p className={textClasses}>
        {isPlaceholder ? (
          'Place ouverte'
        ) : (
          <>
            {name}
            {isCurrentUser && (
              <span className='Player__name__self'> (moi)</span>
            )}
          </>
        )}
      </p>
    </div>
  )
}

export default Player

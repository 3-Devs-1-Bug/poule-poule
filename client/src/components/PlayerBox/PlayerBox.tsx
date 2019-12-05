import React, { FC } from 'react'

import './PlayerBox.scss'

export interface PlayerProps {
  name: string
  isHost?: boolean
  isSelf?: boolean
}

const Player: FC<PlayerProps> = props => {
  return (
    <div className='PlayerBox'>
      <div>
        <h3>{props.name}</h3>
      </div>
      {props.isHost && <h4>Host</h4>}
      {props.isSelf && '(this is you)'}
    </div>
  )
}

export default Player

import React, { FC } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import copyIcon from '../../images/copy.png'
import './Invite.scss'

export interface InviteProps {
  gameUrl: string
}

const Invite: FC<InviteProps> = ({ gameUrl }) => {
  return (
    <div className='Invite'>
      <h2>Inviter des joueurs</h2>
      <p>Pour inviter des joueurs, partagez le lien ci-dessous:</p>
      <div className='Invite__LinkBlock'>
        <span className='Invite__LinkBlock__Link'>{gameUrl}</span>
        <CopyToClipboard text={gameUrl}>
          <img
            className='Invite__LinkBlock__CopyIcon'
            src={copyIcon}
            alt={`copier le lien d'invitaton`}
          />
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Invite

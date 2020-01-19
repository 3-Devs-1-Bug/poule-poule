import React, { FC } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import './Invite.scss'
import Button from '../Button'
import useCooldown from '../../hooks/useCooldown'

export interface InviteProps {
  gameUrl: string
}

const Invite: FC<InviteProps> = ({ gameUrl }) => {
  const [isCoolingDown, triggerCooldown] = useCooldown(1500)

  return (
    <div className='Invite'>
      <h2>Inviter des joueurs</h2>
      <p>Pour inviter des joueurs, partagez le lien ci-dessous:</p>
      <div className='Invite__LinkBlock'>
        <span className='Invite__LinkBlock__Link'>{gameUrl}</span>
        <CopyToClipboard text={gameUrl} onCopy={triggerCooldown}>
          <Button disabled={isCoolingDown} className={'Button--Small'}>
            {isCoolingDown ? 'Copié' : 'Copier'}
          </Button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default Invite

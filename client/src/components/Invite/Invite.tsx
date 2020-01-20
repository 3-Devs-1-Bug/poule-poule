import React, { FC, useRef } from 'react'

import './Invite.scss'
import Button from '../Button'
import useCooldown from '../../hooks/useCooldown'

export interface InviteProps {
  gameUrl: string
}

const Invite: FC<InviteProps> = ({ gameUrl }) => {
  const [isCoolingDown, triggerCooldown] = useCooldown(1500)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const selectLinkText = () => {
    linkInputRef.current && linkInputRef.current.select()
  }

  const copyToClipboard = () => {
    selectLinkText()
    document.execCommand('copy')
    buttonRef.current && buttonRef.current.focus()
    triggerCooldown()
  }

  return (
    <div className='Invite'>
      <h2>Inviter des joueurs</h2>
      <p>Pour inviter des joueurs, partagez le lien ci-dessous:</p>
      <div className='Invite__LinkBlock'>
        <label htmlFor='linkInput'>Lien d'invitation :</label>
        <input
          id='linkInput'
          ref={linkInputRef}
          type='text'
          readOnly
          className='Invite__LinkBlock__Link'
          value={gameUrl}
          onClick={() => selectLinkText()}
        />
        <Button
          ref={buttonRef}
          disabled={isCoolingDown}
          className={'Button--Small'}
          onClick={copyToClipboard}
        >
          {isCoolingDown ? 'Copié' : 'Copier'}
        </Button>
      </div>
    </div>
  )
}

export default Invite

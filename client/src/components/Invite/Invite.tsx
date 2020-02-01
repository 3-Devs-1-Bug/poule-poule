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
    linkInputRef.current!.select()
  }

  const copyToClipboard = () => {
    selectLinkText()
    document.execCommand('copy')
    buttonRef.current!.focus()
    triggerCooldown()
  }

  return (
    <div className='Invite'>
      <h2>Inviter des joueurs</h2>
      <p>Pour inviter des joueurs, partagez le lien ci-dessous:</p>
      <div className='Invite__Form'>
        <label htmlFor='linkInput' className='Invite__FormLabel'>
          Lien d'invitation :
        </label>
        <input
          id='linkInput'
          ref={linkInputRef}
          type='text'
          readOnly
          className='Invite__FormInput'
          value={gameUrl}
          onClick={selectLinkText}
        />
        <Button
          ref={buttonRef}
          small
          className='Invite__FormButton'
          onClick={copyToClipboard}
        >
          {isCoolingDown ? 'Copié' : 'Copier'}
        </Button>
      </div>
    </div>
  )
}

export default Invite

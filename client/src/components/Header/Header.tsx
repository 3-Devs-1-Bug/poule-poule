import React, { FC } from 'react'
import icon from '../../images/icon.svg'

import './Header.scss'

export interface HeaderProps {
  title?: string
  subtitle?: string
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => (
  <header className='Header'>
    <img className='Header--Icon' src={icon} alt='Logo de Poule poule' />
    <div className='Header--Content'>
      <h1>{title}</h1>
      <span className='Header--Subtitle'>{subtitle}</span>
    </div>
  </header>
)

export default Header

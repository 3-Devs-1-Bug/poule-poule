import React, { FC } from 'react'
import icon from '../../images/icon.svg'
import './Header.scss'

export interface HeaderProps {
  title: string
  subtitle: string
}

const Header: FC<HeaderProps> = ({ title, subtitle }) => (
  <header className='Header'>
    <img className='Header__Icon' src={icon} alt='Logo de Poule poule' />
    <div>
      <h1>{title}</h1>
      <span className='Header__Subtitle'>{subtitle}</span>
    </div>
  </header>
)

export default Header

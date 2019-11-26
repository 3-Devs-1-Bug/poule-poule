import React, { FC } from 'react'
import classnames from 'classnames'

import icon from '../../images/icon.svg'
import './Header.scss'

export interface HeaderProps {
  title: string
  subtitle: string
  className?: string
}

const Header: FC<HeaderProps> = ({ title, subtitle, className }) => {
  const classes = classnames(className, 'Header')

  return (
    <header className={classes}>
      <img className='Header__Icon' src={icon} alt='' />
      <div>
        <h1>{title}</h1>
        <span className='Header__Subtitle'>{subtitle}</span>
      </div>
    </header>
  )
}

export default Header

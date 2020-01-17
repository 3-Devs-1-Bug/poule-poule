import React, { FC } from 'react'
import classnames from 'classnames'

import icon from '../../images/icon.jpg'
import './Header.scss'

export interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const classes = classnames(className, 'Header')

  return (
    <header className={classes}>
      <img className='Header__Icon' src={icon} alt='' />
      <h1>Poule Poule</h1>
    </header>
  )
}

export default Header

import React, { FC } from 'react'
import classnames from 'classnames'

import './Header.scss'
import { Link } from '@reach/router'

export interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const classes = classnames(className, 'Header')

  return (
    <header className={classes}>
      <Link className='Header__Link' to='/'>
        <img className='Header__Icon' src='/icon-512x512.png' alt='' />
        <h1>Poule Poule</h1>
      </Link>
    </header>
  )
}

export default Header

import React, { FC } from 'react'
import classnames from 'classnames'

import logo from '../../images/logo.png'
import './Header.scss'
import { Link } from '@reach/router'

export interface HeaderProps {
  title: string
  className?: string
}

const Header: FC<HeaderProps> = ({ title = 'Poule poule', className }) => {
  const classes = classnames(className, 'Header')

  return (
    <header className={classes}>
      <Link className='Header__Link' to='/'>
        <img className='Header__Icon' src={logo} alt='' />
        <h1>{title}</h1>
      </Link>
    </header>
  )
}

export default Header

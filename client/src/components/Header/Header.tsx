import React, { FC } from 'react'
import classnames from 'classnames'
import './Header.scss'

export interface HeaderProps {
  title: string
  subtitle: string
  logoSrc: string

  className?: string
}

const Header: FC<HeaderProps> = ({ logoSrc, title, subtitle, className }) => {
  const classes = classnames(className, 'Header')
  return (
    <header className={classes}>
      <img src={logoSrc} alt='' className='Header__image' />
      <div className='Header__titles'>
        <h1 className='Header__titles__title'>{title}</h1>
        <p className='Header__titles__subtitle'>{subtitle}</p>
      </div>
    </header>
  )
}

export default Header

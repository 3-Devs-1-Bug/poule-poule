import React, { FC, useState, useRef, useEffect } from 'react'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { Helmet, HelmetProps } from 'react-helmet'

import logo from '../../images/logo.png'
import './Header.scss'

export interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const classes = classnames(className, 'Header')

  const [title, setTitle] = useState<string>('')
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) titleRef.current.focus()
  }, [])

  return (
    <header className={classes}>
      <Link className='Header__Link' to='/'>
        <img className='Header__Icon' src={logo} alt='' />
        <h1 tabIndex={-1} ref={titleRef}>
          {title}
        </h1>
      </Link>
      <Helmet
        onChangeClientState={(props: HelmetProps) =>
          setTitle(props.title || 'Poule Poule')
        }
      />
    </header>
  )
}

export default Header

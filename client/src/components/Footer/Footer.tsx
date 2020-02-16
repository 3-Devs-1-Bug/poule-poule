import React, { FC } from 'react'
import classnames from 'classnames'
import { Link } from '@reach/router'

import External from '../../components/External'
import './Footer.scss'

export interface FooterProps {
  className?: string
}

const Footer: FC<FooterProps> = ({ className }) => {
  const classes = classnames(className, 'Footer')

  return (
    <footer className={classes}>
      <ul>
        <li className='Footer__Link'>
          <a href='poule-poule-regles-fr.pdf' download>
            Règles du jeu (PDF)
          </a>
        </li>
        <li className='Footer__Link'>
          <Link to='/a-propos'>À propos</Link>
        </li>
        <li className='Footer__Link'>
          <a
            href='https://www.philibertnet.com/en/oka-luda/78320-poule-poule-3701273300022.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Acheter le jeu
            <External />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer

import React, { FC } from 'react'
import classnames from 'classnames'

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
          <a href='/a-propos'>À propos</a>
        </li>
        <li className='Footer__Link'>
          <a
            href='https://www.philibertnet.com/en/oka-luda/78320-poule-poule-3701273300022.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Acheter le jeu
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <title>(ouvre dans un nouvel onglet)</title>
              <path d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z' />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer

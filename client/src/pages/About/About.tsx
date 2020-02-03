import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

import External from '../../components/External'
import './About.scss'

export interface AboutProps extends RouteComponentProps {}

const About: FC<AboutProps> = () => {
  return (
    <div className='About'>
      <p className='subtitle'>À propos de cette version de Poule Poule.</p>

      <div className='About__Section'>
        <h2>Avertissement</h2>
        <p>
          Il s'agit d'une{' '}
          <strong>
            version non-officielle de Poule Poule réalisée dans un cadre
            désintéressé
          </strong>
          . Nous ne gagnons pas d'argent via cette version du jeu et cela n'est
          et ne sera pas notre objectif.
        </p>
        <p>
          Pour vous procurer le jeu officiel (et nous vous le conseillons !),
          vous pouvez vous rendre sur{' '}
          <a href='https://www.philibertnet.com/fr/oka-luda/78320-poule-poule-3701273300022.html'>
            Philibertnet
            <External />
          </a>
          .
        </p>
      </div>

      <div className='About__Section'>
        <h2>3 devs et 1 bug</h2>
        <p>
          Nous sommes un groupe de 3 développeurs web passionnés :{' '}
          <a href='https://www.linkedin.com/in/adrien-boutigny/'>
            Adrien
            <External />
          </a>
          ,{' '}
          <a href='https://quentin-bellanger.com'>
            Quentin
            <External />
          </a>{' '}
          et{' '}
          <a href='https://www.linkedin.com/in/stephen-granger-907656109/'>
            Stephen
            <External />
          </a>
          . Pour toute question, suggestion d'amélioration ou remontée de bugs,
          n'hésitez pas à nous contacter à cette adresse :{' '}
          <a href='mailto:contact@poule-poule.com'>contact@poule-poule.com</a>.
        </p>
        <p>
          Le code du site est <span lang='en'>open source</span> et disponible
          en ligne sur{' '}
          <a href='https://github.com/3-Devs-1-Bug/poule-poule'>
            GitHub.com
            <External />
          </a>
          . Le site a été réalisé avec les technologies suivantes :
        </p>
        <ul className='list'>
          <li>Front-end : React et Typescript.</li>
          <li>Back-end : .NET Core.</li>
          <li>Gestion du temps réel : signalr</li>
        </ul>
      </div>

      <div className='About__Section'>
        <h2>Crédits</h2>
        <ul className='list'>
          <li>
            L'idée de cette version en ligne vient du jeu officiel{' '}
            <a href='https://okaluda.fr/poule-poule/'>
              Poule Poule
              <External />
            </a>
            , réalisé par Charles Bossart et Pauline Berdal et édité par la{' '}
            <a href='https://okaluda.fr/'>
              société Oka Luda
              <External />
            </a>
            . Merci à eux !
          </li>
          <li>
            L'icône de poule a été réalisé par Freepik sur{' '}
            <a href='https://www.flaticon.com/free-icon/hen_1864470?term=hen&page=1&position=8'>
              flaticon.com
              <External />
            </a>
            .
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About

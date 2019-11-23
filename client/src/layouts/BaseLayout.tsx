import React, { FC } from 'react'
import { Link } from '@reach/router'

import Header from '../components/Header'

const BaseLayout: FC = ({ children }) => (
  <>
    <nav>
      <ul>
        <li>
          <Link to='/'>Index</Link>
        </li>
        <li>
          <Link to='/klsdjflksdjflksdf'>Non existing route</Link>
        </li>
        <li>
          <Link to='/game/12345'>Some game lobby/room</Link>
        </li>
      </ul>
    </nav>
    <Header
      logoSrc='https://picsum.photos/id/69/125'
      title='Poule poule'
      subtitle="Il ne faut pas compter les oeufs au popotin d'une poule."
    />
    {children}
  </>
)

export default BaseLayout

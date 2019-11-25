import React, { FC } from 'react'
import { Link } from '@reach/router'
import Header from '../components/Header'

const BaseLayout: FC = ({ children }) => (
  <>
    <Header
      title='Poule poule'
      subtitle='Il ne faut pas compter les oeufs au popotin d’une poule.'
    />
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
    {children}
  </>
)

export default BaseLayout

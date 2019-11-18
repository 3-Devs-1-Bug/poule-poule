import React, { FC } from 'react'
import { Link } from '@reach/router'

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
    <h1>Poule Poule</h1>
    {children}
  </>
)

export default BaseLayout

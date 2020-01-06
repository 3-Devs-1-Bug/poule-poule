import React, { FC } from 'react'
import Header from '../components/Header'

import './BaseLayout.scss'

const BaseLayout: FC = ({ children }) => (
  <div className='BaseLayout'>
    <main className='BaseLayout__Content'>
      <Header
        title='Poule poule'
        subtitle='Il ne faut pas compter les oeufs au popotin d’une poule.'
      />
      {children}
    </main>
    <div className='BaseLayout__Background' />
  </div>
)

export default BaseLayout

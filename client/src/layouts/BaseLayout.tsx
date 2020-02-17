import React, { FC } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './BaseLayout.scss'

const BaseLayout: FC = ({ children }) => (
  <main className='BaseLayout'>
    <Header title={document.title} className='BaseLayout__Header' />
    <div className='BaseLayout__Content'>{children}</div>
    <Footer className='BaseLayout__Footer' />
  </main>
)

export default BaseLayout

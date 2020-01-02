import React, { FC, ReactNode } from 'react'
import Header from '../components/Header'
import { RouteComponentProps } from '@reach/router'

export interface LayoutProps extends RouteComponentProps {
  subtitle: string
  children: ReactNode
}
const BaseLayout: FC<LayoutProps> = ({ subtitle, children }) => (
  <div className='BaseLayout'>
    <main className='BaseLayout__Content'>
    <Header title='Poule poule' subtitle={subtitle} />
    {children}
    </main>
    <div className='BaseLayout__Background' />
  </div>
)

export default BaseLayout

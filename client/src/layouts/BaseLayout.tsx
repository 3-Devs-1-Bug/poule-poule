import React, { FC } from 'react'
import Header from '../components/Header'

const BaseLayout: FC = ({ children }) => (
  <>
    <Header
      title='Poule poule'
      subtitle='Il ne faut pas compter les oeufs au popotin d’une poule.'
    />
    {children}
  </>
)

export default BaseLayout

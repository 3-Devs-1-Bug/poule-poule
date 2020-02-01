import React, { FC } from 'react'
import { RouteComponentProps } from '@reach/router'

export interface AboutProps extends RouteComponentProps {}

const About: FC<AboutProps> = () => {
  return <div className='About'>À propos.</div>
}

export default About

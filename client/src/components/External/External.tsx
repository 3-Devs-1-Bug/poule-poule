import React, { FC } from 'react'
import classnames from 'classnames'

import './External.scss'

export interface ExternalProps {
  className?: string
}

const External: FC<ExternalProps> = ({ className }) => {
  const classes = classnames(className, 'External')

  return (
    <svg
      className={classes}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <title>ouvre dans un nouvel onglet</title>
      <path d='M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z' />
    </svg>
  )
}

export default External

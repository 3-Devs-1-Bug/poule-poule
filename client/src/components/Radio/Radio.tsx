import React, { FC } from 'react'
import classnames from 'classnames'

import './Radio.scss'

export interface RadioProps {
  label: string
  checked: boolean
  className?: string
}

const Radio: FC<RadioProps> = ({
  label,
  checked = false,
  className,
  ...other
}) => {
  const classes = classnames(className, 'Radio')
  return (
    <label className={classes}>
      <input
        type='radio'
        {...other}
        checked={checked}
        className='Radio__Input sr-only'
      />
      <span className='Radio__Label'>{label}</span>
    </label>
  )
}

export default Radio

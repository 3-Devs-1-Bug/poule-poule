import React, { FC, InputHTMLAttributes } from 'react'
import classnames from 'classnames'
import './Radio.scss'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string

  className?: string
}

const Radio: FC<RadioProps> = ({ label, className, ...other }) => {
  const classes = classnames(className, 'Radio')
  return (
    <label className={classes}>
      {label}
      <input className='Radio__input visually-hidden' type='radio' {...other} />
      <span className='Radio__checkmark' />
    </label>
  )
}

export default Radio

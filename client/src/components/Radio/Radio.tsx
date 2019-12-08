import React, { FC, InputHTMLAttributes, ChangeEvent } from 'react'
import classnames from 'classnames'

import './Radio.scss'

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  checked: boolean
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const Radio: FC<RadioProps> = ({
  label,
  checked,
  value,
  onChange,
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
        value={value}
        onChange={onChange}
      />
      <span className='Radio__Label'>{label}</span>
    </label>
  )
}

export default Radio

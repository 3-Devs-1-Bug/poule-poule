import React, { FC, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  className?: string
  children?: string
}

const Button: FC<ButtonProps> = ({ primary, className, ...other }) => {
  const classes = classnames(className, 'Button', {
    'Button--Primary': primary
  })
  return <button {...other} className={classes} />
}

export default Button

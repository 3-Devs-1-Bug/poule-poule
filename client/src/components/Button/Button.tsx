import React, { FC, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: string
}

const Button: FC<ButtonProps> = ({ className, ...other }) => {
  const classes = classnames(className, 'Button')
  return <button {...other} className={classes} />
}

export default Button

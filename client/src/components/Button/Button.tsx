import React, { forwardRef, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: string
  small?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, small, ...other }, ref) => {
    const classes = classnames(className, 'Button', { 'Button--Small': small })
    return <button ref={ref} {...other} className={classes} />
  }
)

export default Button

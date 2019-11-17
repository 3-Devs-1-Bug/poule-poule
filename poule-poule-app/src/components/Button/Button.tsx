import React, { FC, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './Button.scss'

// Our Button should be able to receive the sames props as a native button.
// So the `props` type extends the `ButtonHTMLAttributes` interface which contains
// all the native button attributes (type, aria-xxx, onClick, etc).
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  className?: string
  // we override the default `children` type to only allow string
  children?: string
}

const Button: FC<ButtonProps> = ({ primary, className, ...other }) => {
  // Using the `classnames` function, we merge our Button's classes with
  // the ones we received from the parent component.
  // We can use an object to conditionnaly add classes (e.g. `Button-primary`).
  const classes = classnames(className, 'Button', { 'Button-primary': primary })
  return <button {...other} className={classes} />
}

export default Button

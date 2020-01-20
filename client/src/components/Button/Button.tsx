import React, { FC, ButtonHTMLAttributes } from 'react'
import classnames from 'classnames'

import './Button.scss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: string
  ref?: React.RefObject<HTMLButtonElement>
}

const Button: FC<ButtonProps> = ({ className, ...other }, ref) => {
  const classes = classnames(className, 'Button')
  return <button ref={ref} {...other} className={classes} />
}

const forwardButton = React.forwardRef(Button)

export default forwardButton

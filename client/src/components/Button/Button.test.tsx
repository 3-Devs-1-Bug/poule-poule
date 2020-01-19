import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button />)
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('renders a button', () => {
    const { container } = render(<Button />)
    expect(container.firstElementChild!.tagName).toBe('BUTTON')
  })

  it('applies default class', () => {
    const { container } = render(<Button />)
    expect(container.firstElementChild).toHaveClass('Button')
  })
})

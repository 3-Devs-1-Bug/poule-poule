import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />)
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('renders a Header', () => {
    const { container } = render(<Header />)
    expect(container.firstElementChild!.tagName).toBe('HEADER')
  })
})

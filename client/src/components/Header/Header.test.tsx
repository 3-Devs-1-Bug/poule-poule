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

  it('renders the title prop', () => {
    const { container } = render(<Header title='Hello world' />)
    const title = container.querySelector('h1')
    expect(title).toHaveTextContent('Hello world')
  })

  it('renders the subtitle prop', () => {
    const { container } = render(<Header subtitle='dlrow olleH' />)
    const title = container.querySelector('span')
    expect(title).toHaveTextContent('dlrow olleH')
  })
})

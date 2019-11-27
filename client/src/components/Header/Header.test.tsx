import React from 'react'
import { render, getByText } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header title='title' subtitle='subtitle' />)
    expect(container.firstElementChild).toBeInTheDocument()
  })

  it('renders a Header', () => {
    const { container } = render(<Header title='title' subtitle='subtitle' />)
    expect(container.firstElementChild!.tagName).toBe('HEADER')
  })

  it('renders the title prop', () => {
    const { getByText } = render(<Header title='title' subtitle='subtitle' />)
    const title = getByText(container, 'title')
    expect(title).toHaveTextContent('title')
  })

  it('renders the subtitle prop', () => {
    const { container } = render(<Header title='title' subtitle='subtitle' />)
    const subtitle = getByText(container, 'subtitle')
    expect(subtitle).toHaveTextContent('subtitle')
  })
})

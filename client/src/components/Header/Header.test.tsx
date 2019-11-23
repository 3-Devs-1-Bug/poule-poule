import React from 'react'
import { render } from '@testing-library/react'
import Header from './Header'

const mockProps = {
  logoSrc: 'https://picsum.photos/125',
  title: 'Poule poule',
  subtitle: "Il ne faut pas compter les oeufs au popotin d'une poule."
}

describe('Header', () => {
  it('renders a header', () => {
    const { container } = render(<Header {...mockProps} />)
    expect(container.firstElementChild).toBeInTheDocument()
    expect(container.firstElementChild!.tagName).toBe('HEADER')
  })

  it('renders a h1 title', () => {
    const { getByText } = render(<Header {...mockProps} />)
    expect(getByText(mockProps.title).tagName).toBe('H1')
  })

  /*
  h1–h6 elements must not be used to markup subheadings, subtitles, alternative
  titles and taglines unless intended to be the heading for a new section or
  subsection.
  */
  it('renders a p subtitle', () => {
    const { getByText } = render(<Header {...mockProps} />)
    expect(getByText(mockProps.subtitle).tagName).toBe('P')
  })
})

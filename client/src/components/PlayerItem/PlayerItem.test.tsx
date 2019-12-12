import React from 'react'
import { render } from '@testing-library/react'
import PlayerItem from './PlayerItem'

describe('PlayerItem', () => {
  it('renders without crashing', () => {
    const { container } = render(<PlayerItem name='Martin' />)
    expect(container).toBeInTheDocument()
  })

  it('identifies myself if isSelf is true', () => {
    const { getByRole } = render(<PlayerItem name='Martin' isSelf={true} />)
    const fullName = getByRole('listitem')
    expect(fullName).toHaveTextContent('Martin (moi)')
  })
})

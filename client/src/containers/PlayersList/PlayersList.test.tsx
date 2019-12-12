import React from 'react'
import { render } from '@testing-library/react'
import PlayersList from './PlayersList'

const playersMock = [
  { name: 'Beth', id: '1' },
  { name: 'John', id: '2' }
]

describe('PlayersList', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PlayersList players={playersMock} currentPlayerId='2' />
    )
    expect(container).toBeInTheDocument()
  })

  it('renders the correct number of players', () => {
    const { getAllByRole } = render(
      <PlayersList players={playersMock} currentPlayerId='2' />
    )
    const items = getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })
})

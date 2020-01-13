import React from 'react'
import { render } from '@testing-library/react'
import PlayerList from './PlayerList'
import { Player } from '../../types/Player'

const playersMock: Array<Player> = [
  { name: 'Beth', id: '1', score: 0 },
  { name: 'John', id: '2', score: 0 }
]

describe('PlayerList', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <PlayerList players={playersMock} currentPlayerId='2' />
    )
    expect(container).toBeInTheDocument()
  })

  it('renders the correct number of players', () => {
    const { getAllByRole } = render(
      <PlayerList players={playersMock} currentPlayerId='2' />
    )
    const items = getAllByRole('listitem')
    expect(items).toHaveLength(2)
  })
})

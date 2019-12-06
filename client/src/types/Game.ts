import { Player } from './Player'

export interface Game {
  id: number
  hostId: string
  status: 'PENDING_START' | 'IN_PROGRESS' | 'ENDED'
  creationDate: string
  difficulty: string
  cardSpeed: Number
  roundsToWin: Number
  players: Array<Player>
}

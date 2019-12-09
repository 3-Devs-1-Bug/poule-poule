import { Player } from './Player'
import { Difficulty } from './Difficulty'

export interface Game {
  id: number
  hostId: string
  status: 'PENDING_START' | 'IN_PROGRESS' | 'ENDED'
  creationDate: string
  difficulty: Difficulty
  cardSpeed: Number
  roundsToWin: Number
  players: Array<Player>
}

import { Player } from './Player'
import { Difficulty } from './Difficulty'
import { GameStatus } from './GameStatus'

export interface Game {
  id: number
  hostId: string
  status: GameStatus
  creationDate: string
  difficulty: Difficulty
  cardSpeed: number
  roundsToWin: number
  players: Array<Player>
}

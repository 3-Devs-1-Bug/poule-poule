import { Difficulty } from './Difficulty'

export interface GameItem {
  id: number
  creationDate: string
  difficulty: Difficulty
  cardSpeed: number
  roundsToWin: number
  playerCount: number
}

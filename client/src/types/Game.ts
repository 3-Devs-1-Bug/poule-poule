import { Player } from './Player'

export interface Game {
  id: number
  hostId: string
  status: string
  creationDate: string
  players: Array<Player>
}

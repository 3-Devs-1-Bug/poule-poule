import { Difficulties } from './Difficulties'

export interface Settings {
  difficulty: Difficulties
  roundsToWin: 3 | 5 | 10
  cardSpeed: 1.5 | 2 | 2.5
}

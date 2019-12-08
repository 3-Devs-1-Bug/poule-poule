import { Difficulties } from './Difficulties'

export interface SettingsType {
  difficulty: Difficulties
  duration: 3 | 5 | 10
  speed: 1.5 | 2 | 2.5
}

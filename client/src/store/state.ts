import { DeepReadonly } from 'utility-types'

export type State = DeepReadonly<{
  count: number
  foo: boolean
  roomId: string | null
  playerId: string | null
  loading: boolean
  error: string | null
}>

export const initialState: State = {
  count: 0,
  foo: true,
  roomId: null,
  playerId: null,
  loading: false,
  error: null
}

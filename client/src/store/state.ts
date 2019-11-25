import { DeepReadonly } from 'utility-types'

export type State = DeepReadonly<{
  count: number
  foo: boolean
}>

export const initialState: State = {
  count: 0,
  foo: true
}

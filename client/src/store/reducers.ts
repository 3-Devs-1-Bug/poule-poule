import { ActionType, createReducer } from 'typesafe-actions'

import * as actions from './actions'
import { ADD, TOGGLE } from './constants'
import { initialState, State } from './state'

export type Action = ActionType<typeof actions>

const rootReducer = createReducer<State, Action>(initialState)
  .handleType(ADD, (state, { payload }) => ({
    ...state,
    count: state.count + payload
  }))
  .handleType(TOGGLE, state => ({ ...state, foo: !state.foo }))

export default rootReducer

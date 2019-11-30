import { ActionType, createReducer } from 'typesafe-actions'

import * as actions from './actions'
import {
  ADD,
  TOGGLE,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
} from './constants'
import { initialState, State } from './state'

export type Action = ActionType<typeof actions>

const rootReducer = createReducer<State, Action>(initialState)
  .handleType(ADD, (state, { payload }) => ({
    ...state,
    count: state.count + payload
  }))
  .handleType(TOGGLE, state => ({ ...state, foo: !state.foo }))
  .handleType(CREATE_ROOM_REQUEST, state => ({ ...state, loading: true }))
  .handleType(
    CREATE_ROOM_SUCCESS,
    (state, { payload: { roomId, userId } }) => ({
      ...state,
      loading: false,
      roomId: roomId,
      playerId: userId
    })
  )
  .handleType(CREATE_ROOM_FAILURE, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload.message
  }))

export default rootReducer

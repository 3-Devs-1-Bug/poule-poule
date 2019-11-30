import { ThunkAction } from 'redux-thunk'

import { createRoomAsync } from './actions'
import { Action } from './reducers'
import { State } from './state'
import { createRoom as createRoomApi } from '../utils/api'

export const createRoom = (): ThunkAction<void, State, undefined, Action> => {
  return dispatch => {
    dispatch(createRoomAsync.request())
    return createRoomApi()
      .then(result => dispatch(createRoomAsync.success(result)))
      .catch(reason => createRoomAsync.failure(reason))
  }
}

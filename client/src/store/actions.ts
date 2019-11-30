import { createAction, createAsyncAction } from 'typesafe-actions'

import {
  ADD,
  TOGGLE,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_FAILURE,
  CREATE_ROOM_SUCCESS
} from './constants'
import { CreateRoomResponse } from '../utils/api'

export const add = createAction(ADD)<number>()
export const toggle = createAction(TOGGLE)()

export const createRoomAsync = createAsyncAction(
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE
)<void, CreateRoomResponse, Error>()

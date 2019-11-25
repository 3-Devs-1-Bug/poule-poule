import { createAction /* createAsyncAction */ } from 'typesafe-actions'

import {
  ADD,
  TOGGLE
  // FETCH_FOO_REQUEST,
  // FETCH_FOO_FAILURE,
  // FETCH_FOO_SUCCESS
} from './constants'

export const add = createAction(ADD)<number>()
export const toggle = createAction(TOGGLE)()

// export const fetchFoo = createAsyncAction(
//   FETCH_FOO_REQUEST,
//   FETCH_FOO_SUCCESS,
//   FETCH_FOO_FAILURE
// )<string, any[], Error>()

import { createStore, applyMiddleware, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import rootReducer, { Action } from './reducers'
import { initialState, State } from './state'

type DispatchFunctionType = ThunkDispatch<State, undefined, Action>

const middlewares: Middleware[] = [thunkMiddleware]
const enhancer = composeWithDevTools(
  applyMiddleware<DispatchFunctionType, State>(...middlewares)
)

const store = createStore(rootReducer, initialState, enhancer)

export default store

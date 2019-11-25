import { createStore, applyMiddleware, Middleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'
import { initialState } from './state'

const middlewares: Middleware[] = []
const enhancer = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(rootReducer, initialState, enhancer)

export default store

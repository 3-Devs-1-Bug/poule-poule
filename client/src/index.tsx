import React from 'react'
import ReactDOM from 'react-dom'

import store from './store'
import './index.scss'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { createRoom } from './store/thunks'

console.log(store.getState())

store.dispatch({ type: 'ADD', payload: 4 })
store.dispatch(createRoom())

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

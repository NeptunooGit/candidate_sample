import 'babel-polyfill'
import './styles/app.css'

import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'

import createStore, { history } from './store/createStore'
import Routes from './routes/Routes'

const MOUNT_NODE = document.getElementById('root')
const store = createStore()

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
)

render(<App />, MOUNT_NODE)

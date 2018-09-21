import {
  applyMiddleware,
  compose,
  createStore as createReduxStore,
} from 'redux'

import createHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import pick from 'ramda/src/pick'
import pipe from 'ramda/src/pipe'
import { responsiveStoreEnhancer } from 'redux-responsive'
import { routerMiddleware } from 'react-router-redux'
import throttle from 'lodash/throttle'

import {
  getLocalState,
  saveLocalQuery,
  saveLocalState,
} from './localStorage'

import makeRootReducer from './reducers'
import sagas from './sagas'

export const history = createHistory()
const initialState = getLocalState()

const formatState = state => ({
  views: pick(['form'], state.views),
  data: state.data,
})

const createStore = (state = initialState) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [routerMiddleware(history), sagaMiddleware]
  const reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const isDev = process.env.NODE_ENV === 'development'
  const extensionExists = typeof reduxExtension === 'function'
  const reduxDevExists = (isDev && extensionExists)
  const composeEnhancers = reduxDevExists ? reduxExtension : compose
  const enhancers = composeEnhancers(applyMiddleware(...middleware), responsiveStoreEnhancer)
  const rootReducer = makeRootReducer()
  const store = createReduxStore(rootReducer, state, enhancers)
  const saveState = pipe(formatState, saveLocalState)
  const saveStoreState = () => saveState(store.getState())

  store.subscribe(throttle(saveStoreState, 3000))
  sagaMiddleware.run(sagas)
  saveLocalQuery(window.location.search)

  return store
}

export default createStore

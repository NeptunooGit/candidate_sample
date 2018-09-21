import { combineReducers } from 'redux'
import { createResponsiveStateReducer } from 'redux-responsive'
import { routerReducer } from 'react-router-redux'

import dataReducer from './data/reducers'
import viewsReducer from './views/reducers'

const breakpoints = {
  extraSmall: 480,
  small: 650,
  medium: 767,
  large: 1000,
  extraLarge: 1250,
}

const makeRootReducer = reducers => combineReducers({
  browser: createResponsiveStateReducer(breakpoints),
  router: routerReducer,
  views: viewsReducer,
  data: dataReducer,
  ...reducers,
})

export default makeRootReducer

import { combineReducers } from 'redux'

import form from './form/reducers'
import home from './home/reducers'
import shared from './shared/reducers'
import thankYou from './thankYou/reducers'

export default combineReducers({
  form,
  home,
  shared,
  thankYou,
})

import { combineReducers } from 'redux'

import form from './form/reducers'
import general from './general/reducers'

export default combineReducers({
  form,
  general,
})

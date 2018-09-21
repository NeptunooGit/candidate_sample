import assoc from 'ramda/src/assoc'
import { handleActions } from 'redux-actions'

import { SET_PHONE_SUCCEEDED } from './actions'

const initialState = {
  phoneNumber: '877-821-8188',
}

const setPhoneSucceeded = (state, { payload }) => assoc('phoneNumber', payload, state)

export default handleActions({
  [SET_PHONE_SUCCEEDED]: setPhoneSucceeded,
}, initialState)

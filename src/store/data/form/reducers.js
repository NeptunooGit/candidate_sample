import { handleActions } from 'redux-actions'
import merge from 'ramda/src/merge'

import {
  MODIFY_FORM,
  RESET_FORM,
} from './actions'

const initialState = {
  address: null,
  birthDay: null,
  birthMonth: null,
  birthYear: null,
  city: null,
  email: null,
  firstName: null,
  gender: null,
  lastName: null,
  phone: null,
  state: null,
  zip: null,
}

const modifyForm = (state, { payload }) => merge(state, payload)
const resetForm = () => initialState

export default handleActions({
  [MODIFY_FORM]: modifyForm,
  [RESET_FORM]: resetForm,
}, initialState)

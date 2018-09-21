import { call, put, takeLatest } from 'redux-saga/effects'
// import fetch from 'axios'

import {
  SAVE_EMAIL,
  SAVE_EMAIL_FAILED,
  SAVE_EMAIL_SUCCEEDED,
} from './actions'

import { trackFormEvent } from '../../../shared/utils/event'

// Requests
const saveEmailRequest = async email => {
  // const opts = {
  // method: 'post',
  // params: { email },
  // url: '',
  // }

  const response = { status: 201 }
  // const response = await fetch(opts).catch(() => false)

  if (!response || response.status !== 201) {
    return false
  }

  return true
}

// Workers
function* saveEmail({ payload }) {
  const success = yield call(saveEmailRequest, payload)
  const successMessage = 'Thank you for signing up!'
  const errorMessage = 'There was an issue saving email. Try again.'

  if (success) {
    yield put({ type: SAVE_EMAIL_SUCCEEDED, payload: successMessage })
    trackFormEvent({ action: 'save_email', property: 'SAVE_EMAIL_SUCCEEDED' })
  } else {
    yield put({ type: SAVE_EMAIL_FAILED, payload: errorMessage })
    trackFormEvent({ action: 'save_email', property: 'SAVE_EMAIL_FAILED' })
  }
}

export default [
  takeLatest(SAVE_EMAIL, saveEmail),
]

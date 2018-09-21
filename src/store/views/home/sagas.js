import { all, call, put, takeLatest } from 'redux-saga/effects'
import assoc from 'ramda/src/assoc'
import fetch from 'axios'

import {
  FETCH_LOCATION,
  FETCH_LOCATION_FAILED,
  FETCH_LOCATION_SUCCEEDED,
} from './actions'

import { MODIFY_FORM } from '../../data/form/actions'
import { processLocation } from '../../../shared/utils/location'
import { PROGRESS_INCREMENT } from '../../../routes/FormView/FormView'
import { SET_HAS_ZIP, SET_PROGRESS } from '../../views/form/actions'

const key = process.env.REACT_APP_GOOGLE_API_KEY || ''

// Requests
const fetchLocationRequest = async zip => {
  const opts = {
    method: 'get',
    params: { address: zip, key },
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
  }

  const response = await fetch(opts).catch(() => false)
  const location = processLocation(response)

  if (!response || response.status !== 200 || !location) {
    return false
  }

  return location
}

// Workers
function* fetchLocation({ payload }) {
  const location = yield call(fetchLocationRequest, payload)
  const error = 'There was an issue retrieving location. Please try again.'

  if (!location) {
    yield put({ type: FETCH_LOCATION_FAILED, payload: error })
  } else {
    yield all([
      put({ type: FETCH_LOCATION_SUCCEEDED, payload: location }),
      put({ type: MODIFY_FORM, payload: assoc('zip', payload, location) }),
      put({ type: SET_HAS_ZIP, payload: true }),
      put({ type: SET_PROGRESS, payload: PROGRESS_INCREMENT }),
    ])
  }
}

export default [
  takeLatest(FETCH_LOCATION, fetchLocation),
]

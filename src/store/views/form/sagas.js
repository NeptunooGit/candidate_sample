import { all, call, put, takeLatest } from 'redux-saga/effects'
import assoc from 'ramda/src/assoc'
import fetch from 'axios'
import isNil from 'ramda/src/isNil'

import {
  FETCH_LOCATION,
  FETCH_LOCATION_FAILED,
  FETCH_LOCATION_SUCCEEDED,
  RESET_VIEW_FORM,
  SUBMIT_FORM,
  SUBMIT_FORM_FAILED,
  SUBMIT_FORM_SUCCEEDED,
} from './actions'

import {
  getLocalDomainSession,
  getLocalQuery,
  getLocalTrustedFormCert,
} from '../../localStorage'

import { parseQuery } from '../../../shared/utils/parseQuery'
import { processLocation } from '../../../shared/utils/location'
import { MODIFY_FORM, RESET_FORM } from '../../data/form/actions'
import { trackBoberdooEvent } from '../../../shared/utils/event'

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

const submitFormRequest = async form => {
  const query = getLocalQuery()
  const parsedQuery = isNil(query) ? {} : parseQuery(getLocalQuery)
  const domainSessionId = getLocalDomainSession()
  const trustedFormCert = getLocalTrustedFormCert()
  const trackResponse = response => trackBoberdooEvent({ property: { response } })

  const opts = {
    method: 'post',
    params: {
      ...form,
      ...parsedQuery,
      pub_id: domainSessionId,
      trusted_form: trustedFormCert,
    },
    url: '/api/Form/PostData',
  }

  const response = await fetch(opts).then(trackResponse).catch(() => false)

  if (!response || response.status !== 200 || response.status !== 201) {
    return false
  }

  return true
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
    ])
  }
}

function* submitForm({ payload }) {
  const success = yield call(submitFormRequest, payload)
  const errorMessage = 'There was an issue submitting form. Please try again.'

  if (success) {
    yield all([
      put({ type: SUBMIT_FORM_SUCCEEDED }),
      put({ type: RESET_VIEW_FORM }),
      put({ type: RESET_FORM }),
    ])
  } else {
    yield put({ type: SUBMIT_FORM_FAILED, payload: errorMessage })
  }
}

export default [
  takeLatest(FETCH_LOCATION, fetchLocation),
  takeLatest(SUBMIT_FORM, submitForm),
]

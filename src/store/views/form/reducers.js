import assoc from 'ramda/src/assoc'
import { handleActions } from 'redux-actions'
import merge from 'ramda/src/merge'
import pipe from 'ramda/src/pipe'

import { PROGRESS_INCREMENT } from '../../../routes/FormView/FormView'

import {
  FETCH_LOCATION,
  FETCH_LOCATION_FAILED,
  FETCH_LOCATION_SUCCEEDED,
  MODIFY_VIEW_FORM,
  RESET_ALERT,
  RESET_VIEW_FORM,
  SET_HAS_ZIP,
  SET_PROGRESS,
  SHOW_ALERT,
  SUBMIT_FORM,
  SUBMIT_FORM_FAILED,
  SUBMIT_FORM_SUCCEEDED,
  TOGGLE_CALL_DIALOG,
  TOGGLE_RESET_DIALOG,
  TOGGLE_YEAR_DIALOG,
} from './actions'

const initialState = {
  callDialog: false,
  error: false,
  fetching: false,
  form: {
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
  },
  hasZip: false,
  message: null,
  progress: 0,
  resetDialog: false,
  submitting: false,
  success: false,
  yearDialog: false,
}

const fetchLocation = state => assoc('fetching', true, state)

const fetchLocationFailed = (state, { payload }) =>
  pipe(
    assoc('fetching', false),
    assoc('message', payload),
    assoc('error', true)
  )(state)

const fetchLocationSucceeded = (state, { payload }) =>
  pipe(
    assoc('fetching', false),
    assoc('form', merge(state.form, payload)),
    assoc('progress', PROGRESS_INCREMENT)
  )(state)

const modifyViewForm = (state, { payload }) => assoc('form', merge(state.form, payload), state)

const resetAlert = state =>
  pipe(
    assoc('error', false),
    assoc('success', false)
  )(state)

const resetViewForm = state =>
  pipe(
    assoc('form', initialState.form),
    assoc('hasZip', false),
    assoc('progress', 0)
  )(state)

const setHasZip = (state, { payload }) => assoc('hasZip', payload, state)
const setProgress = (state, { payload }) => assoc('progress', payload, state)

const showAlert = (state, { payload }) =>
  pipe(
    assoc('message', payload),
    assoc('error', true)
  )(state)

const submitForm = state => assoc('submitting', true, state)

const submitFormFailed = (state, { payload }) =>
  pipe(
    assoc('submitting', false),
    assoc('message', payload),
    assoc('error', true)
  )(state)

const submitFormSucceeded = (state, { payload }) =>
  pipe(
    assoc('submitting', false),
    assoc('success', true)
  )(state)

const toggleCallDialog = (state, { payload }) => assoc('callDialog', payload, state)
const toggleResetDialog = state => assoc('resetDialog', !state.resetDialog, state)
const toggleYearDialog = (state, { payload }) => assoc('yearDialog', payload, state)

export default handleActions({
  [FETCH_LOCATION]: fetchLocation,
  [FETCH_LOCATION_FAILED]: fetchLocationFailed,
  [FETCH_LOCATION_SUCCEEDED]: fetchLocationSucceeded,
  [MODIFY_VIEW_FORM]: modifyViewForm,
  [RESET_ALERT]: resetAlert,
  [RESET_VIEW_FORM]: resetViewForm,
  [SET_HAS_ZIP]: setHasZip,
  [SET_PROGRESS]: setProgress,
  [SHOW_ALERT]: showAlert,
  [SUBMIT_FORM]: submitForm,
  [SUBMIT_FORM_FAILED]: submitFormFailed,
  [SUBMIT_FORM_SUCCEEDED]: submitFormSucceeded,
  [TOGGLE_CALL_DIALOG]: toggleCallDialog,
  [TOGGLE_RESET_DIALOG]: toggleResetDialog,
  [TOGGLE_YEAR_DIALOG]: toggleYearDialog,
}, initialState)

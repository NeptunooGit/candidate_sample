import concat from 'ramda/src/concat'
import { createAction } from 'redux-actions'

const ns = concat('views/form/')

// Action Types
export const FETCH_LOCATION = ns('FETCH_LOCATION')
export const FETCH_LOCATION_FAILED = ns('FETCH_LOCATION_FAILED')
export const FETCH_LOCATION_SUCCEEDED = ns('FETCH_LOCATION_SUCCEEDED')
export const MODIFY_VIEW_FORM = ns('MODIFY_VIEW_FORM')
export const RESET_ALERT = ns('RESET_ALERT')
export const RESET_VIEW_FORM = ns('RESET_VIEW_FORM')
export const SET_HAS_ZIP = ns('SET_HAS_ZIP')
export const SET_PROGRESS = ns('SET_PROGRESS')
export const SHOW_ALERT = ns('SHOW_ALERT')
export const SUBMIT_FORM = ns('SUBMIT_FORM')
export const SUBMIT_FORM_FAILED = ns('SUBMIT_FORM_FAILED')
export const SUBMIT_FORM_SUCCEEDED = ns('SUBMIT_FORM_SUCCEEDED')
export const TOGGLE_CALL_DIALOG = ns('TOGGLE_CALL_DIALOG')
export const TOGGLE_RESET_DIALOG = ns('TOGGLE_RESET_DIALOG')
export const TOGGLE_YEAR_DIALOG = ns('TOGGLE_YEAR_DIALOG')

// Action Creators
export const fetchLocation = createAction(FETCH_LOCATION)
export const modifyViewForm = createAction(MODIFY_VIEW_FORM)
export const resetAlert = createAction(RESET_ALERT)
export const resetViewForm = createAction(RESET_VIEW_FORM)
export const setHasZip = createAction(SET_HAS_ZIP)
export const setProgress = createAction(SET_PROGRESS)
export const showAlert = createAction(SHOW_ALERT)
export const submitForm = createAction(SUBMIT_FORM)
export const toggleCallDialog = createAction(TOGGLE_CALL_DIALOG)
export const toggleResetDialog = createAction(TOGGLE_RESET_DIALOG)
export const toggleYearDialog = createAction(TOGGLE_YEAR_DIALOG)

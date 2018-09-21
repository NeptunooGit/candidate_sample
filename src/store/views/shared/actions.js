import concat from 'ramda/src/concat'
import { createAction } from 'redux-actions'

const ns = concat('views/shared/')

// Action Types
export const MODIFY_EMAIL = ns('MODIFY_EMAIL')
export const RESET_EMAIL_ALERT = ns('RESET_EMAIL_ALERT')
export const SAVE_EMAIL = ns('SAVE_EMAIL')
export const SAVE_EMAIL_FAILED = ns('SAVE_EMAIL_FAILED')
export const SAVE_EMAIL_SUCCEEDED = ns('SAVE_EMAIL_SUCCEEDED')
export const SHOW_EMAIL_ALERT = ns('SHOW_EMAIL_ALERT')
export const TOGGLE_FOOTER_BOTTOM = ns('TOGGLE_FOOTER_BOTTOM')

// Action Creators
export const modifyEmail = createAction(MODIFY_EMAIL)
export const resetEmailAlert = createAction(RESET_EMAIL_ALERT)
export const saveEmail = createAction(SAVE_EMAIL)
export const showEmailAlert = createAction(SHOW_EMAIL_ALERT)
export const toggleFooterBottom = createAction(TOGGLE_FOOTER_BOTTOM)

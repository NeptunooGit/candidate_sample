import assocPath from 'ramda/src/assocPath'
import { handleActions } from 'redux-actions'
import pipe from 'ramda/src/pipe'

import {
  MODIFY_EMAIL,
  RESET_EMAIL_ALERT,
  SAVE_EMAIL,
  SAVE_EMAIL_FAILED,
  SAVE_EMAIL_SUCCEEDED,
  SHOW_EMAIL_ALERT,
  TOGGLE_FOOTER_BOTTOM,
} from './actions'

const initialState = {
  email: {
    email: null,
    error: false,
    fetching: false,
    message: null,
    success: false,
  },
  footer: {
    bottom: false,
  },
}

const modifyEmail = (state, { payload }) =>
  assocPath(['email', 'email'], payload, state)

const resetEmailAlert = state =>
  pipe(
    assocPath(['email', 'error'], false),
    assocPath(['email', 'success'], false)
  )(state)

const saveEmail = state => assocPath(['email', 'fetching'], true, state)

const saveEmailFailed = (state, { payload }) =>
  pipe(
    assocPath(['email', 'fetching'], false),
    assocPath(['email', 'message'], payload),
    assocPath(['email', 'error'], true)
  )(state)

const saveEmailSucceeded = (state, { payload }) =>
  pipe(
    assocPath(['email', 'fetching'], false),
    assocPath(['email', 'message'], payload),
    assocPath(['email', 'success'], true),
    assocPath(['email', 'email'], null)
  )(state)

const showEmailAlert = (state, { payload }) =>
  pipe(
    assocPath(['email', 'message'], payload.message),
    assocPath(['email', payload.type], true)
  )(state)

const toggleFooterBottom = (state, { payload }) =>
  assocPath(['footer', 'bottom'], payload, state)

export default handleActions({
  [MODIFY_EMAIL]: modifyEmail,
  [RESET_EMAIL_ALERT]: resetEmailAlert,
  [SAVE_EMAIL]: saveEmail,
  [SAVE_EMAIL_FAILED]: saveEmailFailed,
  [SAVE_EMAIL_SUCCEEDED]: saveEmailSucceeded,
  [SHOW_EMAIL_ALERT]: showEmailAlert,
  [TOGGLE_FOOTER_BOTTOM]: toggleFooterBottom,
}, initialState)

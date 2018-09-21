import concat from 'ramda/src/concat'
import { createAction } from 'redux-actions'

const ns = concat('data/form/')

// Action Types
export const MODIFY_FORM = ns('MODIFY_FORM')
export const RESET_FORM = ns('RESET_FORM')

// Action Creators
export const modifyForm = createAction(MODIFY_FORM)
export const resetForm = createAction(RESET_FORM)

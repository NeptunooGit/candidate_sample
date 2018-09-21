import concat from 'ramda/src/concat'

const ns = concat('data/general/')

// Action Types
export const SET_PHONE = ns('SET_PHONE')
export const SET_PHONE_FAILED = ns('SET_PHONE_FAILED')
export const SET_PHONE_SUCCEEDED = ns('SET_PHONE_SUCCEEDED')

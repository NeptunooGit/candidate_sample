import concat from 'ramda/src/concat'
import { createAction } from 'redux-actions'

const ns = concat('views/thank-you/')

// Action Types
export const SET_HERO_LOADING = ns('SET_HERO_LOADING')

// Action Creators
export const setHeroLoading = createAction(SET_HERO_LOADING)

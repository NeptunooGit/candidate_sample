import concat from 'ramda/src/concat'
import { createAction } from 'redux-actions'

const ns = concat('views/home/')

// Action Types
export const FETCH_LOCATION = ns('FETCH_LOCATION')
export const FETCH_LOCATION_FAILED = ns('FETCH_LOCATION_FAILED')
export const FETCH_LOCATION_SUCCEEDED = ns('FETCH_LOCATION_SUCCEEDED')
export const MODIFY_ZIP = ns('MODIFY_ZIP')
export const RESET_ZIP_ALERT = ns('RESET_ZIP_ALERT')
export const SET_ACCORDIAN_INDEX = ns('SET_ACCORDIAN_INDEX')
export const SET_HEADER_OFFSET = ns('SET_HEADER_OFFSET')
export const SET_HEADER_POSITION = ns('SET_HEADER_POSITION')
export const SET_HERO_LOADING = ns('SET_HERO_LOADING')
export const SHOW_ZIP_ALERT = ns('SHOW_ZIP_ALERT')
export const TOGGLE_COMPARE_HELP = ns('TOGGLE_COMPARE_HELP')
export const TOGGLE_COMPARE_TOOLTIP = ns('TOGGLE_COMPARE_TOOLTIP')

// Action Creators
export const fetchLocation = createAction(FETCH_LOCATION)
export const modifyZip = createAction(MODIFY_ZIP)
export const resetZipAlert = createAction(RESET_ZIP_ALERT)
export const setAccordianIndex = createAction(SET_ACCORDIAN_INDEX)
export const setHeaderOffset = createAction(SET_HEADER_OFFSET)
export const setHeaderPosition = createAction(SET_HEADER_POSITION)
export const setHeroLoading = createAction(SET_HERO_LOADING)
export const showZipAlert = createAction(SHOW_ZIP_ALERT)
export const toggleCompareHelp = createAction(TOGGLE_COMPARE_HELP)
export const toggleCompareTooltip = createAction(TOGGLE_COMPARE_TOOLTIP)

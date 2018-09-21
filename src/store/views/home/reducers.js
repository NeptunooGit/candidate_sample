import assocPath from 'ramda/src/assocPath'
import { handleActions } from 'redux-actions'
import pipe from 'ramda/src/pipe'

import {
  FETCH_LOCATION,
  FETCH_LOCATION_FAILED,
  FETCH_LOCATION_SUCCEEDED,
  MODIFY_ZIP,
  RESET_ZIP_ALERT,
  SET_ACCORDIAN_INDEX,
  SET_HEADER_OFFSET,
  SET_HEADER_POSITION,
  SET_HERO_LOADING,
  SHOW_ZIP_ALERT,
  TOGGLE_COMPARE_HELP,
  TOGGLE_COMPARE_TOOLTIP,
} from './actions'

const initialState = {
  accordian: {
    index: null,
  },
  compare: {
    showHelp: false,
    tooltip: null,
  },
  email: {
    email: null,
    error: false,
    fetching: false,
    message: null,
    success: false,
  },
  header: {
    offset: null,
    position: null,
  },
  hero: {
    loading: true,
  },
  zip: {
    error: false,
    fetching: false,
    message: null,
    success: false,
    zip: null,
  },
}

const fetchLocation = state => assocPath(['zip', 'fetching'], true, state)

const fetchLocationFailed = (state, { payload }) =>
  pipe(
    assocPath(['zip', 'fetching'], false),
    assocPath(['zip', 'message'], payload),
    assocPath(['zip', 'error'], true)
  )(state)

const fetchLocationSucceeded = (state, { payload }) =>
  pipe(
    assocPath(['zip', 'fetching'], false),
    assocPath(['zip', 'zip'], null),
    assocPath(['zip', 'success'], true)
  )(state)

const modifyZip = (state, { payload }) => assocPath(['zip', 'zip'], payload, state)

const resetZipAlert = state =>
  pipe(
    assocPath(['zip', 'error'], false),
    assocPath(['zip', 'success'], false)
  )(state)

const setAccodianIndex = (state, { payload }) => assocPath(['accordian', 'index'], payload, state)
const setHeaderOffset = (state, { payload }) => assocPath(['header', 'offset'], payload, state)
const setHeaderPosition = (state, { payload }) => assocPath(['header', 'position'], payload, state)
const setHeroLoading = (state, { payload }) => assocPath(['hero', 'loading'], payload, state)

const showZipAlert = (state, { payload }) =>
  pipe(
    assocPath(['zip', 'message'], payload.message),
    assocPath(['zip', payload.type], true)
  )(state)

const toggleCompareHelp = (state, { payload }) => assocPath(['compare', 'showHelp'], payload, state)
const toggleCompareTooltip = (state, { payload }) => assocPath(['compare', 'tooltip'], payload, state)

export default handleActions({
  [FETCH_LOCATION]: fetchLocation,
  [FETCH_LOCATION_FAILED]: fetchLocationFailed,
  [FETCH_LOCATION_SUCCEEDED]: fetchLocationSucceeded,
  [MODIFY_ZIP]: modifyZip,
  [RESET_ZIP_ALERT]: resetZipAlert,
  [SET_ACCORDIAN_INDEX]: setAccodianIndex,
  [SET_HEADER_OFFSET]: setHeaderOffset,
  [SET_HEADER_POSITION]: setHeaderPosition,
  [SET_HERO_LOADING]: setHeroLoading,
  [SHOW_ZIP_ALERT]: showZipAlert,
  [TOGGLE_COMPARE_HELP]: toggleCompareHelp,
  [TOGGLE_COMPARE_TOOLTIP]: toggleCompareTooltip,
}, initialState)

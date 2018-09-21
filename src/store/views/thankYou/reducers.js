import assocPath from 'ramda/src/assocPath'
import { handleActions } from 'redux-actions'

import { SET_HERO_LOADING } from './actions'

const initialState = {
  hero: {
    loading: true,
  },
}

const setHeroLoading = (state, { payload }) => assocPath(['hero', 'loading'], payload, state)

export default handleActions({
  [SET_HERO_LOADING]: setHeroLoading,
}, initialState)

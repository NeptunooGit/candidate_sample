import { all } from 'redux-saga/effects'

import formSagas from './views/form/sagas'
import homeSagas from './views/home/sagas'
import sharedSagas from './views/shared/sagas'

function* sagas() {
  yield all([
    ...formSagas,
    ...homeSagas,
    ...sharedSagas,
  ])
}

export default sagas

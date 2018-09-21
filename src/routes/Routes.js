import PropTypes from 'prop-types'
import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { stitch } from 'keo'

import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import FormLayout from '../layouts/FormLayout/FormLayout'
import FormView from './FormView/FormView'
import NoMatchView from './NoMatchView/NoMatchView'
import { trackViewEvent } from '../shared/utils/event'

const componentWillUpdate = ({ nextProps, props }) => {
  const { location: { pathname } } = nextProps

  if (nextProps.location !== props.location) {
    window.scrollTo(0, 0)
    trackViewEvent({ property: { page: pathname } })
  }
}

const coreWrapper = Component => () => (
  <CoreLayout>
    <Component />
  </CoreLayout>
)

const formWrapper = Component => () => (
  <FormLayout>
    <Component />
  </FormLayout>
)

const propTypes = {
  location: PropTypes.object,
}

const render = () => (
  <div>
    <Switch>
      <Route exact path="/" render={coreWrapper(FormView)} />
      <Route render={coreWrapper(NoMatchView)} />
    </Switch>
  </div>
)

const Routes = stitch({ componentWillUpdate, propTypes, render })

export default withRouter(Routes)

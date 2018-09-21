import evolve from 'ramda/src/evolve'
import F from 'ramda/src/F'
import merge from 'ramda/src/merge'
import pipe from 'ramda/src/pipe'
import tryCatch from 'ramda/src/tryCatch'
import values from 'ramda/src/values'

const stringify = tryCatch(JSON.stringify, F)

const trackEvent = opts => {
  const defaults = {
    event: 'trackStructEvent',
    category: '',
    action: '',
    label: '',
    property: '',
    value: '',
  }

  const transformations = {
    property: prop => stringify(prop) || prop,
  }

  const getArgs =
    pipe(
      merge(defaults),
      evolve(transformations),
      values
    )

  if (process.env.NODE_ENV === 'production') {
    window.snowplow(...getArgs(opts))
  }
}

export const trackErrorEvent = opts => {
  const defaults = {
    category: 'error',
    label: '',
    value: '1.0',
  }

  trackEvent(merge(defaults, opts))
}

export const trackFormEvent = opts => {
  const defaults = {
    category: 'form',
    label: '',
    value: '1.0',
  }

  trackEvent(merge(defaults, opts))
}

export const trackBoberdooEvent = opts => {
  const defaults = {
    action: 'post',
    category: 'boberdoo',
    label: '',
    value: '1.0',
  }

  trackEvent(merge(defaults, opts))
}

export const trackViewEvent = opts => {
  const defaults = {
    action: 'pageView',
    category: 'session',
    label: 'window',
    value: '1.0',
  }

  trackEvent(merge(defaults, opts))
}

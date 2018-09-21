import './FixedHeader.css'

import all from 'ramda/src/all'
import always from 'ramda/src/always'
import classNames from 'classnames'
import compose from 'ramda/src/compose'
import concat from 'ramda/src/concat'
import cond from 'ramda/src/cond'
import equals from 'ramda/src/equals'
import isNil from 'ramda/src/isNil'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { stitch } from 'keo'

import Alert from '../../../shared/components/Alert/Alert'
import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'
import { isEnterKey } from '../../../shared/utils/keyboard'
import { isNumber, toNumber } from '../../../shared/utils/dataType'
import Logo from '../../../shared/icons/Logo'
import Phone from '../../../shared/icons/Phone'
import { trackErrorEvent, trackFormEvent } from '../../../shared/utils/event'

const componentDidMount = ({ props }) => {
  window.addEventListener('scroll', props.onScroll)
  props.onScroll()
}

const componentDidUpdate = ({ prevProps, props }) => {
  window.removeEventListener('scroll', prevProps.onScroll)
  window.addEventListener('scroll', props.onScroll)
  props.onScroll()
}

const componentWillUnmount = ({ props }) => {
  window.removeEventListener('scroll', props.onScroll)
  props.resetAlert()
}

const onAlertRemove = props => () => props.resetAlert()
const onChange = props => ev => props.modifyZip(ev.target.value)
const onKeyDown = onClick => ev => isEnterKey(ev) && onClick()

const onSubmit = props => () => {
  const { fetchLocation, zip } = props
  const property = { progress: 0, form: { zip } }

  fetchLocation(zip)
  trackFormEvent({ action: 'start', property })
}

const onValidationError = props => () => {
  const { showAlert } = props
  const message = 'Please enter a valid zip code.'

  showAlert({ message, type: 'error' })
  trackErrorEvent({ action: 'validation_error', property: { message } })
}

const propTypes = {
  error: PropTypes.bool,
  fetching: PropTypes.bool,
  fetchLocation: PropTypes.func.isRequired,
  message: PropTypes.string,
  modifyZip: PropTypes.func.isRequired,
  offset: PropTypes.number,
  onScroll: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.string,
  resetAlert: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  success: PropTypes.bool,
  zip: PropTypes.string,
}

const render = ({ props }) => {
  const {
    error,
    fetching,
    message,
    offset,
    phone,
    position,
    success,
    zip,
  } = props

  if (success) {
    return <Redirect to="/form" />
  }

  const style = { top: offset }
  const ns = concat('fixed-header__')
  const isZipValid = validateZip(zip)
  const onClick = isZipValid ? onSubmit(props) : onValidationError(props)

  const classes = classNames('fixed-header', {
    'fixed-header--fixed': position === 'fixed',
    'fixed-header--fetching': fetching,
  })

  const headerProps = {
    className: classes,
    id: 'fixed-header',
    style: offset ? style : { opacity: 0 },
  }

  const buttonProps = {
    onClick,
    size: 'large',
    type: 'normal',
  }

  const phoneProps = {
    className: ns('phone'),
    href: `tel:${phone}`,
    target: '_blank',
  }

  const alertProps = {
    action: 'Dismiss',
    active: error,
    onRemove: onAlertRemove(props),
    timeout: 5000,
  }

  return (
    <div>
      <div {...headerProps}>
        <Link className={ns('logo')} to="/">
          <Logo />
        </Link>
        <div className={ns('form')}>
          <div className={ns('form-input')}>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              name="zip"
              onChange={onChange(props)}
              onKeyDown={onKeyDown(onClick)}
              placeholder="Enter Zip Code"
              spellCheck="false"
              type="text"
              value={zip || ''}
            />
          </div>
          <div className={ns('form-submit')}>
            <div className={ns('loader')}>
              <div />
            </div>
            <Button {...buttonProps}>
              Get Started <Arrow />
            </Button>
          </div>
        </div>
        <a {...phoneProps}>
          <Phone /><span>{phone}</span>
        </a>
      </div>
      <Alert {...alertProps}>
        {message}
      </Alert>
    </div>
  )
}

const validateZip = zip => {
  const isNum = compose(isNumber, toNumber)
  const isAllNum = all(isNum)
  const wrongLength = num => !equals(5, num.toString().length)

  const valid =
    cond([
      [isNil, always(false)],
      [wrongLength, always(false)],
      [isAllNum, always(true)],
    ])

  return valid(zip)
}

export default stitch({
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
  propTypes,
  render,
})

import './EmailSection.css'

import classNames from 'classnames'
import concat from 'ramda/src/concat'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'
import validator from 'email-validator'

import Alert from '../../../shared/components/Alert/Alert'
import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'
import { isEnterOrSpaceBarKey } from '../../../shared/utils/keyboard'

const onAlertRemove = props => () => props.resetAlert()
const onChange = props => ev => props.modifyEmail(ev.target.value)
const onKeyDown = onClick => ev => isEnterOrSpaceBarKey(ev) && onClick()
const onSubmit = props => () => props.saveEmail(props.email)
const onValidationError = props => () => props.showAlert({ message: 'Please enter a valid email address.', type: 'error' })

const propTypes = {
  email: PropTypes.string,
  error: PropTypes.bool,
  fetching: PropTypes.bool,
  message: PropTypes.string,
  modifyEmail: PropTypes.func.isRequired,
  resetAlert: PropTypes.func.isRequired,
  saveEmail: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  success: PropTypes.bool,
}

const render = ({ props }) => {
  const {
    email,
    error,
    message,
    fetching,
    success,
  } = props

  const ns = concat('email-section__')
  const isEmailValid = validator.validate(email)
  const onClick = isEmailValid ? onSubmit(props) : onValidationError(props)

  const classes = classNames('email-section', {
    'email-section--fetching': fetching,
  })

  const buttonProps = {
    onClick,
    size: 'large',
    type: 'normal',
  }

  const alertProps = {
    action: 'Dismiss',
    active: success || error,
    onRemove: onAlertRemove(props),
    success,
    timeout: 5000,
  }

  return (
    <div className={classes}>
      <div className={ns('inner')}>
        <h2>Want to learn more?</h2>
        <h4>Enter your email address and receive a free Medicare and Medicare Supplement Insurance Guide.</h4>
        <div className={ns('form')}>
          <div className={ns('form-submit')}>
            <div className={ns('loader')}>
              <div />
            </div>
            <Button {...buttonProps}>
              Sign Up <Arrow />
            </Button>
          </div>
          <div className={ns('form-input')}>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              name="email"
              onChange={onChange(props)}
              onKeyDown={onKeyDown(onClick)}
              placeholder="Email Address"
              spellCheck="false"
              type="text"
              value={email || ''} />
          </div>
        </div>
        <div className={ns('note')}>
          By clicking “Sign Up” you are agreeing to receive emails from Online-Medicare-Plans.com
        </div>
      </div>
      <Alert {...alertProps}>
        {message}
      </Alert>
    </div>
  )
}

export default stitch({ propTypes, render })

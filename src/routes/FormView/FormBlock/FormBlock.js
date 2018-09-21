import './FormBlock.css'

import always from 'ramda/src/always'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import Alert from '../../../shared/components/Alert/Alert'
import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'

const onTransitionEntered = ({ id, scrollTo }) => () => scrollTo(id)

const propTypes = {
  active: PropTypes.bool,
  after: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.bool,
  fetching: PropTypes.bool,
  headline: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  message: PropTypes.string,
  onNext: PropTypes.func,
  phone: PropTypes.string,
  resetAlert: PropTypes.func,
  scrollTo: PropTypes.func.isRequired,
  subheadline: PropTypes.string.isRequired,
  valid: PropTypes.bool,
}

const render = ({ props }) => {
  const {
    active,
    after,
    children,
    error,
    fetching,
    headline,
    id,
    isLast,
    message,
    phone,
    onNext,
    resetAlert,
    subheadline,
    valid,
  } = props

  const transitionProps = {
    classNames: 'form-block-',
    in: active,
    onEntered: onTransitionEntered(props),
    timeout: 300,
    unmountOnExit: true,
  }

  const fieldClasses = classNames('form-block__field', {
    'form-block__field--error': after && !valid,
  })

  const buttonClasses = classNames('form-block__button', {
    'form-block__button--disabled': !valid,
    'form-block__button--fetching': fetching,
  })

  const disclaimerClasses = classNames('form-block__disclaimer', {
    'form-block__disclaimer--active': valid,
  })

  const buttonProps = {
    className: buttonClasses,
    onClick: valid ? onNext : always(),
    size: 'medium',
    type: 'ghost',
  }

  const alertProps = {
    action: 'Dismiss',
    active: error || false,
    onRemove: resetAlert || always(),
    timeout: 5000,
  }

  const nextButton =
    <Button {...buttonProps}>
      <div className="form-block__button__loader">
        <div />
      </div>
      {isLast ? <span>Submit <Arrow /></span> : 'Next'}
    </Button>

  const disclaimer =
    <div className={disclaimerClasses}>
      By pressing "Submit" above, I consent to receive e-mails, telephone calls, text messages and artificial or pre-recorded messages from TZ Insurance Solutions LLC or its affiliates and third party partners, or their service provider partners on their behalf, regarding their products and services, including Medicare Advantage plans, MA-PD plans, Medicare Part D plans or Medicare supplement insurance plans, at the e-mail address and telephone number provided above, including my wireless number, if provided, utilizing an automated telephone dialing system. I understand that I am not required to grant this consent as a condition of purchasing any property, goods or services from the foregoing companies and that I instead may call {phone} and I agree to this website’s Privacy Policy and Terms of Use.
    </div>

  return (
    <div>
      <CSSTransition {...transitionProps}>
        <div className="form-block" id={`form-block--${id}`}>
          <h4>{subheadline}</h4>
          <h3>{headline}</h3>
          <div className={fieldClasses}>
            {children}
          </div>
          {onNext && !after && nextButton}
          {isLast && disclaimer}
        </div>
      </CSSTransition>
      <Alert {...alertProps}>
        {message}
      </Alert>
    </div>
  )
}

export default stitch({ propTypes, render })

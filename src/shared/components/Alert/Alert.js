import './Alert.css'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import CloseIcon from '../../icons/Plus'

let timeoutRef

const onTransitionEnter = props => () => {
  const { onRemove, timeout = -1 } = props

  if (timeout > 0) {
    timeoutRef = setTimeout(onRemove, timeout)
  }
}

const onTransitionExit = () => clearTimeout(timeoutRef)

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onRemove: PropTypes.func.isRequired,
  success: PropTypes.bool,
  timeout: PropTypes.number,
}

const render = ({ props }) => {
  const {
    active,
    children,
    onRemove,
    success,
  } = props

  const transitionProps = {
    classNames: 'alert-',
    in: active,
    onEnter: onTransitionEnter(props),
    onExit: onTransitionExit,
    timeout: 300,
    unmountOnExit: true,
  }

  const classes = classNames('alert', {
    'alert--success': success,
  })

  return (
    <CSSTransition {...transitionProps}>
      <div className={classes}>
        <div className="alert__text">
          {children}
        </div>
        <div className="alert__close" onClick={onRemove}>
          <CloseIcon />
        </div>
      </div>
    </CSSTransition>
  )
}

export default stitch({ propTypes, render })

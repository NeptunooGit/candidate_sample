import './Dialog.css'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import CloseIcon from '../../icons/Plus'

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const {
    active,
    children,
    className,
    onRemove,
  } = props

  const classes = classNames('dialog', {
    [className]: !isEmpty(className) && !isNil(className),
  })

  const transitionProps = {
    classNames: 'dialog-',
    in: active,
    timeout: 300,
    unmountOnExit: true,
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className={classes}>
        <div className="dialog__inner">
          <div className="dialog__close" onClick={onRemove}>
            <CloseIcon />
          </div>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}

export default stitch({ propTypes, render })

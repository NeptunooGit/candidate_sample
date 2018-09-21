import './Tooltip.css'

import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

const propTypes = {
  active: PropTypes.bool.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  text: PropTypes.string,
  width: PropTypes.number,
}

const render = ({ props }) => {
  const {
    active,
    className,
    position,
    text,
    width,
  } = props

  const classes = classNames('tooltip', {
    [className]: !isEmpty(className) && !isNil(className),
    [`tooltip--${position}`]: true,
  })

  const style = width && { width: `${width}px` }

  const transitionProps = {
    classNames: 'tooltip-',
    in: active,
    timeout: 300,
    unmountOnExit: true,
  }

  return (
    <CSSTransition {...transitionProps}>
      <div className={classes} style={style}>
        <div className="tooltip__text">
          {text}
        </div>
      </div>
    </CSSTransition>
  )
}

export default stitch({ propTypes, render })

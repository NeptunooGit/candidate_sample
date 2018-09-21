import './Button.css'

import always from 'ramda/src/always'
import classNames from 'classnames'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

const propTypes = {
  actualHref: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  type: PropTypes.oneOf([ 'normal', 'ghost' ]),
}

const render = ({ props }) => {
  const {
    actualHref,
    children,
    className,
    href = '',
    onClick = always(),
    size = 'medium',
    type = 'normal',
  } = props

  const classes = classNames('button', {
    [className]: !isEmpty(className) && !isNil(className),
    [`button--${size}`]: true,
    [`button--${type}`]: true,
  })

  const button =
    <button className={classes} onClick={onClick}>
      {children}
    </button>

  const link =
    <Link className={classes} to={href} onClick={onClick}>
      {children}
    </Link>

  const actualLink =
    <a className={classes} href={actualHref}>
      {children}
    </a>

  return isEmpty(href) ? button : (actualHref ? actualLink : link)
}

export default stitch({ propTypes, render })

import './SubHeader.css'

import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

const propTypes = {
  active: PropTypes.string.isRequired,
}

const render = ({ props }) => {
  const { active } = props

  const policyClasses = classNames('subheader__link', {
    'subheader__link--active': active === 'privacy-policy',
  })

  const termsClasses = classNames('subheader__link', {
    'subheader__link--active': active === 'terms-of-use',
  })

  const carriersClasses = classNames('subheader__link', {
    'subheader__link--active': active === 'carriers',
  })

  const thirdPartyClasses = classNames('subheader__link', {
    'subheader__link--active': active === 'third-party-partners',
  })

  return (
    <div className="subheader">
      <ul className="subheader__inner">
        <li className={policyClasses}>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li className={termsClasses}>
          <Link to="/terms-of-use">Terms of Use</Link>
        </li>
        <li className={carriersClasses}>
          <Link to="/carriers">Carriers</Link>
        </li>
        <li className={thirdPartyClasses}>
          <Link to="/third-party-partners">Third Party Partners</Link>
        </li>
      </ul>
    </div>
  )
}

export default stitch({ propTypes, render })

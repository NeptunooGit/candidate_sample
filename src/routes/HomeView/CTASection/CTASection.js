import './CTASection.css'

import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'

const propTypes = {
  phone: PropTypes.string.isRequired,
}

const render = ({ props }) => {
  const { phone } = props

  const buttonProps = {
    className: 'cta__button',
    href: '/form',
    size: 'medium',
    type: 'ghost',
  }

  const phoneProps = {
    className: 'cta__button--phone',
    href: `tel:${phone}`,
    target: '_blank',
  }

  const ctaLeft =
    <div className="cta">
      <div className="cta__inner">
        <div className="cta__text">
          <h3>Tell Us More About Yourself</h3>
          <p>Talk to a licensed insurance agent who can provide quotes for multiple Medicare Supplement plans.</p>
          <Button {...buttonProps}>
            Get Started <Arrow />
          </Button>
        </div>
      </div>
    </div>

  const ctaRight =
    <div className="cta">
      <div className="cta__inner">
        <div className="cta__text">
          <h3>Or Give Us A Call Instead</h3>
          <p>Our licensed insurance agents are always available to help you find the best solution.</p>
          <a {...phoneProps}>
            {phone}
          </a>
        </div>
      </div>
    </div>

  return (
    <div className="cta-section">
      {ctaLeft}
      {ctaRight}
    </div>
  )
}

export default stitch({ propTypes, render })

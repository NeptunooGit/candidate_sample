import './ThankYouView.css'

import classNames from 'classnames'
import concat from 'ramda/src/concat'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import AetnaLogo from '../../shared/icons/AetnaLogo'
import CignaLogo from '../../shared/icons/CignaLogo'
import { formatPhoneDefault } from '../../shared/utils/phone'
import HeroBlurImage from './assets/thank-you-blur-hero.jpg'
import HeroImage from './assets/thank-you-hero.jpg'
import MassMutualLogo from '../../shared/icons/MassMutualLogo'
import MutualOfOmahaLogo from '../../shared/icons/MutualOfOmahaLogo'
import * as thankYouActions from '../../store/views/thankYou/actions'

const componentDidMount = ({ props }) => props.setHeroLoading(true)
const onImageLoad = props => () => props.setHeroLoading(false)

const propTypes = {
  heroLoading: PropTypes.bool,
  phoneNumber: PropTypes.string.isRequired,
}

const render = ({ props }) => {
  const { heroLoading, phoneNumber } = props
  const ns = concat('thank-you-view__')
  const phone = formatPhoneDefault(phoneNumber)
  const imageAlt = 'Insurance agents helping people'
  const heroStyle = { backgroundImage: `url(${HeroBlurImage})` }

  const imageClasses = classNames(ns('hero__bg__image'), {
    [ns('hero__bg__image--loaded')]: !heroLoading,
  })

  const imageProps = {
    className: imageClasses,
    style: { backgroundImage: `url(${HeroImage})` },
  }

  return (
    <div className="thank-you-view">
      <div className={ns('hero')}>
        <div className={ns('hero__bg')} style={heroStyle}>
          <div {...imageProps} />
        </div>
        <img alt={imageAlt} src={HeroImage} onLoad={onImageLoad(props)} />
        <div className={ns('hero__text')}>
          <div className={ns('hero__text__inner')}>
            <h1>Thank you for requesting a free Medicare Supplement Insurance quote!</h1>
            <p>One of our licensed insurance agents will call you shortly. Or, give us a call at <a href={`tel:${phone}`} target="_blank">{phone}</a> to speak with an agent now.</p>
          </div>
        </div>
      </div>
      <div className={ns('icons-wrapper')}>
        <div className={ns('icons')}>
          <div className={ns('icon-row')}>
            <div className={`${ns('icon')} ${ns('icon--aetna')}`}>
              <AetnaLogo />
            </div>
            <div className={`${ns('icon')} ${ns('icon--moo')}`}>
              <MutualOfOmahaLogo />
            </div>
          </div>
          <div className={ns('icon-row')}>
            <div className={`${ns('icon')} ${ns('icon--cigna')}`}>
              <CignaLogo />
            </div>
            <div className={`${ns('icon')} ${ns('icon--mm')}`}>
              <MassMutualLogo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ThankYouView = stitch({ componentDidMount, propTypes, render })

// Redux
const mapStateToProps = state => ({
  heroLoading: state.views.thankYou.hero.loading,
  phoneNumber: state.data.general.phoneNumber,
})

const mapDispatchToProps = {
  ...thankYouActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouView)

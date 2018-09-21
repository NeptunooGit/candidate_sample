import './Hero.css'

import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import HeroBlurImage from './assets/hero-blur.jpg'
import HeroImage from './assets/hero.jpg'

const componentDidMount = ({ props }) => {
  window.addEventListener('resize', props.onResize)
  props.setHeroLoading(true)
  setTimeout(props.onResize, 0)
}

const componentDidUpdate = ({ prevProps, props }) => {
  window.removeEventListener('resize', prevProps.onResize)
  window.addEventListener('resize', props.onResize)
}

const componentWillUnmount = ({ props }) => {
  window.removeEventListener('resize', props.onResize)
}

const onImageLoad = props => () => props.setHeroLoading(false)

const propTypes = {
  loading: PropTypes.bool,
  onResize: PropTypes.func.isRequired,
  setHeaderOffset: PropTypes.func.isRequired,
  setHeroLoading: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const { loading } = props
  const style = { backgroundImage: `url(${HeroBlurImage})` }
  const imageAlt = 'Senior couple discussing Medicare Supplement insurance.'

  const imageClasses = classNames('hero__image', {
    'hero__image--loaded': !loading,
  })

  const imageProps = {
    className: imageClasses,
    style: { backgroundImage: `url(${HeroImage})` },
  }

  return (
    <div className="hero" id="hero" style={style}>
      <div {...imageProps} />
      <img alt={imageAlt} src={HeroImage} onLoad={onImageLoad(props)} />
      <div className="hero__inner">
        <div className="hero__text">
          <h1>Compare 2018 Medicare Supplement Insurance Plans</h1>
          <p>Enter your zip code for prices and plans near you. Find out how much you can save.</p>
        </div>
      </div>
    </div>
  )
}

export default stitch({
  componentDidMount,
  componentDidUpdate,
  componentWillUnmount,
  propTypes,
  render,
})

import always from 'ramda/src/always'
import cond from 'ramda/src/cond'
import { connect } from 'react-redux'
import propEq from 'ramda/src/propEq'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'
import T from 'ramda/src/T'

import CompareSection from './CompareSection/CompareSection'
import CTASection from './CTASection/CTASection'
import FaqSection from './FaqSection/FaqSection'
import FixedHeader from './FixedHeader/FixedHeader'
import { formatPhoneDefault } from '../../shared/utils/phone'
import Hero from './Hero/Hero'
import * as homeViewActions from '../../store/views/home/actions'
import ValueSection from './ValueSection/ValueSection'

const onCompareScroll = props => () => {
  const { showCompareHelp, toggleCompareHelp } = props
  const table = document.getElementById('compare-section__table')
  const { top } = table.getBoundingClientRect()

  if (top < 200 && !showCompareHelp) {
    toggleCompareHelp(true)
  }
}

const onHeaderScroll = props => () => {
  const {
    browser,
    headerOffset,
    headerPosition,
    setHeaderPosition,
  } = props

  const height =
    cond([
      [propEq('large', true), always(60)],
      [propEq('small', true), always(55)],
      [propEq('extraSmall', true), always(50)],
      [T, always(40)],
    ])(browser.greaterThan)

  const top = window.pageYOffset
  const offset = headerOffset ? headerOffset - height : null

  if (!offset) {
    return
  }

  if (top >= offset && headerPosition !== 'fixed') {
    setHeaderPosition('fixed')
  } else if (top < offset && headerPosition === 'fixed') {
    setHeaderPosition(null)
  }
}

const onHeroResize = props => () => {
  const { setHeaderOffset } = props
  const height = document.getElementById('hero').offsetHeight

  setHeaderOffset(height)
}

const propTypes = {
  accordianIndex: PropTypes.number,
  browser: PropTypes.object,
  compareTooltip: PropTypes.string,
  fetchLocation: PropTypes.func.isRequired,
  headerOffset: PropTypes.number,
  headerPosition: PropTypes.string,
  heroLoading: PropTypes.bool,
  modifyZip: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  resetZipAlert: PropTypes.func.isRequired,
  setAccordianIndex: PropTypes.func.isRequired,
  setHeaderOffset: PropTypes.func.isRequired,
  setHeaderPosition: PropTypes.func.isRequired,
  setHeroLoading: PropTypes.func.isRequired,
  showCompareHelp: PropTypes.any.isRequired,
  showZipAlert: PropTypes.func.isRequired,
  toggleCompareHelp: PropTypes.func.isRequired,
  toggleCompareTooltip: PropTypes.func.isRequired,
  zip: PropTypes.object.isRequired,
}

const render = ({ props }) => {
  const {
    accordianIndex,
    browser,
    compareTooltip,
    fetchLocation,
    headerOffset,
    headerPosition,
    heroLoading,
    modifyZip,
    phoneNumber,
    resetZipAlert,
    setAccordianIndex,
    setHeaderOffset,
    setHeroLoading,
    showCompareHelp,
    showZipAlert,
    toggleCompareHelp,
    toggleCompareTooltip,
    zip,
  } = props

  const headerProps = {
    fetchLocation,
    modifyZip,
    offset: headerOffset,
    onScroll: onHeaderScroll(props),
    phone: formatPhoneDefault(phoneNumber),
    position: headerPosition,
    resetAlert: resetZipAlert,
    showAlert: showZipAlert,
    ...zip,
  }

  const heroProps = {
    loading: heroLoading,
    onResize: onHeroResize(props),
    setHeaderOffset,
    setHeroLoading,
  }

  const faqProps = {
    accordianIndex,
    browser,
    phone: formatPhoneDefault(phoneNumber),
    setAccordianIndex,
  }

  const compareProps = {
    browser,
    onScroll: onCompareScroll(props),
    showHelp: showCompareHelp,
    toggleHelp: toggleCompareHelp,
    toggleTooltip: toggleCompareTooltip,
    tooltip: compareTooltip,
  }

  return (
    <div className="home-view">
      <FixedHeader {...headerProps} />
      <Hero {...heroProps} />
      <ValueSection />
      <FaqSection {...faqProps} />
      <CompareSection {...compareProps} />
      <CTASection phone={formatPhoneDefault(phoneNumber)} />
    </div>
  )
}

export const HomeView = stitch({ propTypes, render })

// Redux
const mapStateToProps = state => ({
  accordianIndex: state.views.home.accordian.index,
  browser: state.browser,
  compareTooltip: state.views.home.compare.tooltip,
  headerOffset: state.views.home.header.offset,
  headerPosition: state.views.home.header.position,
  heroLoading: state.views.home.hero.loading,
  phoneNumber: state.data.general.phoneNumber,
  showCompareHelp: state.views.home.compare.showHelp,
  zip: state.views.home.zip,
})

const mapDispatchToProps = {
  ...homeViewActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

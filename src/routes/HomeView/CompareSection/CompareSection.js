import './CompareSection.css'

import always from 'ramda/src/always'
import classNames from 'classnames'
import concat from 'ramda/src/concat'
import cond from 'ramda/src/cond'
import equals from 'ramda/src/equals'
import identity from 'ramda/src/identity'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'
import T from 'ramda/src/T'
import values from 'ramda/src/values'

import Arrow from '../../../shared/icons/Arrow'
import Correct from '../../../shared/icons/Correct'
import Tooltip from '../../../shared/components/Tooltip/Tooltip'
import Wrong from '../../../shared/icons/Wrong'

const benefits = {
  'Part A Coinsurance': 'Part A coinsurance and hospital costs up to an additional 365 days after Medicare benefits are used up',
  'Part B Coinsurance': 'Part B coinsurance or copayment',
  'Blood': 'Blood (first 3 pints)',
  'Part A Hospice Care': 'Part A hospice care coinsurance or copayment',
  'Skilled Nursing': 'Skilled nursing facility care coinsurance',
  'Part A Deductible': null,
  'Part B Deductible': null,
  'Part B Excess Charge': null,
  'Foreign Travel': 'Foreign travel exchange (up to plan limits)',
  'Out-of-pocket limit**': null,
}

const componentDidMount = ({ props }) => {
  window.addEventListener('scroll', props.onScroll)
  props.onScroll()
}

const componentDidUpdate = ({ prevProps, props }) => {
  window.removeEventListener('scroll', prevProps.onScroll)
  window.addEventListener('scroll', props.onScroll)
  props.onScroll()
}

const componentWillUnmount = ({ props }) => {
  window.removeEventListener('scroll', props.onScroll)
}

const onCellEnter = (props, key) => () => props.toggleTooltip(key)
const onCellLeave = props => () => props.toggleTooltip(null)

const onColumnScroll = props => ev => {
  const { showHelp, toggleHelp } = props
  const target = ev.currentTarget
  const width = target.offsetWidth
  const scroll = target.scrollLeft
  const totalWidth = target.scrollWidth
  const ns = concat('compare-section__table--')
  const table = document.getElementById('compare-section__table')

  if (width + scroll <= totalWidth - 5 && width < totalWidth) {
    table.classList.add(ns('overflow'))
  } else {
    table.classList.remove(ns('overflow'))
  }

  if (showHelp === true) {
    toggleHelp('shown')
  }
}

const propTypes = {
  browser: PropTypes.object.isRequired,
  onScroll: PropTypes.func.isRequired,
  showHelp: PropTypes.any.isRequired,
  toggleHelp: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
}

const render = ({ props }) => {
  const { showHelp } = props
  const ns = concat('compare-section__')
  const table = document.getElementById(ns('table-column-wrapper'))
  const hasOverflow = table ? table.offsetWidth + 5 < table.scrollWidth : false

  const tableClasses = classNames(ns('table'), {
    'compare-section__table--show-help': showHelp === true,
    'compare-section__table--overflow': hasOverflow,
  })

  const tableWrapperProps = {
    className: ns('table-column-wrapper'),
    id: ns('table-column-wrapper'),
    onScroll: onColumnScroll(props),
  }

  return (
    <div className="compare-section">
      <div className={ns('inner')}>
        <h2>What do Medigap plans cover?</h2>
        <h4>Each plan type offers a standard set of basic benefits. A licensed insurance agent can help you pick one.</h4>
        <div className={tableClasses} id={ns('table')}>
          <div className={ns('table-column-left')}>
            <div className={ns('table-cell--head')}>
              Plan Type <Arrow />
            </div>
            {values(mapObjIndexed(renderLabelCell(props), benefits))}
          </div>
          <div {...tableWrapperProps}>
            <div className={ns('table-column-wrapper-inner')}>
              {values(mapObjIndexed(renderColumn, plans))}
            </div>
          </div>
          <div className={ns('table-help')}>
            Scroll right to view more plans
          </div>
        </div>
        <span className={ns('note')}>
          Hover over benefit for details
        </span>
      </div>
    </div>
  )
}

const plans = {
  a: [true, true, true, true, false, false, false, false, false, 'N/A'],
  b: [true, true, true, true, false, true, false, false, false, 'N/A'],
  c: [true, true, true, true, true, true, true, false, '80%', 'N/A'],
  d: [true, true, true, true, true, true, false, false, '80%', 'N/A'],
  'f*': [true, true, true, true, true, true, true, true, '80%', 'N/A'],
  g: [true, true, true, true, true, true, false, true, '80%', 'N/A'],
  k: [true, '50%', '50%', '50%', '50%', '50%', false, false, false, '$5,240'],
  l: [true, '75%', '75%', '75%', '75%', '75%', false, false, false, '$2,620'],
  m: [true, true, true, true, true, '50%', false, false, '80%', 'N/A'],
  n: [true, true, true, true, true, true, false, false, '80%', 'N/A'],
}

const renderCell = (value, index) => {
  const ns = concat('compare-section__')

  const classes = classNames(ns('table-cell'), {
    [`${ns('table-cell')}--correct`]: value,
    [`${ns('table-cell')}--wrong`]: !value,
  })

  const renderValue =
    cond([
      [equals(true), always(<Correct />)],
      [equals(false), always(<Wrong />)],
      [T, identity],
    ])

  return (
    <div className={classes} key={index}>
      {renderValue(value)}
    </div>
  )
}

const renderColumn = (coverages, plan) => {
  const ns = concat('compare-section__')

  return (
    <div className={ns('table-column')} key={plan}>
      <div className={ns('table-cell--head')}>
        {plan}
      </div>
      {coverages.map(renderCell)}
    </div>
  )
}

const renderLabelCell = props => (value, key) => {
  const { browser, tooltip } = props
  const ns = concat('compare-section__')
  const position = browser.greaterThan.extraLarge ? 'left' : 'top'

  const cellProps = {
    className: ns('table-cell'),
    key,
    onMouseEnter: onCellEnter(props, key),
    onMouseLeave: onCellLeave(props),
    onTouchEnd: onCellLeave(props),
    onTouchStart: onCellEnter(props, key),
  }

  const tooltipProps = {
    active: tooltip === key,
    className: ns('table-cell__tooltip'),
    position,
    text: value,
    width: 170,
  }

  return (
    <div {...cellProps}>
      {value && <Tooltip {...tooltipProps} />}
      {key}
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

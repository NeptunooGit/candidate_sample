import './Sidebar.css'

import concat from 'ramda/src/concat'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

const propTypes = {
  fields: PropTypes.array,
}

const render = ({ props }) => {
  const { fields } = props
  const ns = concat('form-sidebar__')
  const hasFields = !isEmpty(fields) & !isNil(fields)

  const emptyMessage =
    <div className={ns('start-message')}>
      Please fill out the form to get started
    </div>

  return (
    <div className="form-sidebar">
      <div className={ns('inner')}>
        {hasFields ? fields.map(renderField(ns)) : emptyMessage}
      </div>
    </div>
  )
}

const renderField = ns => ({ key, value }, index) => (
  <div className={ns('field')} key={index}>
    <span>{key}</span>
    <p>{value}</p>
  </div>
)

export default stitch({ propTypes, render })

import pipe from 'ramda/src/pipe'
import propEq from 'ramda/src/propEq'
import PropTypes from 'prop-types'
import React from 'react'
import reject from 'ramda/src/reject'
import { stitch } from 'keo'

import * as formActions from '../../store/data/form/actions'
import { formatPhoneDefault } from '../../shared/utils/phone'
import * as formViewActions from '../../store/views/form/actions'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import withRouter from '../../shared/utils/withRouter'

const formatFields = fields => {
  const {
    address,
    birthDay,
    birthMonth,
    birthYear,
    city,
    email,
    firstName,
    gender,
    lastName,
    phone,
    state,
  } = fields

  const hasLocation = city && state
  const hasName = firstName && lastName
  const hasBirthdate = birthDay && birthMonth && birthYear

  return [
    {
      key: 'City and State',
      value: hasLocation ? `${city}, ${state}` : null,
    },
    {
      key: 'Name',
      value: hasName ? `${firstName} ${lastName}` : null,
    },
    {
      key: 'Gender',
      value: gender,
    },
    {
      key: 'Birthdate',
      value: hasBirthdate ? `${birthMonth} / ${birthDay} / ${birthYear}` : null,
    },
    {
      key: 'Email',
      value: email,
    },
    {
      key: 'Address',
      value: address,
    },
    {
      key: 'Phone',
      value: phone,
    },
  ]
}

const propTypes = {
  browser: PropTypes.object.isRequired,
  children: PropTypes.node,
  form: PropTypes.object.isRequired,
  history: PropTypes.object,
  isDialogActive: PropTypes.bool.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  resetForm: PropTypes.func.isRequired,
  resetViewForm: PropTypes.func.isRequired,
  toggleResetDialog: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const {
    browser,
    children,
    form,
    history,
    isDialogActive,
    phoneNumber,
    progress,
    resetForm,
    resetViewForm,
    toggleResetDialog,
  } = props

  const headerProps = {
    isDialogActive,
    phone: formatPhoneDefault(phoneNumber),
    progress,
    resetForm,
    resetViewForm,
    showLogo: history.action === 'POP',
    toggleDialog: toggleResetDialog,
  }

  const fields =
    pipe(
      formatFields,
      reject(propEq('value', null)),
    )(form)

  return (
    <div>
      <Header {...headerProps} />
      {browser.greaterThan.large && <Sidebar fields={fields} />}
      <div className="main">
        {children}
      </div>
    </div>
  )
}

export const FormLayout = stitch({ propTypes, render })

// Redux
const mapStateToProps = state => ({
  browser: state.browser,
  form: state.data.form,
  isDialogActive: state.views.form.resetDialog,
  phoneNumber: state.data.general.phoneNumber,
  progress: state.views.form.progress,
})

const mapDispatchToProps = {
  ...formActions,
  ...formViewActions,
}

export default withRouter(mapStateToProps, mapDispatchToProps, FormLayout)

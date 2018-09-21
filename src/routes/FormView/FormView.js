import './FormView.css'

import all from 'ramda/src/all'
import always from 'ramda/src/always'
import assoc from 'ramda/src/assoc'
import both from  'ramda/src/both'
import classNames from 'classnames'
import compose from 'ramda/src/compose'
import concat from 'ramda/src/concat'
import cond from 'ramda/src/cond'
import emailValidator from 'email-validator'
import equals from 'ramda/src/equals'
import evolve from 'ramda/src/evolve'
import filter from 'ramda/src/filter'
import find from 'ramda/src/find'
import head from 'ramda/src/head'
import inc from 'ramda/src/inc'
import isEmpty from 'ramda/src/isEmpty'
import isNil from 'ramda/src/isNil'
import keys from 'ramda/src/keys'
import map from 'ramda/src/map'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import merge from 'ramda/src/merge'
import mergeWith from 'ramda/src/mergeWith'
import not from 'ramda/src/not'
import propEq from 'ramda/src/propEq'
import propOr from 'ramda/src/propOr'
import PropTypes from 'prop-types'
import range from 'ramda/src/range'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { stitch } from 'keo'
import toLower from 'ramda/src/toLower'
import values from 'ramda/src/values'
import Velocity from 'velocity-animate'

import Button from '../../shared/components/Button/Button'
import Dialog from '../../shared/components/Dialog/Dialog'
import * as formActions from '../../store/data/form/actions'
import { formatPhoneDefault } from '../../shared/utils/phone'
import FormBlock from './FormBlock/FormBlock'
import * as formViewActions from '../../store/views/form/actions'
import { isEnterOrSpaceBarKey, isEnterKey } from '../../shared/utils/keyboard'
import { isNumber, toNumber } from '../../shared/utils/dataType'
import { tabIndex } from '../../shared/utils/tabNavigation'
import { toTitleCase } from '../../shared/utils/text'
import { trackFormEvent } from '../../shared/utils/event'
import withRouter from '../../shared/utils/withRouter'

export const PROGRESS_INCREMENT = 100 / 9

const componentDidMount = ({ props }) => {
  const { modifyForm, location, toggleCallDialog } = props
  const form = merge(props.viewForm, props.form)

  modifyForm(form)

  if (location.pathname === '/form-b') {
    toggleCallDialog(true)
  }
}

const componentWillUnmount = ({ props }) => {
  props.resetAlert()
  props.resetForm()
  props.resetViewForm()
}

const months = {
  january: {
    days: 31,
    value: 1,
  },
  february: {
    days: 28,
    value: 2,
  },
  march: {
    days: 31,
    value: 3,
  },
  april: {
    days: 30,
    value: 4,
  },
  may: {
    days: 31,
    value: 5,
  },
  june: {
    days: 30,
    value: 6,
  },
  july: {
    days: 31,
    value: 7,
  },
  august: {
    days: 31,
    value: 8,
  },
  september: {
    days: 30,
    value: 9,
  },
  october: {
    days: 31,
    value: 10,
  },
  november: {
    days: 30,
    value: 11,
  },
  december: {
    days: 31,
    value: 12,
  },
}

const onBlockChange = (props, field) => ev => {
  const { viewForm, modifyViewForm } = props
  const { value } = ev.target
  const modifyForm = compose(modifyViewForm, assoc(field, value))

  modifyForm(viewForm)
}

const onBlockClick = (props, field, value, index) => () => {
  const { viewForm, setProgress } = props
  const modifyForm = compose(props.modifyForm, assoc(field, value))
  const modifyViewForm = compose(props.modifyViewForm, assoc(field, value))
  const progress = PROGRESS_INCREMENT * (index + 1)
  const property = { progress, form: viewForm }

  modifyForm(viewForm)
  modifyViewForm(viewForm)
  setProgress(progress)
  trackFormEvent({ action: 'block_click', property })
}

const onBlockEnter = (props, isValid, index) => ev => {
  const onClick = onNextClick(props, index)
  const isEnter = isEnterKey(ev)

  if (isEnter && isValid) {
    onClick()
  }
}

const onCallDialogRemove = props => () => props.toggleCallDialog(false)
const onKeyDown = onClick => ev => isEnterOrSpaceBarKey(ev) && onClick()

const onNextClick = (props, index) => () => {
  const { modifyForm, modifyViewForm, setProgress } = props
  const takeValue = (prev, next) => next || prev
  const form = mergeWith(takeValue, props.form, props.viewForm)
  const progress = PROGRESS_INCREMENT * (index + 1)
  const property = { progress, form }

  modifyForm(form)
  modifyViewForm(form)
  setProgress(progress)
  trackFormEvent({ action: 'next_click', property })
}

const onSubmitClick = props => () => {
  const {
    modifyForm,
    modifyViewForm,
    setProgress,
    showAlert,
    submitForm,
    viewForm,
  } = props

  const transformations = {
    address: validate,
    birthDay: always(true),
    birthMonth: always(true),
    birthYear: year => validateDigits(year, 4),
    city: validate,
    email: emailValidator.validate,
    firstName: validate,
    gender: always(true),
    lastName: validate,
    phone: phone => validateDigits(phone, 10),
    state: validate,
    zip: zip => validateDigits(zip, 5),
  }

  const valid = compose(all(equals(true)), values, evolve(transformations))
  const takeValue = (prev, next) => next || prev
  const form = mergeWith(takeValue, props.form, viewForm)

  if (valid(viewForm)) {
    modifyForm(form)
    modifyViewForm(form)
    setProgress(100)
    submitForm()
    trackFormEvent({ action: 'submit', property: { form } })
  } else {
    showAlert('There are invalid fields. Please correct to submit.')
  }
}

const onSubmitEnter = (props, isValid) => ev => {
  const onClick = onSubmitClick(props)
  const isEnter = isEnterKey(ev)

  if (isEnter && isValid) {
    onClick()
  }
}

const onYearClick = (props, index) => () => {
  const { toggleYearDialog, viewForm: { birthYear } } = props
  const year = (new Date()).getFullYear()
  const is64 = toNumber(birthYear) <= year - 64
  const onNext = onNextClick(props, index)

  if (is64) {
    onNext()
  } else {
    toggleYearDialog(true)
  }
}

const onYearEnter = (props, isValid, index) => ev => {
  const onClick = onYearClick(props, index)
  const isEnter = isEnterKey(ev)

  if (isEnter && isValid) {
    onClick()
  }
}

const onYearDialogRemove = props => () => props.toggleYearDialog(false)

const onZipEnter = (props, isValid) => ev => {
  const { fetchLocation, viewForm: { zip } } = props
  const onClick = () => fetchLocation(zip)
  const isEnter = isEnterKey(ev)

  if (isEnter && isValid) {
    onClick()
  }
}

const propTypes = {
  error: PropTypes.bool,
  fetching: PropTypes.bool,
  fetchLocation: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  hasZip: PropTypes.bool,
  isCallDialogActive: PropTypes.bool,
  isYearDialogActive: PropTypes.bool,
  location: PropTypes.object,
  message: PropTypes.string,
  modifyForm: PropTypes.func.isRequired,
  modifyViewForm: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  resetAlert: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  resetViewForm: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  toggleCallDialog: PropTypes.func.isRequired,
  toggleYearDialog: PropTypes.func.isRequired,
  viewForm: PropTypes.object.isRequired,
}

const render = ({ props }) => {
  const {
    hasZip,
    isCallDialogActive,
    phoneNumber,
    success,
  } = props

  const ns = concat('form-view__field__')
  const phone = formatPhoneDefault(phoneNumber)

  if (success) {
    return <Redirect to="/thank-you" />
  }

  const dialogProps = {
    active: isCallDialogActive,
    className: 'form-view__dialog',
    onRemove: onCallDialogRemove(props),
  }

  const ghostButtonProps = {
    className: 'form-view__dialog__button--ghost',
    onClick: onCallDialogRemove(props),
    size: 'small',
    type: 'ghost',
  }

  const buttonProps = {
    actualHref: `tel:${phone}`,
    className: 'form-view__dialog__button--normal',
    size: 'small',
    type: 'normal',
  }

  return (
    <div className="form-view" id="form-view">
      <div className="form-view__inner">
        <div className="form-view__headline">
          <h4>Compare Medicare Supplement Quotes</h4>
          <h2>Would you mind answering a few questions? We'll look up plans & prices available to you.</h2>
        </div>
        {!hasZip && renderZip(ns, props, 0)}
        {renderName(ns, props, 1)}
        {renderGender(ns, props, 2)}
        {renderBirthMonth(ns, props, 3)}
        {renderBirtDay(ns, props, 4)}
        {renderBirthYear(ns, props, 5)}
        {renderEmail(ns, props, 6)}
        {renderAddress(ns, props, 7)}
        {renderPhone(ns, props, 8)}
      </div>
      <Dialog {...dialogProps}>
        <h4>Would you prefer a call instead?</h4>
        <p>Our licensed insurance agents are always available to help you find the best solution.</p>
        <div className="form-view__dialog__button-wrapper">
          <Button {...ghostButtonProps}>
            Continue
          </Button>
          <Button {...buttonProps}>
            Call Us Now
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

const renderAddress = (ns, props, index) => {
  const { progress, viewForm } = props
  const { address } = viewForm
  const valid = validate(address)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What is your street address?',
    id: 'address',
    onNext: onNextClick(props, index),
    scrollTo,
    subheadline: 'Address',
    valid,
  }

  return (
    <div className={`form-view__field ${ns('address')}`}>
      <FormBlock {...formProps}>
        <div className={ns('address__inner')}>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="address"
            onChange={onBlockChange(props, 'address')}
            onKeyDown={onBlockEnter(props, valid, index)}
            placeholder="Street address"
            spellCheck="false"
            type="text"
            value={address || ''}
          />
        </div>
      </FormBlock>
    </div>
  )
}

const renderBirtDay = (ns, props, index) => {
  const { progress, viewForm } = props
  const { birthDay, birthMonth } = viewForm
  const findByValue = find(propEq('value', birthMonth))
  const getDaysLength = compose(inc, propOr(30, 'days'), findByValue, values)
  const onDayClick = val => onBlockClick(props, 'birthDay', val, index)

  const classes = classNames(ns('birth-day'), 'form-view__field', {
    [`${ns(`birth-day--${birthDay}`)}`]: true,
  })

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What day were you born?',
    id: 'birth-day',
    scrollTo,
    subheadline: 'Birthdate',
  }

  const renderDay = day => {
    const dayClasses = classNames(ns('birth-day__day'), {
      [`${ns(`birth-day__day--${day}`)}`]: true,
      [`${ns('birth-day__day--active')}`]: day === birthDay,
    })

    const dayProps = {
      className: dayClasses,
      key: day,
      onClick: onDayClick(day),
      onKeyDown: onKeyDown(onDayClick(day)),
      role: 'button',
      tabIndex: tabIndex(true),
    }

    return (
      <div {...dayProps}>
        {day}
      </div>
    )
  }

  const renderDays = compose(map(renderDay), range(1), getDaysLength)

  return (
    <div className={classes}>
      <FormBlock {...formProps}>
        {renderDays(months)}
      </FormBlock>
    </div>
  )
}

const renderBirthMonth = (ns, props, index) => {
  const { progress, viewForm } = props
  const { birthMonth } = viewForm
  const filterByValue = filter(propEq('value', birthMonth))
  const getActiveMonth = compose(head, keys, filterByValue)
  const activeMonth = !isNil(birthMonth) && getActiveMonth(months)
  const onMonthClick = val => onBlockClick(props, 'birthMonth', val, index)

  const classes = classNames(ns('birth-month'), 'form-view__field', {
    [`${ns(`birth-month--${activeMonth}`)}`]: true,
  })

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What month were you born?',
    id: 'birth-month',
    scrollTo,
    subheadline: 'Birthdate',
  }

  const renderMonth = ({ value }, month) => {
    const monthProps = {
      className: ns(`birth-month--${month}`),
      key: value,
      onClick: onMonthClick(value),
      onKeyDown: onKeyDown(onMonthClick(value)),
      role: 'button',
      tabIndex: tabIndex(true),
    }

    return (
      <div {...monthProps}>
        {toTitleCase(month)}
      </div>
    )
  }

  const renderMonths = compose(values, mapObjIndexed(renderMonth))

  return (
    <div className={classes}>
      <FormBlock {...formProps}>
        {renderMonths(months)}
      </FormBlock>
    </div>
  )
}

const renderBirthYear = (ns, props, index) => {
  const { isYearDialogActive, progress, viewForm } = props
  const { birthYear } = viewForm
  const valid = validateDigits(birthYear, 4)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What year were you born?',
    id: 'birth-year',
    onNext: onYearClick(props, index),
    scrollTo,
    subheadline: 'Birthdate',
    valid,
  }

  const dialogProps = {
    active: isYearDialogActive,
    className: 'form-view__dialog',
    onRemove: onYearDialogRemove(props),
  }

  const ghostButtonProps = {
    className: 'form-view__dialog__button--ghost',
    onClick: onYearDialogRemove(props),
    size: 'small',
    type: 'ghost',
  }

  const buttonProps = {
    actualHref: 'https://www.medicareadvantage.com',
    className: 'form-view__dialog__button--normal',
    size: 'small',
    type: 'normal',
  }

  return (
    <div className={`form-view__field ${ns('birth-year')}`}>
      <FormBlock {...formProps}>
        <div className={ns('birth-year__inner')}>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="birth-year"
            onChange={onBlockChange(props, 'birthYear')}
            onKeyDown={onYearEnter(props, valid, index)}
            placeholder="YYYY"
            spellCheck="false"
            type="text"
            value={birthYear || ''}
          />
        </div>
      </FormBlock>
      <Dialog {...dialogProps}>
        <h4>Under 64 years old?</h4>
        <p>We may have better options for you at <a href="https://www.medicareadvantage.com" target="_blank" rel="noopener noreferrer">MedicareAdvantage.com</a>. If the year you entered is incorrect, you can go back and change it.</p>
        <div className="form-view__dialog__button-wrapper">
          <Button {...ghostButtonProps}>
            Go Back
          </Button>
          <Button {...buttonProps}>
            View Plans
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

const renderEmail = (ns, props, index) => {
  const { progress, viewForm } = props
  const { email } = viewForm
  const valid = emailValidator.validate(email)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What is your email address?',
    id: 'email',
    onNext: onNextClick(props, index),
    scrollTo,
    subheadline: 'Email',
    valid,
  }

  return (
    <div className={`form-view__field ${ns('email')}`}>
      <FormBlock {...formProps}>
        <div className={ns('email__inner')}>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="email"
            onChange={onBlockChange(props, 'email')}
            onKeyDown={onBlockEnter(props, valid, index)}
            placeholder="Email address"
            spellCheck="false"
            type="text"
            value={email || ''}
          />
        </div>
      </FormBlock>
    </div>
  )
}

const renderGender = (ns, props, index) => {
  const { progress, viewForm } = props
  const gender = viewForm.gender && toLower(viewForm.gender)
  const onFemaleClick = onBlockClick(props, 'gender', 'Female', index)
  const onMaleClick = onBlockClick(props, 'gender', 'Male', index)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What is your gender?',
    id: 'gender',
    scrollTo,
    subheadline: 'Gender',
  }

  const buttonClasses = classNames(ns('gender__button'), {
    [`${ns('gender__button')}--${gender}`]: true,
  })

  const buttonProps = {
    className: buttonClasses,
    size: 'medium',
    type: 'ghost',
  }

  return (
    <div className={`form-view__field ${ns('gender')}`}>
      <FormBlock {...formProps}>
        <div className={ns('gender__inner')}>
          <div className={ns('gender__button-wrapper')}>
            <Button onClick={onFemaleClick} {...buttonProps}>
              Female
            </Button>
          </div>
          <div className={ns('gender__button-wrapper')}>
            <Button onClick={onMaleClick} {...buttonProps}>
              Male
            </Button>
          </div>
        </div>
      </FormBlock>
    </div>
  )
}

const renderName = (ns, props, index) => {
  const { hasZip, progress, viewForm } = props
  const { firstName, lastName } = viewForm
  const valid = validateName(firstName, lastName)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    headline: 'What is your name?',
    id: 'name',
    onNext: onNextClick(props, index),
    scrollTo: hasZip ? always : scrollTo,
    subheadline: 'Name',
    valid,
  }

  return (
    <div className={`form-view__field ${ns('name')}`}>
      <FormBlock {...formProps}>
        <div className={ns('name__inner')}>
          <div className={ns('name__input')}>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              name="first-name"
              onChange={onBlockChange(props, 'firstName')}
              onKeyDown={onBlockEnter(props, valid, index)}
              placeholder="First Name"
              spellCheck="false"
              type="text"
              value={firstName || ''}
            />
          </div>
          <div className={ns('name__input')}>
            <input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              name="last-name"
              onChange={onBlockChange(props, 'lastName')}
              onKeyDown={onBlockEnter(props, valid, index)}
              placeholder="Last Name"
              spellCheck="false"
              type="text"
              value={lastName || ''}
            />
          </div>
        </div>
      </FormBlock>
    </div>
  )
}

const renderPhone = (ns, props, index) => {
  const {
    error,
    message,
    phoneNumber,
    progress,
    resetAlert,
    viewForm,
  } = props

  const { phone } = viewForm
  const valid = validateDigits(phone, 10)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    error,
    headline: 'What is the best number to reach you?',
    id: 'phone',
    isLast: true,
    message,
    phone: formatPhoneDefault(phoneNumber),
    onNext: onSubmitClick(props),
    resetAlert,
    scrollTo,
    subheadline: 'Phone',
    valid,
  }

  return (
    <div className={`form-view__field ${ns('phone')}`}>
      <FormBlock {...formProps}>
        <div className={ns('phone__inner')}>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="phone"
            onChange={onBlockChange(props, 'phone')}
            onKeyDown={onSubmitEnter(props, valid)}
            placeholder="Phone number"
            spellCheck="false"
            type="text"
            value={phone || ''}
          />
          <span className="help">*Numbers only</span>
        </div>
      </FormBlock>
    </div>
  )
}

const renderZip = (ns, props, index) => {
  const {
    error,
    fetching,
    fetchLocation,
    message,
    progress,
    resetAlert,
    viewForm: { zip },
  } = props

  const valid = validateDigits(zip, 5)
  const onNext = () => fetchLocation(zip)

  const formProps = {
    active: progress >= PROGRESS_INCREMENT * index,
    after: progress >= PROGRESS_INCREMENT * (index + 1),
    error,
    fetching,
    headline: 'What is your zip code?',
    id: 'zip',
    message,
    onNext,
    resetAlert,
    scrollTo: always,
    subheadline: 'Zip Code',
    valid,
  }

  return (
    <div className={`form-view__field ${ns('zip')}`}>
      <FormBlock {...formProps}>
        <div className={ns('zip__inner')}>
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="zip"
            onChange={onBlockChange(props, 'zip')}
            onKeyDown={onZipEnter(props, valid, zip)}
            placeholder="12345"
            spellCheck="false"
            type="text"
            value={zip || ''}
          />
        </div>
      </FormBlock>
    </div>
  )
}

const scrollTo = id => {
  const element = document.getElementById(`form-block--${id}`)

  const opts = {
    duration: 500,
    easing: 'ease-in-out',
    offset: -210,
  }

  Velocity(element, 'scroll', opts)
}

const validate = field => {
  const notNil = compose(not, isNil)
  const notEmpty = compose(not, isEmpty)
  const valid = both(notNil, notEmpty)

  return valid(field)
}

const validateDigits = (num, digits) => {
  const isNum = compose(isNumber, toNumber)
  const isAllNum = all(isNum)
  const wrongLength = num => !equals(digits, num.toString().length)

  const valid =
    cond([
      [isNil, always(false)],
      [wrongLength, always(false)],
      [isAllNum, always(true)],
    ])

  return valid(num)
}

const validateName = (firstName, lastName) => all(validate, [firstName, lastName])

export const FormView = stitch({
  componentDidMount,
  componentWillUnmount,
  propTypes,
  render,
})

// Redux
const mapStateToProps = state => ({
  error: state.views.form.error,
  fetching: state.views.form.fetching,
  form: state.data.form,
  hasZip: state.views.form.hasZip,
  isCallDialogActive: state.views.form.callDialog,
  isYearDialogActive: state.views.form.yearDialog,
  message: state.views.form.message,
  phoneNumber: state.data.general.phoneNumber,
  progress: state.views.form.progress,
  success: state.views.form.success,
  viewForm: state.views.form.form,
})

const mapDispatchToProps = {
  ...formActions,
  ...formViewActions,
}

export default withRouter(mapStateToProps, mapDispatchToProps, FormView)

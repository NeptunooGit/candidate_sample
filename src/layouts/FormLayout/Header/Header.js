import './Header.css'

import classNames from 'classnames'
import concat from 'ramda/src/concat'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'
import Velocity from 'velocity-animate'

import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'
import { defaultNavOrderTabIndex } from '../../../shared/utils/tabNavigation'
import Dialog from '../../../shared/components/Dialog/Dialog'
import { isEnterOrSpaceBarKey } from '../../../shared/utils/keyboard'
import Logo from '../../../shared/icons/Logo'
import Phone from '../../../shared/icons/Phone'
import Reset from '../../../shared/icons/Reset'

const onKeyDown = onClick => ev => isEnterOrSpaceBarKey(ev) && onClick()

const propTypes = {
  isDialogActive: PropTypes.bool.isRequired,
  phone: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  resetForm: PropTypes.func.isRequired,
  resetViewForm: PropTypes.func.isRequired,
  showLogo: PropTypes.bool,
  toggleDialog: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const {
    isDialogActive,
    phone,
    progress,
    showLogo,
    toggleDialog,
  } = props

  const ns = concat('form-header__')
  const progressStyle = { width: `${progress}%` }

  const logoClasses = classNames(ns('back'), {
    [ns('back--logo')]: showLogo,
  })

  const phoneProps = {
    className: ns('link'),
    href: `tel:${phone}`,
    target: '_blank',
  }

  const resetProps = {
    className: ns('link--reset'),
    onClick: toggleDialog,
    onKeyDown: onKeyDown(toggleDialog),
    role: 'button',
    tabIndex: defaultNavOrderTabIndex,
    title: 'Start over',
  }

  const dialogProps = {
    active: isDialogActive,
    className: 'form-header__dialog',
    onRemove: toggleDialog,
  }

  const ghostButtonProps = {
    className: ns('button--ghost'),
    onClick: toggleDialog,
    size: 'small',
    type: 'ghost',
  }

  const buttonProps = {
    className: ns('button--normal'),
    onClick: resetForm(props),
    size: 'small',
    type: 'normal',
  }

  return (
    <div className="form-header">
      <div className={ns('progress')} style={progressStyle} />
      <div className={ns('inner')}>
        <div className={ns('left')}>
          <Link className={logoClasses} to="/">
            {showLogo ? <Logo /> : <Arrow />}
          </Link>
        </div>
        <div className={ns('right')}>
          <a {...phoneProps}>
            <Phone />
            <span>{phone}</span>
          </a>
          <div {...resetProps}>
            <Reset />
            <span>Start Over</span>
          </div>
        </div>
      </div>
      <Dialog {...dialogProps}>
        <h4>Are you sure you want to start over?</h4>
        <p>All of your progress and information will be lost.</p>
        <div className={ns('button-wrapper')}>
          <Button {...ghostButtonProps}>
            Go Back
          </Button>
          <Button {...buttonProps}>
            Start Over
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

const resetForm = props => () => {
  props.resetForm()
  props.resetViewForm()
  props.toggleDialog()
  Velocity(document.body, 'scroll')
}

export default stitch({ propTypes, render })

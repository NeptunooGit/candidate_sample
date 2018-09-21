import './Header.css'

import classNames from 'classnames'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import Arrow from '../../../shared/icons/Arrow'
import Button from '../../../shared/components/Button/Button'
import Logo from '../../../shared/icons/Logo'
import Phone from '../../../shared/icons/Phone'
import { trackFormEvent } from '../../../shared/utils/event'

const onButtonClick = () => {
  const opts = {
    action: 'start',
    property: {
      progress: 0,
      form: { zip: '' },
    },
  }

  trackFormEvent(opts)
}

const propTypes = {
  page: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

const render = ({ props }) => {
  const { page, phone } = props
  const showMenu = page !== '/thank-you'
  const hasHero = page === '/' || page === '/thank-you'

  const classes = classNames('header', {
    'header--with-hero': hasHero,
  })

  const logoProps = {
    className: 'header__logo',
    to: '/',
    title: 'Online Medicare Plans logo',
  }

  const phoneProps = {
    className: 'header__phone',
    href: `tel:${phone}`,
    target: '_blank',
    title: 'Online Medicare Plans phone number',
  }

  const buttonProps = {
    className: 'header__button',
    href: '/form',
    onClick: onButtonClick,
    size: 'small',
    type: 'ghost',
  }

  const menu =
    <div className="header__right">
      <a {...phoneProps}>
        <Phone /><span>{phone}</span>
      </a>
      <Button {...buttonProps}>
        Get Started <Arrow />
      </Button>
    </div>

  return (
    <div className={classes}>
      <div className="header__inner">
        <div className="header__left">
          <Link {...logoProps}>
            <Logo />
          </Link>
        </div>
        {showMenu && menu}
      </div>
    </div>
  )
}

export default stitch({ propTypes, render })

import './NoMatchView.css'

import concat from 'ramda/src/concat'
import React from 'react'
import { stitch } from 'keo'

import Arrow from '../../shared/icons/Arrow'
import Button from '../../shared/components/Button/Button'

const render = () => {
  const ns = concat('no-match-view__')

  const buttonProps = {
    className: ns('button'),
    href: '/',
    size: 'medium',
    type: 'ghost',
  }

  return (
    <div className="no-match-view">
      <div className={ns('inner')}>
        <h1>404</h1>
        <h4>Page not found</h4>
        <p>The page you are looking for does not exist</p>
        <Button {...buttonProps}>
          <Arrow /> Return Home
        </Button>
      </div>
    </div>
  )
}

export default stitch({ render })

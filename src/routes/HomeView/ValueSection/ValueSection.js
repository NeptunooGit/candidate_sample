import './ValueSection.css'

import concat from 'ramda/src/concat'
import React from 'react'

import AetnaLogo from '../../../shared/icons/AetnaLogo'
import CignaLogo from '../../../shared/icons/CignaLogo'
import MassMutualLogo from '../../../shared/icons/MassMutualLogo'
import MutualOfOmahaLogo from '../../../shared/icons/MutualOfOmahaLogo'

const ValueSection = () => {
  const ns = concat('value-section__')

  return (
    <div className="value-section">
      <div className={ns('inner')}>
        <h3>Get an Affordable Medicare Supplement plan that meets <i>your</i> needs in a few simple steps.</h3>
        <div className={`${ns('icons')} ${ns('icons--hidden')}`}>
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

export default ValueSection

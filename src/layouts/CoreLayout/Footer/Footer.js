import './Footer.css'

import classNames from 'classnames'
import isNil from 'ramda/src/isNil'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import BBBLogo from '../../../shared/icons/BBBLogo'
import Logo from '../../../shared/icons/Logo'
import SecureLogo from '../../../shared/icons/SecureLogo'

const componentDidMount = ({ props }) => props.toggleBottom(false)
const componentWillUnmount = ({ props }) => props.toggleBottom(null)
const onMoreClick = props => () => props.toggleBottom(!props.isBottomActive)

const propTypes = {
  browser: PropTypes.object.isRequired,
  isBottomActive: PropTypes.bool,
  toggleBottom: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const { browser, isBottomActive } = props
  const isDesktop = browser.greaterThan.large
  const moreText = isBottomActive ? 'Show Less' : 'Show More'
  const innerEl = document.getElementById('footer__bottom__inner')
  const innerHeight = innerEl ? innerEl.offsetHeight : null
  const maxHeight = isBottomActive ? innerHeight : 0
  const style = !isNil(maxHeight) ? { maxHeight } : null

  const bottomClasses = classNames('footer__bottom', {
    'footer__bottom--active': isBottomActive,
  })

  const copyright =
    <div className="footer__row__left">
      <span>Copyright &copy; 2018 TZ Insurance Solutions LLC. All rights reserved.</span>
      <span>Online-Medicare-Plans.com is a website owned and operated by TZ Insurance Solutions LLC, a licensed insurance agency.</span>
      <span className="link" onClick={onMoreClick(props)}>{moreText}</span>
    </div>

  const logos =
    <div className="footer__row__right">
      <SecureLogo className="footer__logo--norton" />
      <BBBLogo className="footer__logo--bbb" />
    </div>

  return (
    <div className="footer">
      <div className="footer__inner">
        <div className="footer__row">
          <div className="footer__row__left">
            <Link className="footer__logo" to="/">
              <Logo className="footer__logo--omp" />
            </Link>
          </div>
          <div className="footer__row__right">
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use">Terms of Use</Link></li>
              <li><Link to="/carriers">Carriers</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__row footer__row--last">
          {isDesktop ? copyright : logos}
          {isDesktop ? logos : copyright}
        </div>
        <div className={bottomClasses} style={style}>
          <div className="footer__bottom__inner" id="footer__bottom__inner">
            <span>* Plan F also offers a high-deductible plan. If you choose this option, this means you must pay for Medicare-covered costs up to the deductible amount of $2,240 in 2018 before your Medigap plan pays anything.</span>
            <span>** After you meet your out-of-pocket yearly limit and your yearly Part B deductible, the Medigap plan pays 100% of covered services for the rest of the calendar year.</span>
            <span>This Website serves as an invitation for you, the customer, to inquire about further information regarding Medicare Supplement insurance, and your call will be routed to a licensed agent who can provide you with further information about the insurance plans offered by one or more of our <Link to="/third-party-partners">third party partners</Link>. Submission of your contact information constitutes permission for an agent to contact you with further information, including complete details on cost and coverage of this insurance.</span>
            <span>We and the licensed agents that may call you are not connected with or endorsed by the U.S. Government or the federal Medicare program. Medicare has neither reviewed nor endorsed the information contained on this website. This is not a complete listing of plans available in your service area. For a complete listing please contact 1-800-MEDICARE or consult <a href="http://www.medicare.gov/">www.medicare.gov</a> (TTY users should call 1-877-486-2048), 24 hours a day/7 days a week or consult <a href="http://www.medicare.gov/">www.medicare.gov</a>.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default stitch({
  componentDidMount,
  componentWillUnmount,
  propTypes,
  render,
})

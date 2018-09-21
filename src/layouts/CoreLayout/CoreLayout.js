import PropTypes from 'prop-types'
import React from 'react'
import { stitch } from 'keo'

import EmailSection from './EmailSection/EmailSection'
import Footer from './Footer/Footer'
import { formatPhoneDefault } from '../../shared/utils/phone'
import Header from './Header/Header'
import * as sharedActions from '../../store/views/shared/actions'
import withRouter from '../../shared/utils/withRouter'

const propTypes = {
  browser: PropTypes.object.isRequired,
  children: PropTypes.node,
  email: PropTypes.object.isRequired,
  footer: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  modifyEmail: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  resetEmailAlert: PropTypes.func.isRequired,
  saveEmail: PropTypes.func.isRequired,
  showEmailAlert: PropTypes.func.isRequired,
  toggleFooterBottom: PropTypes.func.isRequired,
}

const render = ({ props }) => {
  const {
    browser,
    children,
    email,
    footer,
    history,
    modifyEmail,
    phoneNumber,
    resetEmailAlert,
    saveEmail,
    showEmailAlert,
    toggleFooterBottom,
  } = props

  const headerProps = {
    page: history.location.pathname,
    phone: formatPhoneDefault(phoneNumber),
  }

  const emailProps = {
    ...email,
    modifyEmail,
    resetAlert: resetEmailAlert,
    saveEmail,
    showAlert: showEmailAlert,
  }

  const footerProps = {
    browser,
    isBottomActive: footer.bottom,
    toggleBottom: toggleFooterBottom,
  }

  return (
    <div>
      <Header {...headerProps} />
      <div className="main">
        {children}
      </div>
      <EmailSection {...emailProps} />
      <Footer {...footerProps} />
    </div>
  )
}

export const CoreLayout = stitch({ propTypes, render })

// Redux
const mapStateToProps = state => ({
  browser: state.browser,
  email: state.views.shared.email,
  footer: state.views.shared.footer,
  phoneNumber: state.data.general.phoneNumber,
})

const mapDispatchToProps = {
  ...sharedActions,
}

export default withRouter(mapStateToProps, mapDispatchToProps, CoreLayout)

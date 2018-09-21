import tryCatch from 'ramda/src/tryCatch'

import { formatQuery } from '../shared/utils/parseQuery'
import { trackErrorEvent } from '../shared/utils/event'

const message = 'Failed to save/retrieve local storage.'
const catcher = () => trackErrorEvent({ action: 'storage_error', property: { message } })
const tryer = fn => tryCatch(fn, catcher)

const getDomainSession = () => localStorage.getItem('domainSessionId')
const getQuery = () => localStorage.getItem('queryStringParams')
const getState = () => JSON.parse(localStorage.getItem('state'))
const getTrustedFormCert = () => localStorage.getItem('trustedFormCertificateUrl')
const saveQuery = query => localStorage.setItem('queryStringParams', formatQuery(query))
const saveState = state => localStorage.setItem('state', JSON.stringify(state))

export const getLocalDomainSession = tryer(getDomainSession)
export const getLocalQuery = tryer(getQuery)
export const getLocalState = tryer(getState)
export const getLocalTrustedFormCert = tryer(getTrustedFormCert)
export const saveLocalQuery = tryer(saveQuery)
export const saveLocalState = tryer(saveState)

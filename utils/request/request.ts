import 'isomorphic-fetch'
import { checkStatus } from './requestHandler'
import { camelizeKeys } from 'humps'
import { logoutPath, ssoPath } from '@utils/apiEndpoint'
import { getRequest } from '.'

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url: string, options: any = {}, headers: any = {}) {
  const baseOptions: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION'
    headers?: any
  } = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  // Upload request MUST NOT SET Content-Type header
  // Content-Type will be set automatically by fetch
  if (options.isUpload) {
    /* eslint-disable no-param-reassign */
    delete baseOptions.headers['Content-Type']
    delete options.isUpload // clean up temp param
    /* eslint-enable no-param-reassign */
  }

  if ('isDownloadFile' in options && options['isDownloadFile']) {
    return fetch(url, { ...baseOptions, ...options })
      .then(checkStatus)
      .then((res) => res.blob())
  }

  return fetch(url, { ...baseOptions, ...options })
    .then(async (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response
      }

      const error = new Error(response?.statusText)

      const result = await response.json()

      if (result.statusCode === 401) {
        const rs = await getSSOUrl('', false)
        if (!!rs.ssoUrl) {
          window.location.href = rs.ssoUrl
          return
        }
      }

      const objReturn = {
        statusCode: response?.status,
        statusText: response?.statusText,
        ...(typeof result === 'object' &&
          result && {
            ...result,
          }),
      }

      return Promise.reject(Object.assign(error, objReturn))
    })
    .then((res) => {
      if (!!res?.status && [202, 204, 205].includes(res?.status)) {
        return null
      }

      return res?.json()
    })
    .then((re) => {
      return camelizeKeys(re)
    })
}

export const getSSOUrl = (currentPath: string, isSSO = true) => {
  const url = `${ssoPath}?RelayState=${currentPath}`
  return getRequest({ apiPath: url, apiVersion: 2, isSSO })
}

export const getLogoutUrl = (currentPath: string) => {
  const url = `${logoutPath}?RelayState=${currentPath}`
  return getRequest({ apiPath: url, apiVersion: 2 })
}

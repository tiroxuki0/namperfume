import { camelizeKeys } from "humps"

import { safeObj } from "../helper"

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
export function parseJSON(response: any) {
  if (response.status === 204 || response.status === 205) {
    return null
  }

  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

interface ErrorWithStatusCode extends globalThis.Error {
  statusCode?: number
}
export function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  if (response.status === 403) {
    const error = new Error("Forbidden") as ErrorWithStatusCode
    error.statusCode = 403
    return Promise.reject(error)
  }

  if (response.status === 409) {
    const ssoUrl = response.headers.get("Content-Location")
    if (ssoUrl) {
      window.location.replace(ssoUrl)
      return
    }
    const error = new Error("Unauthorized")
    const objReturn = {
      errorCode: 401,
      statusCode: 401,
      statusText: "Unauthorized! Redirecting to login page ..."
    }
    return Promise.reject(Object.assign(error, objReturn))
  }

  return response.json().then((json: any) => {
    const objReturn = {
      errorCode: json.error_code,
      errorMessage: json.error_message,
      statusCode: response.status,
      statusText: json.message,
      errors: json.errors,
      recordErrors: camelizeKeys(json.record_errors),
      baseErrors: camelizeKeys(safeObj(json, "base_error")),
      record: camelizeResponseKeys(json)
    }

    if (json.is_not_confirm) {
      Object.assign(objReturn, { isNotConfirm: json.is_not_confirm })
    }

    if (json.conflicted) {
      Object.assign(objReturn, { conflicted: camelizeKeys(json.conflicted) })
    }

    return Promise.reject(objReturn)
  })
}

export function camelizeResponseKeys(response: any) {
  return camelizeKeys(response, (key, convert) => {
    if (/[A-Z_]+$/.test(key)) return key

    return /^[A-Z_]+$/.test(key) || /^([A-Z][a-z0-9]*)+/.test(key) ? key : convert(key)
  })
}

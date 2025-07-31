import type { GetProp, UploadProps } from "antd"
import { decamelizeKeys } from "humps"
import {
  cloneDeep,
  get,
  has,
  isArray,
  isFunction,
  isNaN,
  isNil,
  isPlainObject,
  lowerCase,
  mapKeys,
  mapValues,
  omitBy,
  snakeCase,
  startCase
} from "lodash"
import moment from "moment"
import getConfig from "next/config"
import qs from "qs"
import dayjs, { ManipulateType } from "dayjs"

import {
  DEFAULT_DATETIME_FORMAT,
  REGEX_HTTP_HTTPS_URL,
  REGEX_VALIDATE_COMMON_NAME,
  REGEX_VALIDATE_COMMON_NAME_LOWERCASE,
  REGEX_VALIDATE_DISPLAY_NAME,
  REGEX_VALIDATE_EMAIL,
  REGEX_VALIDATE_GENERAL,
  REGEX_VALIDATE_PASSWORD,
  REGEX_VALIDATE_PHONE,
  REGEX_VALIDATE_ROLE_NAME_FORMAT,
  REGEX_VALIDATE_USERNAME_FORMAT,
  REGEX_WEBSOCKET_URL,
  REGEX_HOST_PATH
} from "@root/constant"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

/* eslint-disable @typescript-eslint/no-explicit-any */
export function safeObj(obj: any, method: string, emptyValue: string | number | null = "-") {
  return get(obj, method, emptyValue) ?? "-"
}

export function convertParamsToQueryString(params: ObjectLiteral, options = {}) {
  return qs.stringify(
    has(params, "transformKey") && params.transformKey === false ? params : decamelizeKeys(params),
    { skipNulls: true, ...options }
  )
}

export const apiUrl = (path: string, baseApi = getConfig().publicRuntimeConfig.apiURL) =>
  `${baseApi}${path}`

export const apiUrlQuery = (options: any = {}) => {
  const { apiPath, apiBase, params, formattedOptions } = options
  const query = convertParamsToQueryString(params, formattedOptions)
  // return `${apiUrl(apiPath, apiBase)}?${query}`
  return `${apiUrl(apiPath, apiBase)}${!!query ? `?${query}` : ""}`
}

export const decamelizeParamKeys = (params: ObjectLiteral) =>
  decamelizeKeys(params, (key, convert) => {
    if (/[A-Z_]+$/.test(key)) return key

    return /^[A-Z_]+$/.test(key) || /^([A-Z][a-z0-9]*)+/.test(key) ? key : convert(key)
  })

export const formBody = (params: ObjectLiteral) => JSON.stringify(decamelizeParamKeys(params))

export const pluralizeSelected = (total: number | undefined) => {
  if (typeof total === "undefined") return ""
  if (total <= 1) return `${total} item`
  return `${total} items`
}

export const textType = (value: string) => {
  let type: string

  switch (lowerCase(value)) {
    //--------------------------------------------------------------------------> Default
    case "rejected":
      type = "default"
      break
    //--------------------------------------------------------------------------> Warning
    case "pending approval":
    case "warning":
      type = "warning"
      break
    //--------------------------------------------------------------------------> Success
    case "success":
    case "online":
    case "running":
    case "active":
    case "activated":
    case "available":
    case "provisioned":
    case "completed":
    case "enabled":
    case "succeeded":
    case "joined":
    case "up":
    case "on":
    case "ok":
    case "healthy":
    case "ready":
    case "started":
    case "vm running":
    case "created":
    case "connected":
    case "approved":
    case "paid":
    case "associated":
    case "attached":
    case "default":
    case "pass":
    case "yes":
    case "allocated":
      type = "success"
      break
    //--------------------------------------------------------------------------> in-progress
    case "creating":
    case "detaching":
    case "in-progress":
    case "provisioning":
    case "attaching":
    case "loading":
    case "synchronising":
    case "terminating":
    case "in progress":
    case "deleting":
    case "validating":
    case "resizing":
    case "fetching":
    case "updating":
    case "in used":
    case "recovering":
    case "migrating":
    case "deploying":
    case "restoring":
    case "waiting":
    case "progressing":
    case "estimating":
      type = "processing"
      break
    //--------------------------------------------------------------------------> stopped
    case "disabled":
    case "offline":
    case "suspended":
    case "assigned":
    case "stopped":
    case "unpaid":
    case "unassociated":
      type = "stopped"
      break
    //--------------------------------------------------------------------------> info
    case "info":
    case "In use":
    case "in use":
      type = "success"
      break
    //--------------------------------------------------------------------------> error

    case "error":
    case "off":
    case "down":
    case "unauthorized":
    case "not_ready":
    case "not_joined":
    case "cancel":
    case "failed":
    case "invalid":
    case "full":
      type = "error"
      break
    case "pending":
    case "missing":
      type = "warning"
      break
    default:
      type = "error"
  }

  return type
}

export const checkStateType = (status: string) => {
  return ["processing", "error"].includes(textType(status))
}

export const beingProcessed = (status?: string) => {
  return textType(status || "") === "processing"
}

export const isValidString = (value: any) =>
  value !== undefined && value !== null && String(value).trim() !== "" && String(value) !== ""

export const snakeCaseToTitleCase = (
  text: string | undefined | null,
  defaultValue = "-"
): string => {
  if (isNil(text) || !isValidString(text) || text === defaultValue) {
    return defaultValue
  }
  return startCase(String(text).replaceAll("_", " "))
}

export function toLocalTime(
  time?: string | Date | number,
  escaped = null,
  format = DEFAULT_DATETIME_FORMAT,
  defaultValue = "-"
) {
  if (!isValidString(time) || time === defaultValue || (typeof time === "number" && isNaN(time)))
    return defaultValue
  let str
  if (time) {
    if (typeof time === "number") {
      str = moment.unix(time)
    } else {
      str = moment(time)
    }

    if (escaped) {
      return str.format(`YYYY-MM-DD [${escaped}] HH:mm:ss`)
    }

    return str.format(format)
  } else {
    return defaultValue
  }
}

export const extractPropertiesToPayload = (properties: ObjectLiteral) => {
  return Object.entries(properties || {}).reduce((acc, [key, value]) => {
    acc = {
      ...acc,
      [key]: value?.value
    }
    return acc
  }, {})
}

export function generatePassword(length = 12) {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercase = "abcdefghijklmnopqrstuvwxyz"
  const numbers = "0123456789"
  // const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
  const specialCharacters = "!@#$%^&*"

  // Combine all character sets
  const allCharacters = uppercase + lowercase + numbers + specialCharacters

  const getSecureRandomNumber = (max: number) => {
    const randomBuffer = new Uint32Array(1)
    window.crypto.getRandomValues(randomBuffer)
    return randomBuffer[0] % max
  }

  // Helper function to get random character from a string
  const getSecureRandomCharacter = (chars: string) => {
    const randomIndex = getSecureRandomNumber(chars.length)
    return chars[randomIndex]
  }

  let password = ""

  // Generate the password
  for (let i = 0; i < length; i++) {
    password += getSecureRandomCharacter(allCharacters)
  }

  // Ensure the password contains at least one character from each set
  const ensureCharacterSet = (set: string) => {
    if (!password.split("").some(char => set.includes(char))) {
      const replaceIndex = getSecureRandomNumber(length)
      password =
        password.substring(0, replaceIndex) +
        getSecureRandomCharacter(set) +
        password.substring(replaceIndex + 1)
    }
  }

  ensureCharacterSet(uppercase)
  ensureCharacterSet(lowercase)
  ensureCharacterSet(numbers)
  ensureCharacterSet(specialCharacters)

  return password
}

export const isValidEmail = (value: string) => {
  return isValidString(value) && value.length <= 128 && REGEX_VALIDATE_EMAIL.test(value)
}

export const isValidDisplayName = (value: string, maxLength?: number) => {
  return value.length <= (maxLength ?? 128) && REGEX_VALIDATE_DISPLAY_NAME.test(value)
}

export const isValidPassword = (value: string) => REGEX_VALIDATE_PASSWORD.test(value)

export const INPUT_BLANK_ERROR_MESSAGE = (fieldName: string) => `${fieldName} is required`

export const SELECT_BLANK_ERROR_MESSAGE = (fieldName: string) => `${fieldName} is required`

export const isValidUsername = (value: string) => {
  return REGEX_VALIDATE_USERNAME_FORMAT.test(value)
}

export const isValidRoleName = (value: string) => {
  return REGEX_VALIDATE_ROLE_NAME_FORMAT.test(value)
}

export const isValidPhoneNumber = (value: string) => {
  return REGEX_VALIDATE_PHONE.test(value)
}

export const convertToPercent = (used: string | number, total: string | number) => {
  if (Number.isNaN(used) || Number.isNaN(total) || +total === 0) return 0
  const convertedUsed = typeof used === "number" ? used : parseFloat(used)
  const convertedTotal = typeof total === "number" ? total : parseFloat(total)
  return Math.round((convertedUsed / convertedTotal) * 100)
}

export const fixedNumber = (value: number, roundUp = 2) => {
  if (Number.isInteger(value)) return value
  return value.toFixed(roundUp)
}

export const between = ({ value, min, max }: { value: number; min: number; max: number }) => {
  return value >= min && value < max
}

export const annotation = (label?: string, notation?: string, withParen: boolean = true) => {
  if (!label) return notation || "-"

  return `${label} ${!!notation ? (withParen ? `(${notation})` : notation) : ""}`
}

export const textWithUnit = (
  value: string | number | null | undefined,
  unit: string,
  format: string = "%v%u",
  defaultValue: string = "-"
) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    isNaN(value) ||
    value === defaultValue
  )
    return defaultValue

  return format.replace("%v", `${value}`).replace("%u", unit)
}

export const isNotWholeNumber = (value: number | string | null) =>
  value === null || isNaN(+value) || !Number.isInteger(+value)

export function convertParamsToQueryStringWithArray(params: any) {
  return convertParamsToQueryString(params, {
    arrayFormat: "brackets",
    addQueryPrefix: true
  })
}
/**
 * Replace path params like ":id" in a path string with values from params
 * @example compilePath('/tenants/:id', { id: 123 }) => "/tenants/123"
 */
export const compilePath = (path: string, params: Record<string, any>): string => {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    const value = params[key]
    if (value === undefined) {
      throw new Error(`Missing path param: ${key}`)
    }
    return encodeURIComponent(String(value))
  })
}

export const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

export const validateHttpHttps = (url: string) => {
  const regex = new RegExp(REGEX_HTTP_HTTPS_URL)

  return regex.test(url)
}

export const validateWebsocket = (url: string) => {
  const regex = new RegExp(REGEX_WEBSOCKET_URL)

  return regex.test(url)
}

export const sanitizePayload = <T extends Record<string, any>>(payload: T): T => {
  return omitBy(payload, value => value === null || value === undefined || Number.isNaN(value)) as T
}

export const validateImageType = (type: string) => {
  return ["image/png", "image/jpeg"].includes(type)
}

export const getTimeSince = (isoDate: string): string => {
  if (!isoDate) return ""
  const start = new Date(isoDate).getTime()
  const now = new Date().getTime()

  const diffMs = now - start

  const minutes = Math.floor(diffMs / (1000 * 60)) % 60
  const hours = Math.floor(diffMs / (1000 * 60 * 60)) % 24
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  return `${days}d ${hours}h ${minutes}m`
}
export const portRange = (portNumber: string) => {
  const parsedPortNumber = parseInt(portNumber, 10)
  if (parsedPortNumber <= 0) return 1
  if (parsedPortNumber >= 65535) return 65535
  return parsedPortNumber
}

export const downloadCSVFile = (data: { content: string; name: string; type: string }) => {
  const ymlFile = new Blob([data.content], { type: "csv" })
  const exportURL = window.URL.createObjectURL(ymlFile)
  const link = document.createElement("a")
  link.download = data.name
  link.href = exportURL
  link.click()
  link.remove()
}

export const validateGeneralInput = (value: string) => {
  if (isValidString(value) && value.length > 64) {
    return false
  }

  return REGEX_VALIDATE_GENERAL.test(value)
}

export const calculatePercentageUsage = (usage: number, total: number) => {
  return total === 0 || usage === 0 ? 0 : ((usage / total) * 100).toFixed(2)
}

export const generateKeyFromPayload = (payload: any) => {
  return cloneDeep(
    Object.values(payload || {}).filter(i => i !== null || i !== undefined || i === "")
  )
    .sort()
    .join("-")
}
export const formatFriendlyTime = (timeInString: string) => {
  if (timeInString) {
    const now = moment()
    const time = moment(timeInString)

    const diff = now.clone().startOf("day").diff(time.clone().startOf("day"), "day")
    if (diff === 0) {
      return `Today, ${time.format("HH:mm:ss")}`
    }

    if (diff === 1) {
      return `Yesterday, ${time.format("HH:mm:ss")}`
    }

    return time.format("dddd, MMMM Do, HH:mm:ss")
  }

  return "-"
}

export function convertToOption(object: object, valueField: string, labelField: string) {
  if (!object) return null
  return {
    value: get(object, valueField, null),
    label: isFunction(labelField) ? labelField(object) : get(object, labelField, null),
    record: object
  }
}

export const isValidStringAndNotEmpty = (value: string) => {
  return isValidString(value) && value.trim().length > 0
}

export const validateCommonName = (name: string) => {
  const regex = new RegExp(REGEX_VALIDATE_COMMON_NAME)

  return isValidStringAndNotEmpty(name) && regex.test(name)
}

export const validateCommonNameLower = (name: string) => {
  const regex = new RegExp(REGEX_VALIDATE_COMMON_NAME_LOWERCASE)

  return isValidStringAndNotEmpty(name) && regex.test(name)
}

export const formatUpperCase = (text?: string): string => {
  if (!text) return ""

  return text
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
export const validateDomainName = (domainName: string) => {
  if (!domainName) return false

  const regex = /^(?![-_.])([a-zA-Z0-9-./_~:])*[?a-zA-Z0-9]$/

  return regex.test(domainName)
}

export const validateDNSSubDomain = (value: string) => {
  if (!value) return false

  const regex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.([a-z0-9]([a-z0-9-]*[a-z0-9])?))*$/

  return regex.test(value) && value.length <= 253
}

export const beautifulNumber = (value: number, fixed: number) => {
  if (typeof value !== "number") return 0

  if (value === 0 || Number.isInteger(value)) return value

  return value.toFixed(fixed)
}

export const sortByDate = (a: string, b: string): number => {
  const dateA = new Date(a)
  const dateB = new Date(b)

  const isValidA = !isNaN(dateA.getTime())
  const isValidB = !isNaN(dateB.getTime())

  if (!isValidA && !isValidB) return 0
  if (!isValidA) return 1
  if (!isValidB) return -1

  return dateA.getTime() - dateB.getTime()
}

export const percentage = (quantity: number, percent: number) => {
  return (quantity * percent) / 100
}

export const subtractTimeDayjs = (amount: number, unit: ManipulateType) => {
  return dayjs().subtract(amount, unit)
}

export const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`
export const validateHostpath = (value: string) => {
  return REGEX_HOST_PATH.test(value) && value.length <= 253
}

export const decodeBase64 = (base64: string) => {
  const binary = atob(base64)
  //@ts-expect-error: Unit8Array.from is not supported by typescript
  const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)))
  return new TextDecoder("utf-8").decode(bytes)
}

export const toSnakeCaseDeep = (obj: any): any => {
  if (isArray(obj)) {
    return obj.map(toSnakeCaseDeep)
  } else if (isPlainObject(obj)) {
    return mapValues(
      mapKeys(obj, (_, key) => snakeCase(key)),
      toSnakeCaseDeep
    )
  }
  return obj
}

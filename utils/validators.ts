import { RuleObject } from "antd/es/form"
import { StoreValue } from "antd/es/form/interface"
import { INPUT_BLANK_ERROR_MESSAGE, isNotWholeNumber, validateHttpHttps, validateWebsocket } from "./helper"
import { HTTP_HTTPS_ERROR_MESSAGE, WEBSOCKET_ERROR_MESSAGE } from "@root/constant"

export const EXCLUDE_VALUE = 65_515

export const REGEX_RANGE = /^(?![-_A-Za-z\s])([0-9]+[-]{1})*[0-9]+$/

export const PUBLIC_ASN_RANGE = {
  MAX: {
    FIVE_LETTER: 65_534,
    TEN_LETTER: 4_294_967_294
  },
  MIN: {
    FIVE_LETTER: 64_513,
    TEN_LETTER: 4_200_000_000
  }
}

export const between = ({ value, min, max }: { value: number; min: number; max: number }) => {
  return value >= min && value <= max
}

export const wholeNumber =
  ({ require, label = "Value", min = 0, max = Infinity }: { require: boolean; label?: string; min?: number; max?: number }) =>
  (_: RuleObject, value: StoreValue) => {
    if (typeof value !== "number" && !value) {
      return require ? Promise.reject(`${INPUT_BLANK_ERROR_MESSAGE(label)}`) : Promise.resolve()
    }
    if (!isNotWholeNumber(value)) {
      if (max === Infinity && value < min) {
        return Promise.reject(`Only whole numbers greater than or equal ${min} are allowed`)
      }
      if (max && (value > max || value < min)) return Promise.reject(`Only whole numbers in range ${min} and ${max} are allowed`)
    }

    return Promise.resolve()
  }

export const urlValidator =
  ({ require }: { require: boolean; label?: string }) =>
  (_: RuleObject, value: StoreValue) => {
    if (!!value && !validateHttpHttps(value)) {
      return Promise.reject(HTTP_HTTPS_ERROR_MESSAGE)
    }

    if (!value) {
      return require ? Promise.reject(HTTP_HTTPS_ERROR_MESSAGE) : Promise.resolve()
    }

    return Promise.resolve()
  }

export const websocketValidator =
  ({ require }: { require: boolean; label?: string }) =>
  (_: RuleObject, value: StoreValue) => {
    if (!!value && !validateWebsocket(value)) {
      return Promise.reject(WEBSOCKET_ERROR_MESSAGE)
    }

    if (!value) {
      return require ? Promise.reject(WEBSOCKET_ERROR_MESSAGE) : Promise.resolve()
    }

    return Promise.resolve()
  }

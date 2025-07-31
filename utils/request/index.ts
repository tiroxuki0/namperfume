/* eslint-disable @typescript-eslint/no-explicit-any */

import { decamelize } from "humps"
import { apiEndpointUrl } from "../apiEndpoint"
import { apiUrl, apiUrlQuery, formBody } from "../helper"
import request from "./request"
import { ObjectLiteral } from "@models/entities/ObjectLiteral"

export function createResourceRequest({ apiPath, apiVersion, params }: { apiPath: string; apiVersion?: string | number; params: ObjectLiteral }) {
  const apiBase = apiEndpointUrl(apiVersion)
  const endpoint = apiUrl(apiPath, apiBase)

  const body = formBody(params)
  const options = {
    method: "POST",
    body
  }

  return request(endpoint, options)
}

type GetRequestType = {
  apiPath: string
  apiVersion?: string | number | undefined
  params?: any
  isSSO?: boolean
  formattedOptions?: any
  headers?: any
}
export function getRequest({ apiPath, apiVersion, params = {}, isSSO = false, formattedOptions = {}, headers }: GetRequestType) {
  let apiBase = apiEndpointUrl(apiVersion)

  if (isSSO) {
    apiBase = apiEndpointUrl(apiVersion, undefined, isSSO)
  }

  const endpoint = apiUrlQuery({
    apiPath,
    apiBase,
    params,
    isSSO,
    formattedOptions
  })

  return request(endpoint, {}, headers)
}

type UpdateRequestType = {
  apiPath: string
  apiVersion?: string | number | undefined
  params?: any
  method?: "PUT" | "PATCH"
  formattedOptions?: any
}

export function updateResourceRequest({ apiPath, apiVersion, params = {}, method = "PUT" }: UpdateRequestType) {
  const apiBase = apiEndpointUrl(apiVersion)
  const endpoint = apiUrl(apiPath, apiBase)

  const body = formBody(params)
  const options = {
    method: method,
    body
  }
  return request(endpoint, options)
}

type DeleteRequestType = {
  apiPath: string
  apiVersion?: string | number | undefined
  params?: any
}

export function deleteResourceRequest({ apiPath, apiVersion, params = {} }: DeleteRequestType) {
  const apiBase = apiEndpointUrl(apiVersion)
  const endpoint = apiUrl(apiPath, apiBase)
  const body = formBody(params)
  const options = {
    method: "DELETE",
    body
  }
  return request(endpoint, options)
}

export function uploadFileRequest({
  apiPath,
  apiVersion,
  params,
  customArrayValue = false,
  method = "POST"
}: {
  apiPath: string
  apiVersion: string | number
  params: ObjectLiteral
  customArrayValue?: boolean
  method?: "POST" | "PUT"
}) {
  const apiBase = apiEndpointUrl(apiVersion)
  const formData = new FormData()
  Object.entries(params).forEach(([fieldName, fieldValue]) => {
    if (fieldValue) {
      // only submit field has value
      if (Array.isArray(fieldValue)) {
        for (let i = 0; i < fieldValue.length; i += 1) {
          const element = fieldValue[i]

          if (Object.prototype.toString.call(element) === "[object Object]") {
            // format params for object type in array
            Object.entries(element).forEach(([fName, fValue]) => {
              formData.append(`${fieldName}[][${decamelize(fName)}]`, fValue as string | Blob)
            })
          } else {
            if (customArrayValue) {
              formData.append(`${fieldName}`, element)
            } else {
              // format params for primitive type in array
              formData.append(`${fieldName}[]`, element)
            }
          }
        }
      } else formData.append(decamelize(fieldName), fieldValue as string | Blob)
    }
  })
  const endpoint = apiUrl(apiPath, apiBase)
  console.log({
    endpoint
  })

  const options = {
    method,
    body: formData,
    isUpload: true
  }
  return request(endpoint, options)
}

export function downloadFileRequest({ apiPath, apiVersion, params, header }: { apiPath: string; apiVersion?: string | number; params: ObjectLiteral; header?: any }) {
  const apiBase = apiEndpointUrl(apiVersion)

  const endpoint = apiUrlQuery({
    apiPath,
    apiBase,
    params
  })
  return request(
    endpoint,
    {
      isDownloadFile: true
    },
    header
  )
}

export function patchResourceRequest({ apiPath, apiVersion, params }: { apiPath: string; apiVersion: string | number; params: ObjectLiteral; customArrayValue?: boolean }) {
  const apiBase = apiEndpointUrl(apiVersion)
  const endpoint = apiUrl(apiPath, apiBase)

  const body = formBody(params)
  const options = {
    method: "PATCH",
    body
  }
  return request(endpoint, options)
}

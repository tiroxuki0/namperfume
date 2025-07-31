import { create } from "lodash"
import { env } from "next-runtime-env"

const NEXT_PUBLIC_PROXY_PATH = env("NEXT_PUBLIC_PROXY_PATH")
const exposeUrl = env("NEXT_PUBLIC_API_URL")

const apiRootUrl = (NEXT_PUBLIC_PROXY_PATH || "").split("/v1")[0]

export const apiEndpointUrl = (version: string | number = "1", apiBase = apiRootUrl, isSSO = false) => {
  return `${isSSO ? (exposeUrl || "").split("/v1")[0] : apiBase}/v${version}`
}

// IAM LOGIN
export const ssoPath = "/saml/sso"
export const logoutPath = "/saml/logout"

//--------------------------------------------------------------------------> User portal endpoints

export const notificationsPath = "/notifications"

export const menuPath = "/pages/menu"

export const permissionsPath = "/permissions"

export const profilePath = "/profiles/profile"

export const usersPath = "/users"

export const samplePath = {
  getList: "/sample",
  getDetail: "/sample/:id",
  create: "/sample/new",
  edit: "/sample/:id/edit"
}

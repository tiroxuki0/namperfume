export const i18nNamespaces = ["common"]

export const DEFAULT_ROUTE = "/"

export const DEFAULT_DATETIME_FORMAT = "MMM DD YYYY - HH:mm:ss"
export const GLOBAL_ITEM_PAGE = 1
export const GLOBAL_ITEM_PER_PAGE = 10

export const REGEX_VALIDATE_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const REGEX_VALIDATE_DISPLAY_NAME = /^(?=.{2,})([a-zA-Z\xC0-\uFFFF]+(?:[ \-'][a-zA-Z\xC0-\uFFFF]+)*)(?: ([a-zA-Z\xC0-\uFFFF]+(?:[ \-'][a-zA-Z\xC0-\uFFFF]+)*))?$/
export const REGEX_VALIDATE_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/

export const REGEX_VALIDATE_USERNAME_FORMAT = /^[A-Za-z0-9](?:[A-Za-z0-9._-]{1,30}[A-Za-z0-9])$/

export const REGEX_VALIDATE_ROLE_NAME_FORMAT = /^[A-Za-z0-9 ]{1,64}$/
export const REGEX_VALIDATE_PHONE = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

export const DATE_FORMAT = {
  FULL: "YYYY-MM-DD HH:mm:ss", // 2025-04-11 15:30:00
  DATE_ONLY: "YYYY-MM-DD", // 2025-04-11
  TIME_ONLY: "HH:mm:ss", // 15:30:00
  SHORT_DATE: "DD/MM/YYYY", // 11/04/2025
  SHORT_DATE_DASH: "DD-MM-YYYY", // 11-04-2025
  MONTH_YEAR: "MM/YYYY", // 04/2025
  YEAR_ONLY: "YYYY", // 2025
  DISPLAY: "MMM DD YYYY - HH:mm:ss", // Apr 11 2025 - 15:30:00
  DISPLAY_12H: "MMM DD YYYY - hh:mm:ss A", // Apr 11 2025 - 03:30:00 PM
  VERBOSE: "dddd, MMMM Do YYYY, h:mm:ss A" // Friday, April 11th 2025, 3:30:00 PM
}

export const ACTION = {
  CREATE: "create",
  READ: "read",
  UPDATE: "update",
  DELETE: "delete",
  EDIT: "edit", // alias của UPDATE
  VIEW: "view", // alias của READ
  APPROVE: "approve",
  REJECT: "reject",
  ACTIVATE: "activate",
  DEACTIVATE: "deactivate",
  ARCHIVE: "archive",
  RESTORE: "restore",
  EXPORT: "export",
  IMPORT: "import",
  DOWNLOAD: "download",
  UPLOAD: "upload",
  SEARCH: "search",
  FILTER: "filter",
  SORT: "sort",
  COPY: "copy",
  PASTE: "paste",
  LOGIN: "login",
  LOGOUT: "logout",
  RESET_PASSWORD: "reset_password",
  ASSIGN: "assign",
  UNASSIGN: "unassign",
  ENABLE: "enable",
  DISABLE: "disable",
  SEND: "send",
  RECEIVE: "receive",
  SYNC: "sync",
  CANCEL: "cancel",
  CONFIRM: "confirm",
  MIGRATE: "migrate",
  RESIZE: "resize",
  STOP: "stop",
  START: "start",
  ENABLE_HA: "enable_ha",
  DISABLE_HA: "disable_ha",
  ENABLE_AUTO_RECOVERY: "enable_auto_recovery",
  DISABLE_AUTO_RECOVERY: "disable_auto_recovery",
  DEALLOCATE: "deallocate",
  POWER_OFF_GRACEFUL: "power_off_graceful",
  POWER_OFF_FORCED: "power_off_forced",
  POWER_ON: "power_on",
  ADD: "add",
  REFRESH: "refresh",
  ADD_GATEWAY_SUBNET: "add_gateway_subnet",
  DELETE_GATEWAY_SUBNET: "delete_gateway_subnet",
  FAILOVER: "failover",
  ALLOCATE: "allocate",
  CONFIG: "config",
  CHANGE_BANDWIDTH: "change_bandwidth",
  UPGRADE: "upgrade",
  SCALE_DEPLOYMENT: "scale_deployment",
  RESTART: "restart",
  RESET_TUNNEL: "reset_tunnel",
  ADD_SUBNET: "add_subnet",
  EDIT_NETWORK_POLICY: "edit_network_policy",
  EDIT_FEATURE: "edit_feature",
  UNLINK: "unlink",
  LINK: "link"
} as const

export type ActionType = (typeof ACTION)[keyof typeof ACTION]

export const REGEX_HTTP_HTTPS_URL = /^(http|https):\/\//

export const HTTP_HTTPS_ERROR_MESSAGE = "URL must be in URL format (start with http:// or https://)"

export const REGEX_WEBSOCKET_URL = /^(ws|wss):\/\//

export const WEBSOCKET_ERROR_MESSAGE = "WebSocket URL is required and must be a valid wss:// URL"

export const REGEX_VALIDATE_GENERAL = /^(?![-_\s])([a-zA-Z0-9-_\s])*[a-zA-Z0-9]$/

export const REGEX_VALIDATE_COMMON_NAME = /^[A-Za-z0-9\-_\s]+$/

export const REGEX_VALIDATE_COMMON_NAME_LOWERCASE = /^[a-z0-9\-_\s]+$/
export const REGEX_HOST_PATH = /^[a-zA-Z0-9._/][-a-zA-Z0-9._/]*[a-zA-Z0-9]$/

export const REGEX_VALIDATE_COMMON_NAME_FORMAT = /^.{0,256}$/

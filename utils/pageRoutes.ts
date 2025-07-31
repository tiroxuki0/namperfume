// Define all ui Routes
// These routes are based on /pages folder and routes.js, so if they change, this file also must be updated.
// If these Routes change, utils/pageRoutes also need to be updated.

const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  OVERVIEW: "/overview",

  ROLES: {
    LIST: "/admin/iam/roles",
    CREATE: "/admin/iam/roles/new",
    DETAIL: (id: string) => `/admin/iam/roles/${id}`
  },

  NOTIFICATIONS: {
    LIST: "/notifications"
  },

  PROFILE: {
    LIST: "/profile",
    UPDATED_PASSWORD: "/update-password"
  },

  AUDIT_LOGS: {
    LIST: "/audit_logs"
  },

  ACCOUNTS: {
    LIST: (tab: string) => `/account/${tab}`,
    CREATE: (tab: string) => `/account/${tab}/new`,
    DETAIL: (tab: string, id: string) => `/account/${tab}/${id}`,
    UPDATE: (tab: string, id: string, type = "update") => `/account/${tab}/${id}/${type}`
  },

  UN_AUTHORIZATION: {
    LIST: "/403"
  },

  TEMPLATE: {
    LIST: "/template",
    CREATE: "/template/new",
    DETAIL: (id: string) => `/template/${id}`,
    UPDATE: (id: string) => `/template/${id}/update`
  }
}
export default ROUTE

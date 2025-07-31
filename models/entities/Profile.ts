export type UserProfile = {
  id: number
  name: string
  email: string
  roleId: number
  roleName: string
  confirmedAt: string | null
  lockedAt: string | null
  createdAt: string
  updatedAt: string
  forceResetPassword: "disabled" | "enabled"
  status: "enabled" | "disabled"
  logUrl?: string
}

export type Profile = {
  user: UserProfile
}

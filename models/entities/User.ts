import { PageParams } from "@models/entities/PageParams"
import { Role } from "@models/entities/Role"

export type User = {
  uuid: string
  username: string
  state: string
  roles: Role[]
  displayName: string
  email: string
  lastLogin: string | null
  isDeleted: string | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  firstName: string
  lastName: string
  owner: boolean
  logAccess: {
    enabled: boolean
    userId: string
  }
}

export type GetUsersPayload = PageParams &
  Partial<{
    role: string
    state: string
    username: string
    displayName: string
    userGroup: string
    email: string
    uuid: string
    logAccess: boolean
  }>

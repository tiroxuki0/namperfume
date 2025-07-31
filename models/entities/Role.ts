import { PageParams } from '@models/entities/PageParams'
import { ListResponseType } from '@models/entities/ResponseType'

type RoleType = 'managed' | 'custom'

export const RoleTypes = {
  MANAGED: 'managed' as RoleType,
  CUSTOM: 'custom' as RoleType,
}
export type Role = {
  uuid: string
  name: string
  state: string
  default: boolean
  assignedUserNumber: number | null
  description: number | null
  isDeleted: number | null
  createdAt: string | null
  updatedAt: string | null
  deletedAt: string | null
  title: string
  roleType?: string
  audienceType?: string
}
export type GetRolesPayload = PageParams &
  Partial<{
    default: boolean
    name: string
    state: string
    user: string
    audienceType: string
    roleType: string
    userGroup: string
  }>

export type Feature = {
  name: string
  permissions: string[]
  displayName: string
  id: string
  children: Feature[]
}

export type DetailRole = Role & {
  assignedUsers: {
    id: string
    username: string
  }[]
  featurePermissions: Feature[]
}

export type GroupFeature = {
  id: string
  name: string
  permissions: string[]
  displayName: string
  children: GroupFeature[]
}

export type ListResponseFeatures = ListResponseType<GroupFeature>

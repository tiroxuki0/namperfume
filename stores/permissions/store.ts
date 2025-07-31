import { create } from "zustand"

import { Permissions } from "@models/entities/Permission"

type Store = {
  permissions: Permissions | null
  isLoading: boolean
  status: string
  setPermissionsStore: ({
    permissions,
    isLoading,
    status
  }: {
    permissions?: Permissions
    isLoading: boolean
    status: string
  }) => void
}

export const usePermissionsStore = create<Store>()(set => ({
  permissions: null,
  isLoading: false,
  status: "idle",
  setPermissionsStore: ({
    permissions,
    isLoading,
    status
  }: {
    permissions?: Permissions
    isLoading: boolean
    status: string
  }) => set(() => ({ permissions: permissions, isLoading, status }))
}))

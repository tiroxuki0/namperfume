import { useEffect } from "react"
import { useGetCurrentPermission } from "@root/queries/useGetCurrentPermission"
import { usePermissionsStore } from "@root/stores/permissions/store"

export const useInitBaseConfig = () => {
  useSetupPermission()
}

const useSetupPermission = () => {
  const { permissions, isFetching, status } = useGetCurrentPermission()

  const { setPermissionsStore } = usePermissionsStore()

  useEffect(() => {
    setPermissionsStore({
      permissions: permissions || undefined,
      isLoading: isFetching,
      status
    })
  }, [permissions, isFetching, status, setPermissionsStore])
}

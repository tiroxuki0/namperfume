import { useProfileStore } from '@root/stores/profile/store'
import { usePermissionsStore } from '@root/stores/permissions/store'

export function useUserSession() {
  const { profileState } = useProfileStore()

  const { permissions, isLoading, status } = usePermissionsStore()

  const user = profileState?.user

  return { user, permissions, isLoading, status }
}

import { get } from 'lodash'
import { useUserSession } from './useUserSession' // Assuming the above hook

export function usePermissions(requiredPermission?: string | string[]) {
  const { permissions, isLoading: isUserLoading, status } = useUserSession()

  const checkPermission = (requiredPermission: string | string[]) => {
    if (
      !requiredPermission ||
      (Array.isArray(requiredPermission) && requiredPermission.length === 0) ||
      requiredPermission === ''
    ) {
      return true
    }
    let hasPermission = false
    if (typeof requiredPermission === 'string') {
      hasPermission = !!get(permissions, requiredPermission)
    } else if (Array.isArray(requiredPermission)) {
      hasPermission = (requiredPermission as string[]).some((pm: string) => !!get(permissions, pm))
    }

    return hasPermission
  }

  if (isUserLoading) {
    return { isAllowed: true, isLoading: true, checkPermission, status }
  }

  if (
    !requiredPermission ||
    (Array.isArray(requiredPermission) && requiredPermission.length === 0) ||
    requiredPermission === ''
  ) {
    return { isAllowed: true, isLoading: false, checkPermission, status }
  }

  let hasPermission = false
  if (typeof requiredPermission === 'string') {
    hasPermission = !!get(permissions, requiredPermission)
  } else if (Array.isArray(requiredPermission)) {
    hasPermission = requiredPermission.some((pm) => !!get(permissions, pm))
  }

  return { isAllowed: hasPermission, isLoading: false, checkPermission, status }
}

import { useRouter } from 'next/navigation'
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react'
import { useUserSession } from '@root/hooks/useUserSession'
import { usePermissions } from '@root/hooks/usePermissions'
import { Spin } from 'antd'

export type ProtectedRouteProps = {
  permission?: string | string[]
  empty?: ReactNode
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = (props) => {
  const { children, permission: requiredPermission, empty } = props

  const { permissions, isLoading: isUserLoading, status } = useUserSession() // Hook 1

  const { isAllowed, isLoading: isPermissionsLoading } = usePermissions(requiredPermission) // Hook 2

  const router = useRouter()

  useEffect(() => {
    if (isUserLoading || isPermissionsLoading || !permissions) return // Wait for data

    if (requiredPermission === '' || typeof requiredPermission === 'undefined') return

    if (!isAllowed && !empty) {
      router.push('/403')
    }
  }, [
    isAllowed,
    requiredPermission,
    permissions,
    empty,
    router,
    isUserLoading,
    isPermissionsLoading,
  ])

  // TODO: at status for reproduce weirdo bug

  if (status === 'error') {
    return null
  }

  // Optional: Add a loading state display
  if (isUserLoading || (requiredPermission && isPermissionsLoading)) {
    return <Spin spinning>{children}</Spin> // Or a spinner component
  }

  if (!isAllowed && permissions && !!empty) {
    return <>{empty}</>
  }

  if (!isAllowed && permissions && !empty && requiredPermission && requiredPermission !== '') {
    // This case should be handled by the redirect, but as a fallback,
    // you might render null or a generic "not authorized" message
    // if you want to prevent children from rendering before redirect effect runs.
    return null
  }

  // Only render children if allowed, or if no specific permission was required
  if (isAllowed || (!requiredPermission && requiredPermission !== '')) {
    return <>{children}</>
  }

  // Fallback if not allowed, no empty state, and redirect hasn't happened yet
  // (usually means requiredPermission was defined but check failed)
  return null
}

export default ProtectedRoute

import { useQuery } from "@tanstack/react-query"

import { getRequest } from "@utils/request"
import { permissionsPath } from "@utils/apiEndpoint"
import { ResponseType } from "@models/entities/ResponseType"
import { Permissions } from "@models/entities/Permission"

const getCurrentPermission = async () => {
  return (await getRequest({
    apiVersion: 4,
    apiPath: permissionsPath,
    params: {
      current_permission: true
    }
  })) as ResponseType<{
    permissions: Permissions
  }>
}

export const useGetCurrentPermission = () => {
  const query = useQuery({
    queryKey: ["get-current-permission"],
    queryFn: getCurrentPermission,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity
  })

  return {
    ...query,
    permissions: query?.data?.data?.permissions
  }
}

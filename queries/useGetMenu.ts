import { getRequest } from "@utils/request"
import { menuPath } from "@utils/apiEndpoint"
import { useQuery } from "@tanstack/react-query"
import { Menu } from "@models/entities/Menu"

const getMenu = async () => {
  return (await getRequest({
    apiPath: menuPath,
    apiVersion: 3,
    params: {}
  })) as Menu[]
}

const isValidMenu = (menu: unknown) => {
  return Array.isArray(menu) && typeof menu === "object"
}

export const useGetMenu = () => {
  const query = useQuery({
    queryKey: ["get-menu-query-keys"],
    queryFn: () => getMenu(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  return {
    ...query,
    menu: isValidMenu(query?.data) ? query?.data : []
  }
}

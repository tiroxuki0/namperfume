import { getRequest } from "@utils/request"
import { usersPath } from "@utils/apiEndpoint"
import { ResponseType } from "@models/entities/ResponseType"
import { useQuery } from "@tanstack/react-query"
import { User } from "@models/entities/User"

const getUser = async (uuid: string) => {
  return (await getRequest({
    apiPath: `${usersPath}/${uuid}`,
    apiVersion: 4,
    params: {}
  })) as ResponseType<User>
}

export const useGetUser = (uuid: string) => {
  const query = useQuery({
    queryKey: ["get-details-users", uuid],
    queryFn: () => getUser(uuid),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!uuid
  })

  return {
    ...query,
    user: query?.data?.data
  }
}

import { useQuery } from "@tanstack/react-query"

import { pickBy } from "lodash"

import { getRequest } from "@utils/request"
import { usersPath } from "@utils/apiEndpoint"
import { ListResponseType } from "@models/entities/ResponseType"
import { initialMeta } from "@models/entities/Meta"

import { GetUsersPayload, User } from "@models/entities/User"

const getUsers = async (payload: GetUsersPayload) => {
  return (await getRequest({
    apiPath: usersPath,
    apiVersion: 4,
    params: pickBy(
      {
        ...payload
      },
      v => v !== ""
    )
  })) as ListResponseType<User>
}

export const useGetUsers = (payload: GetUsersPayload) => {
  const keys = JSON.stringify(payload)
  const query = useQuery({
    queryKey: ["get-users-key", keys],
    queryFn: () => getUsers(payload),
    retry: false,
    refetchOnWindowFocus: false
  })

  return {
    ...query,
    users: query?.data?.data || [],
    meta: query?.data?.meta || initialMeta
  }
}

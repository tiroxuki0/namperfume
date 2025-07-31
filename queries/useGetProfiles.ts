import { getRequest } from "@utils/request"
import { useQuery } from "@tanstack/react-query"
import { Profile } from "@models/entities/Profile"
import { profilePath } from "@utils/apiEndpoint"

const getProfiles = async () => {
  return (await getRequest({
    apiPath: profilePath,
    params: {}
  })) as Profile
}

export const useGetProfiles = () => {
  const query = useQuery({
    queryKey: ["get-profiles-query-key"],
    queryFn: getProfiles,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })

  return {
    ...query,
    profile: query?.data
  }
}

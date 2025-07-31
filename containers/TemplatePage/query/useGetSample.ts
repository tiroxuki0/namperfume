import { useQuery } from "@tanstack/react-query"

import { getRequest } from "@utils/request"
import { SampleResponse } from "@containers/TemplatePage/types"

const getSample = async (uuid?: string) => {
  if (!uuid) throw new Error("UUID is required")
  return (await getRequest({
    // apiPath will be got from the config file named utils/apiEndpoint.ts
    apiPath: `/template/${uuid}`,
    apiVersion: 2,
    params: {}
  })) as SampleResponse
}

export const useGetSample = (uuid?: string) => {
  const query = useQuery({
    queryKey: ["get-sample-query-key", uuid],
    queryFn: () => getSample(uuid || ""),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!uuid
  })

  return {
    ...query,
    sample: query?.data?.data
  }
}

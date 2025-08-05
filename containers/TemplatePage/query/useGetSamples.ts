import { useQuery } from "@tanstack/react-query"

import { identity, pickBy } from "lodash"

import { getRequest } from "@utils/request"
import { initialMeta } from "@models/entities/Meta"

import { GetSamplePayload, SampleListResponse } from "@containers/TemplatePage/types"

const getSamples = async (payload: GetSamplePayload) => {
  return (await getRequest({
    // apiPath will be got from the config file named utils/apiEndpoint.ts
    apiPath: "/template",
    apiVersion: 2,
    params: pickBy(
      {
        ...payload
      },
      identity
    )
  })) as SampleListResponse
}

export const useGetSamples = (payload: GetSamplePayload) => {
  const keys = JSON.stringify(payload)
  const query = useQuery({
    queryKey: ["get-samples-query-key", keys],
    queryFn: () => getSamples(payload),
    retry: false,
    refetchOnWindowFocus: false
  })

  return {
    ...query,
    samples: query?.data?.data || [],
    meta: query?.data?.meta || initialMeta
  }
}

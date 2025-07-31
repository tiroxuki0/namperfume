import { useMutation } from "@tanstack/react-query"

import { createResourceRequest } from "@utils/request"
import { CreateSamplePayload } from "@containers/TemplatePage/types"

export const createSample = async (payload: CreateSamplePayload) => {
  return createResourceRequest({
    // apiPath will be got from the config file named utils/apiEndpoint.ts
    apiPath: "/template",
    apiVersion: 2,
    params: {
      ...payload
    }
  })
}

export const useCreateSample = () => {
  const mutate = useMutation({
    mutationFn: createSample
  })

  return {
    create: mutate.mutate,
    isCreating: mutate.isPending
  }
}

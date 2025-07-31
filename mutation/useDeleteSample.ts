import { deleteResourceRequest } from "@utils/request"
import { useMutation } from "@tanstack/react-query"
import { DeleteResponse } from "@models/entities/DeleteResponse"

export const deleteSample = async (ids: string[]) => {
  return (await Promise.allSettled(
    ids.map((id) =>
      // apiPath will be got from the config file named utils/apiEndpoint.ts
      deleteResourceRequest({
        apiPath: `/template/${id}`,
        apiVersion: 2,
        params: {}
      })
    )
  )) as DeleteResponse
}

export const useDeleteSample = () => {
  const mutate = useMutation({
    mutationFn: deleteSample
  })

  return {
    remove: mutate.mutate,
    isDeleting: mutate.isPending
  }
}

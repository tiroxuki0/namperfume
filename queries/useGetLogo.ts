import { getRequest } from '@utils/request'
import { useQuery } from '@tanstack/react-query'

interface Logo {
  name: string
  url: string
}

const getLogo = async () => {
  return (await getRequest({
    apiPath: `/logos/latest`,
    params: {},
  })) as Logo
}

export const useGetLogo = () => {
  const query = useQuery({
    queryKey: ['get-logo'],
    queryFn: () => getLogo(),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return {
    ...query,
    logo: query?.data,
  }
}

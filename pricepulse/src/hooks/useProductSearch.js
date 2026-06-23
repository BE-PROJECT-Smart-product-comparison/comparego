import { useQuery } from '@tanstack/react-query'
import { productApi } from '../api/productApi'

export function useProductSearch(query) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => productApi.search(query),
    enabled: !!query && query.trim().length > 1,
    staleTime: 30000,
  })
}

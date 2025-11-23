import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../queryKeys';

export function useGetSavingsProducts() {
  return useQuery(queryKeys.savings.list());
}

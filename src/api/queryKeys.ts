import { http } from 'tosslib';

import { SavingsProductsResponse } from './types';

export const queryKeys = {
  savings: {
    list: () => ({
      queryKey: ['savings-products'] as const,
      queryFn: () => http.get<SavingsProductsResponse>('/api/savings-products'),
    }),
  },
};

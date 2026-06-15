import type { Pagination } from '@/pagination';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (pagination: Pagination) => [...productKeys.lists(), pagination] as const,
  delete: () => [...productKeys.all, 'delete'] as const,
};

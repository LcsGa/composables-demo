import type { Pagination } from '@/pagination';

export const PRODUCTS = 'products';

export const productKeys = {
  list: (pagination: Pagination) => [PRODUCTS, 'list', pagination] as const,
};

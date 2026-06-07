import { usePagination } from '@/pagination/use-pagination';
import { ProductRepository } from '@/product/products-repository';
import { inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

export function useProductStore() {
  const repo = inject(ProductRepository);
  const pagination = usePagination();

  const products = rxResource({
    params: pagination.value,
    stream: ({ params: pagination }) => repo.getAll(pagination),
  });

  return { products, pagination };
}

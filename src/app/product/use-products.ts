import { usePagination } from '@/pagination/use-pagination';
import { productKeys } from '@/product/product-keys';
import { ProductRepository } from '@/product/products-repository';
import { inject } from '@angular/core';
import { injectQuery, keepPreviousData } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export function useProducts() {
  const repo = inject(ProductRepository);
  const pagination = usePagination();

  const products = injectQuery(() => {
    const paginationVal = pagination.value();
    return {
      queryKey: productKeys.list(paginationVal),
      queryFn: () => lastValueFrom(repo.getAll(paginationVal)),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000, // 5 min
    };
  });

  return { ...products, pagination };
}

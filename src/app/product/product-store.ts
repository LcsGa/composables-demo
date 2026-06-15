import { usePagination } from '@/pagination/use-pagination';
import type { Product } from '@/product';
import { productKeys } from '@/product/product-keys';
import { ProductRepository } from '@/product/products-repository';
import { inject, InjectionToken } from '@angular/core';
import {
  injectMutation,
  injectMutationState,
  injectQuery,
  keepPreviousData,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const ProductStore = new InjectionToken<ReturnType<typeof useProductStore>>('ProductStore');

export function useProductStore() {
  const repo = inject(ProductRepository);
  const pagination = usePagination();
  const queryClient = inject(QueryClient);

  const products = injectQuery(() => {
    const paginationVal = pagination.value();
    return {
      queryKey: productKeys.list(paginationVal),
      queryFn: () => lastValueFrom(repo.getAll(paginationVal)),
      placeholderData: keepPreviousData,
      staleTime: 5 * 60 * 1000, // 5 min
    };
  });

  const addProduct = injectMutation(() => ({
    mutationFn: (product: Omit<Product, 'id'>) => lastValueFrom(repo.addOne(product)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
  }));

  const deleteProduct = injectMutation(() => ({
    mutationKey: productKeys.delete(),
    mutationFn: (id: Product['id']) => lastValueFrom(repo.deleteOne(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
  }));

  const deletingProductIds = injectMutationState(() => ({
    filters: {
      mutationKey: productKeys.delete(),
      status: 'pending',
    },
    select: ({ state }) => state.variables as ReturnType<typeof deleteProduct.variables>,
  }));

  return { products, pagination, addProduct, deleteProduct, deletingProductIds };
}

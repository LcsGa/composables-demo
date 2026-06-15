import type { Product } from '@/product';
import { productKeys } from '@/product/product-keys';
import { ProductRepository } from '@/product/products-repository';
import { inject } from '@angular/core';
import { QueryClient, injectMutation } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export function useDeleteProduct() {
  const repo = inject(ProductRepository);
  const queryClient = inject(QueryClient);

  return injectMutation(() => ({
    mutationKey: productKeys.delete(),
    mutationFn: (id: Product['id']) => lastValueFrom(repo.deleteOne(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
  }));
}

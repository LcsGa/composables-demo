import type { Pagination } from '@/pagination';
import type { ProductsList } from '@/product';
import { PRODUCTS_STUB } from '@/product/products-stub';
import { Service } from '@angular/core';
import { delay, of } from 'rxjs';

@Service({ autoProvided: true })
export class ProductRepository {
  private readonly fakeNetworkDelay = 500;
  private products = PRODUCTS_STUB;

  getAll(pagination?: Pagination) {
    return of(this.#buildProductsList(pagination)).pipe(delay(this.fakeNetworkDelay));
  }

  #buildProductsList(pagination: Pagination = { limit: 30, skip: 0 }): ProductsList {
    return {
      ...pagination,
      products: this.products.slice(pagination.skip, pagination.skip + pagination.limit),
      total: this.products.length,
    };
  }
}

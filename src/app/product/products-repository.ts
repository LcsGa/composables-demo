import type { Pagination } from '@/pagination';
import type { Product, ProductsList } from '@/product';
import { PRODUCTS_STUB } from '@/product/products-stub';
import { Service } from '@angular/core';
import { delay, map, of, tap } from 'rxjs';

@Service({ autoProvided: true })
export class ProductRepository {
  private readonly fakeNetworkDelay = 500;
  private products = PRODUCTS_STUB;

  getAll(pagination?: Pagination) {
    return of(this.#buildProductsList(pagination)).pipe(delay(this.fakeNetworkDelay));
  }

  addOne(newProduct: Omit<Product, 'id'>) {
    const newId = (this.products.at(-1)?.id ?? 0) + 1;
    return of({ ...newProduct, id: newId }).pipe(
      delay(this.fakeNetworkDelay),
      map((addedProduct) => this.products.push(addedProduct)),
    );
  }

  deleteOne(id: Product['id']) {
    return of(null).pipe(
      delay(this.fakeNetworkDelay),
      tap(() => (this.products = this.products.filter(({ id: productId }) => productId !== id))),
    );
  }

  #buildProductsList(pagination: Pagination = { limit: 30, skip: 0 }): ProductsList {
    return {
      ...pagination,
      products: this.products.slice(pagination.skip, pagination.skip + pagination.limit),
      total: this.products.length,
    };
  }
}

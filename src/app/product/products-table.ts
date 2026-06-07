import { Paginator } from '@/pagination/paginator';
import { useProductStore } from '@/product/product-store';
import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products-table',
  imports: [CurrencyPipe, Paginator],
  template: `
    @let cols = ['Product', 'Category', 'Price', 'Stock'];
    @let products = productStore.products;

    <table class="ui-table">
      <thead>
        <tr>
          @for (col of cols; track col) {
            <th>{{ col }}</th>
          }
        </tr>
      </thead>

      <tbody>
        @if (products.isFetching() && !products.isPending()) {
          <div class="overlay" aria-busy="true"></div>
        }
        @for (product of products.data()?.products; track product.id) {
          <tr>
            <td>
              @if (product.brand) {
                <small>{{ product.brand }}</small>
              }
              <p>{{ product.title }}</p>
            </td>

            <td>
              <span class="ui-chip">{{ product.category }}</span>
            </td>

            <td>{{ product.price | currency }}</td>

            <td>{{ product.stock }}</td>
          </tr>
        } @empty {
          <tr>
            <td [attr.colspan]="cols.length">
              @if (products.error()) {
                <div>
                  Oops, something went wrong!

                  <button (click)="products.refetch()">Retry</button>
                </div>
              } @else if (products.isPending()) {
                Loading...
              } @else {
                No product found
              }
            </td>
          </tr>
        }
      </tbody>

      <tfoot>
        <tr>
          <td [attr.colspan]="cols.length">
            @let pagination = productStore.pagination;

            <app-paginator
              [(page)]="pagination.page"
              [(size)]="pagination.size"
              [total]="products.data()?.total ?? 0"
            />
          </td>
        </tr>
      </tfoot>
    </table>
  `,
})
export class ProductsTable {
  protected readonly productStore = useProductStore();
}

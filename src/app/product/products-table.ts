import { Paginator } from '@/pagination/paginator';
import { ProductStore } from '@/product/product-store';
import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DeleteProductButton } from './delete-product-button';

@Component({
  selector: 'app-products-table',
  imports: [CurrencyPipe, Paginator, DeleteProductButton],
  styles: `
    .title {
      margin: 0;
    }
  `,
  template: `
    @let cols = ['Product', 'Category', 'Price', 'Stock', ''];
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
            <td class="ui-hgroup">
              <p class="ui-p">{{ product.brand }}</p>
              <p class="ui-h2 title">{{ product.title }}</p>
            </td>

            <td>
              <span class="ui-chip">{{ product.category }}</span>
            </td>

            <td>{{ product.price | currency }}</td>

            <td>{{ product.stock }}</td>

            <td tuiTd>
              <app-delete-product-button [product]="product" />
            </td>
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
  protected readonly productStore = inject(ProductStore);
}

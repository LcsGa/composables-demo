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
        @if (products.hasValue()) {
          @for (product of products.value().products; track product.id) {
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
          }
        } @else {
          <tr>
            <td [attr.colspan]="cols.length">
              @if (products.error()) {
                <div>
                  Oops, something went wrong!

                  <button (click)="products.reload()">Retry</button>
                </div>
              } @else if (products.isLoading()) {
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
              [total]="products.hasValue() ? products.value().total : 0"
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

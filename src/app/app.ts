import { ProductsTable } from '@/product/products-table';
import { Component } from '@angular/core';
import { AddProductButton } from './product/add-product-button';

@Component({
  selector: 'app-root',
  imports: [ProductsTable, AddProductButton],
  styles: `
    :host {
      > :where(header, main) {
        padding-inline: var(--size-3);
      }

      > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  `,
  template: `
    <header>
      <h1>Products</h1>

      <app-add-product-button />
    </header>

    <main>
      <app-products-table />
    </main>
  `,
})
export class App {}

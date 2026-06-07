import { Component } from '@angular/core';
import { ProductsTable } from './product/products-table';

@Component({
  selector: 'app-root',
  imports: [ProductsTable],
  styles: `
    :host > :where(header, main) {
      padding-inline: var(--size-3);
    }
  `,
  template: `
    <header>
      <h1>Products</h1>
    </header>

    <main>
      <app-products-table />
    </main>
  `,
})
export class App {}

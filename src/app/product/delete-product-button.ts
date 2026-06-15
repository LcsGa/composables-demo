import type { Product } from '@/product';
import { useDeleteProduct } from '@/product/use-delete-product';
import { Component, input } from '@angular/core';
import { LucideTrash } from '@lucide/angular';

@Component({
  selector: 'app-delete-product-button',
  imports: [LucideTrash],
  template: `
    <button
      class="ui-button ui-small ui-critical"
      aria-label="Delete Product"
      [disabled]="deleteProduct.isPending()"
      [aria-busy]="deleteProduct.isPending()"
      (click)="deleteProduct.mutateAsync(this.product().id)"
    >
      @if (!deleteProduct.isPending()) {
        <svg lucideTrash></svg>
      }
    </button>
  `,
})
export class DeleteProductButton {
  readonly product = input.required<Product>();
  protected readonly deleteProduct = useDeleteProduct();
}

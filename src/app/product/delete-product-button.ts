import type { Product } from '@/product';
import { ProductStore } from '@/product/product-store';
import { Component, computed, inject, input } from '@angular/core';
import { LucideTrash } from '@lucide/angular';

@Component({
  selector: 'app-delete-product-button',
  imports: [LucideTrash],
  template: `
    <button
      class="ui-button ui-small ui-critical"
      aria-label="Delete Product"
      [disabled]="isDeleting()"
      [aria-busy]="isDeleting()"
      (click)="productStore.deleteProduct.mutateAsync(this.product().id)"
    >
      @if (!isDeleting()) {
        <svg lucideTrash></svg>
      }
    </button>
  `,
})
export class DeleteProductButton {
  protected readonly productStore = inject(ProductStore);

  readonly product = input.required<Product>();

  protected readonly isDeleting = computed(() =>
    this.productStore.deletingProductIds().includes(this.product().id),
  );
}

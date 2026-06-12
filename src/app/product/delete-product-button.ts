import type { Product } from '@/product';
import { ProductStore } from '@/product/product-store';
import { Component, computed, inject, input, viewChild, type ElementRef } from '@angular/core';
import { LucideTrash } from '@lucide/angular';

@Component({
  selector: 'app-delete-product-button',
  imports: [LucideTrash],
  template: `
    @let isDeleting = productStore.deleteProduct.isPending();

    <button
      class="ui-icon-button ui-small ui-critical"
      aria-label="Delete Product"
      command="show-modal"
      [attr.commandfor]="dialogId()"
    >
      <svg lucideTrash></svg>
    </button>

    <dialog
      #dialog
      [id]="dialogId()"
      class="ui-dialog ui-card"
      [attr.closedby]="isDeleting ? 'none' : 'any'"
    >
      <hgroup>
        <p class="ui-h3">Confirm delete</p>
      </hgroup>

      <p class="ui-content">Are you sure you want to delete this product?</p>

      <div class="ui-actions">
        <button
          class="ui-button"
          command="close"
          [attr.commandfor]="dialogId()"
          [disabled]="isDeleting"
        >
          Cancel
        </button>

        <button
          class="ui-button ui-critical ui-filled"
          [aria-busy]="isDeleting"
          [disabled]="isDeleting"
          (click)="deleteProduct()"
        >
          Delete
        </button>
      </div>
    </dialog>
  `,
})
export class DeleteProductButton {
  protected readonly productStore = inject(ProductStore);

  readonly product = input.required<Product>();

  protected readonly dialogId = computed(() => `delete-product-${this.product().id}`);

  protected readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected async deleteProduct() {
    await this.productStore.deleteProduct.mutateAsync(this.product().id);
    this.dialog().nativeElement.close();
  }
}

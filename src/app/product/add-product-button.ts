import type { CreateProduct } from '@/product';
import { useAddProduct } from '@/product/use-add-product';
import { Component, signal, viewChild, type ElementRef } from '@angular/core';
import { form, FormField, FormRoot, min, required } from '@angular/forms/signals';
import { LucidePlus } from '@lucide/angular';

@Component({
  selector: 'app-add-product-button',
  imports: [LucidePlus, FormRoot, FormField],
  template: `
    <button class="ui-button" command="show-modal" commandfor="add-product-dialog">
      <svg lucidePlus></svg>
      Add Product
    </button>

    <dialog #dialog id="add-product-dialog" class="ui-dialog ui-card" closedby="none">
      <hgroup>
        <p class="ui-h2">Add Product</p>
      </hgroup>

      <form id="add-product-form" class="ui-content ui-form" [formRoot]="form">
        <div class="ui-field-group" role="group">
          <label class="ui-text-field">
            <span class="ui-label">Brand</span>

            <span class="ui-field">
              <input [formField]="form.brand" />
            </span>
          </label>

          <label class="ui-text-field">
            <span class="ui-label">Title</span>

            <span class="ui-field">
              <input [formField]="form.title" />
            </span>
          </label>

          <label class="ui-text-field">
            <span class="ui-label">Category</span>

            <span class="ui-field">
              <input [formField]="form.category" />
            </span>
          </label>

          <label class="ui-text-field">
            <span class="ui-label">Price</span>

            <span class="ui-field">
              <input type="number" [formField]="form.price" />
              <span class="ui-prefix">$</span>
              <span class="ui-suffix">USD</span>
            </span>
          </label>

          <label class="ui-text-field">
            <span class="ui-label">Stock</span>

            <span class="ui-field">
              <input type="number" [formField]="form.stock" />
            </span>
          </label>
        </div>
      </form>

      <div class="ui-actions">
        <button class="ui-button" command="close" commandfor="add-product-dialog" (click)="reset()">
          Cancel
        </button>

        <button
          class="ui-button ui-primary"
          type="submit"
          form="add-product-form"
          [aria-busy]="form().submitting()"
        >
          Add Product
        </button>
      </div>
    </dialog>
  `,
})
export class AddProductButton {
  private readonly DEFAULT_MODEL = {
    brand: '',
    title: '',
    category: '',
    price: 0,
    stock: 0,
  } satisfies CreateProduct;

  protected readonly addProduct = useAddProduct();

  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  private readonly productModel = signal(this.DEFAULT_MODEL);

  protected readonly form = form(
    this.productModel,
    (schema) => {
      required(schema.title);

      required(schema.category);

      required(schema.price);
      min(schema.price, 0);

      required(schema.stock);
      min(schema.stock, 0);
    },
    {
      submission: {
        action: async (form) => {
          await this.addProduct.mutateAsync(form().value());
          this.dialog().nativeElement.close();
          this.reset();
        },
      },
    },
  );

  protected reset() {
    this.form().reset();
    this.productModel.set(this.DEFAULT_MODEL);
  }
}

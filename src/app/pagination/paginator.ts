import { usePaginator } from '@/pagination/use-paginator';
import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
} from '@lucide/angular';

@Component({
  selector: 'app-paginator',
  imports: [
    LucideChevronLeft,
    LucideChevronsLeft,
    LucideChevronRight,
    LucideChevronsRight,
    FormsModule,
  ],
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: var(--size-2);
    }

    .description {
      padding-inline: var(--size-2);
    }

    .ui-select {
      margin-inline-start: var(--size-3);
    }
  `,
  template: `
    <button
      class="ui-icon-button"
      aria-label="First page"
      (click)="paginator.goFirst()"
      [disabled]="!paginator.canGoPrev()"
    >
      <svg lucideChevronsLeft></svg>
    </button>

    <button
      class="ui-icon-button"
      aria-label="Previous page"
      (click)="paginator.goPrev()"
      [disabled]="!paginator.canGoPrev()"
    >
      <svg lucideChevronLeft></svg>
    </button>

    <span class="description">
      Showing {{ paginator.firstItem() }} to {{ paginator.lastItem() }} of {{ total() }}
    </span>

    <button
      class="ui-icon-button"
      aria-label="Next page"
      (click)="paginator.goNext()"
      [disabled]="!paginator.canGoNext()"
    >
      <svg lucideChevronRight></svg>
    </button>

    <button
      class="ui-icon-button"
      aria-label="Last page"
      (click)="paginator.goLast()"
      [disabled]="!paginator.canGoNext()"
    >
      <svg lucideChevronsRight></svg>
    </button>

    <label class="ui-select ui-small">
      <span class="ui-field">
        <select [ngModel]="size()" (ngModelChange)="size.set(Number($event))">
          <button>
            <selectedcontent></selectedcontent>
          </button>

          <div class="ui-list">
            @for (size of [10, 20, 50, 100]; track size) {
              <option [value]="size">{{ size }}</option>
            }
          </div>
        </select>
      </span>
    </label>
  `,
})
export class Paginator {
  protected Number = Number;

  readonly page = model(0);
  readonly size = model(0);
  readonly total = input(0);

  protected readonly paginator = usePaginator({
    page: this.page,
    size: this.size,
    total: this.total,
  });
}

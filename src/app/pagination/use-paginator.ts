import { computed, type WritableSignal } from '@angular/core';
import { toValue, type MaybeSignal } from '@signality/core';

type PaginatorConfig = {
  page: WritableSignal<number>;
  size: WritableSignal<number>;
  total: MaybeSignal<number>;
};

export function usePaginator({ page, size, total }: PaginatorConfig) {
  const lastPage = computed(() => Math.ceil(toValue(total) / size()) - 1);

  const firstItem = computed(() => page() * size() + 1);

  const lastItem = computed(() => Math.min(toValue(total), firstItem() + size() - 1));

  const canGoPrev = computed(() => page() > 0);

  const canGoNext = computed(() => page() < lastPage());

  function goFirst() {
    page.set(0);
  }

  function goPrev() {
    page.update((currPage) => Math.max(0, currPage - 1));
  }

  function goNext() {
    page.update((currPage) => Math.min(lastPage(), currPage + 1));
  }

  function goLast() {
    page.set(lastPage());
  }

  return {
    firstItem,
    lastItem,
    canGoPrev,
    canGoNext,
    goFirst,
    goPrev,
    goNext,
    goLast,
  };
}

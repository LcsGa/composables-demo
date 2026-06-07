import type { Pagination } from '@/pagination';
import { computed, signal } from '@angular/core';

export function usePagination() {
  const page = signal(0);
  const size = signal(10);

  const pagination = computed((): Pagination => {
    const limit = size();
    const skip = page() * limit;
    return { limit, skip };
  });

  return { value: pagination, page, size };
}

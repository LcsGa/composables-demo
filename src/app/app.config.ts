import type { ApplicationConfig } from '@angular/core';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideTanStackQuery(new QueryClient(), withDevtools())],
};

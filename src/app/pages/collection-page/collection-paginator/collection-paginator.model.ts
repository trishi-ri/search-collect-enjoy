import { PageEvent } from '@angular/material/paginator';

export interface ICollectionPaginator {
  pagination: PageEvent;
  pageSizeOptions: number[];
}

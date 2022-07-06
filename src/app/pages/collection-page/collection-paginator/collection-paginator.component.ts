import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CollectionService } from '../collection.service';
import { ICollectionPaginator } from './collection-paginator.model';

@Component({
  selector: 'app-collection-paginator',
  templateUrl: './collection-paginator.component.html',
  styleUrls: ['./collection-paginator.component.scss'],
})
export class CollectionPaginatorComponent {
  public paginator: ICollectionPaginator = this.collectionService.paginator;

  constructor(private collectionService: CollectionService) {}

  public onPageChanged(pageEvent: PageEvent): void {
    this.collectionService.changePage(pageEvent);
  }
}

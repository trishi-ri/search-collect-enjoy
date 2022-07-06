import { Component } from '@angular/core';
import { CollectionService } from '../collection.service';
import {
  ICollectionFilter,
  CollectionFilterEnum,
} from './collection-filter.model';

@Component({
  selector: 'app-collection-filter',
  templateUrl: './collection-filter.component.html',
  styleUrls: ['./collection-filter.component.scss'],
})
export class CollectionFilterComponent {
  readonly filter: ICollectionFilter = this.collectionService.filter;

  constructor(private collectionService: CollectionService) {}

  public onFilterChange(value: CollectionFilterEnum) {
    this.collectionService.updateFilter(value);
  }
}

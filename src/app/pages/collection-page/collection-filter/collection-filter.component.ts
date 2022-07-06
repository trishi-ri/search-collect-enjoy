import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICollectionConfig } from 'src/app/initialize/config.service';
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
export class CollectionFilterComponent implements OnInit {
  readonly filter: ICollectionFilter = this.collectionService.filter;

  constructor(private collectionService: CollectionService) {}

  ngOnInit(): void {}

  onFilterChange(value: CollectionFilterEnum) {
    this.collectionService.updateFilter(value);
  }
}

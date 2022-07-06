import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { NotificationService } from 'src/app/initialize/notification.service';
import {
  CollectionElement,
  ICollectionElement,
} from './collection-element/collection-element.model';
import { CollectionService } from './collection.service';
import {
  CollectionFilterEnum,
  IFilterOption,
} from './collection-filter/collection-filter.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent {
  elements: Observable<ICollectionElement[]> = this.collectionService.elements;
  config = this.collectionService.config;

  constructor(private collectionService: CollectionService) {}

  updateFilter(value: CollectionFilterEnum): void {
    this.collectionService.updateFilter(value);
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.collectionService.changePage(pageEvent);
  }
}

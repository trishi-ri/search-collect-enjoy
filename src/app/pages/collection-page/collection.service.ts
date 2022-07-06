import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  CollectionElement,
  ICollectionElement,
} from './collection-element/collection-element.model';
import {
  ICollectionFilter,
  CollectionFilterEnum,
} from './collection-filter/collection-filter.model';
import { ICollectionConfig } from '../../initialize/config.service';
import { PageEvent } from '@angular/material/paginator';
import { CollectionGenerator } from './collection-generator.service';
import { Collection } from './collection.model';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private readonly storageKey = 'collection';
  private collection: Collection = new Collection();
  private _elements = new BehaviorSubject<ICollectionElement[]>([]);
  config!: ICollectionConfig;

  constructor(private generator: CollectionGenerator) {}

  init(config: ICollectionConfig): void {
    this.config = config;
    this.collection =
      this.getCollectionFromStorage() ?? this.generator.generate();
    this._elements.next(this.collection.elements);
  }

  get pagination(): PageEvent {
    return this.config.pagination;
  }

  get filter(): ICollectionFilter {
    return this.config.filter;
  }

  get elements(): Observable<ICollectionElement[]> {
    return this._elements.pipe(
      tap((elements) => {
        this.config.filter.options.forEach(
          (option) => (option.count = elements.filter(option.filter).length)
        );
      }),
      map((elements: ICollectionElement[]) => {
        const currentFilter = this.config.filter.options.find(
          (option) => option.value === this.config.filter.value
        );
        return currentFilter ? elements.filter(currentFilter.filter) : elements;
      }),
      map((elements: CollectionElement[]) => {
        this.config.pagination.length = elements.length;
        const { pageIndex, pageSize } = this.config.pagination;
        const maxPageIndex = Math.ceil(elements.length / pageSize) - 1;
        const firstElementOnPage =
          (pageIndex > maxPageIndex ? maxPageIndex : pageIndex) * pageSize;
        return elements.slice(
          firstElementOnPage,
          firstElementOnPage + pageSize
        );
      })
    );
  }

  updateFilter(newValue: CollectionFilterEnum): void {
    this.config.filter = { ...this.config.filter, value: newValue };
    this._elements.next(this._elements.value);
  }

  changePage(pageEvent: PageEvent): void {
    this.config.pagination = pageEvent;
    this._elements.next(this._elements.value);
  }

  private getCollectionFromStorage(): Collection | undefined {
    const fromStorage = localStorage.getItem(this.storageKey);
    if (fromStorage) {
      return JSON.parse(fromStorage).map((collection: Collection) => {
        const elements = collection.elements.map(
          (element) =>
            new CollectionElement(
              element.id,
              element.name,
              element.description,
              element.iconStyle
            )
        );
        return new Collection(collection.name, elements);
      });
    }
    return undefined;
  }

  public discoverElements([...ids]: number[]): void {
    this._elements.value
      ?.filter((element) => ids.includes(element.id))
      .forEach((element) => element.discover());
  }
}

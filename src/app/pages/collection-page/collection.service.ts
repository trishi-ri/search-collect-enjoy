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
import { Collection, ICollection } from './collection.model';
import { Storageble } from 'src/app/initialize/storage.service';
import { ICollectionPaginator } from './collection-paginator/collection-paginator.model';

interface ICollectionState {
  collection: ICollection;
  config: ICollectionConfig;
}

@Injectable({ providedIn: 'root' })
export class CollectionService extends Storageble<ICollectionState> {
  private collection: Collection = new Collection();
  private _elements = new BehaviorSubject<ICollectionElement[]>([]);
  config!: ICollectionConfig;

  constructor(private generator: CollectionGenerator) {
    super('collection');
  }

  init(config: ICollectionConfig): void {
    const loaded = this.load();
    this.config = loaded?.config
      ? this.loadConfig(config, loaded.config)
      : config;
    this.collection = loaded?.collection
      ? new Collection(loaded.collection)
      : this.generator.generate();
    this._elements.next(this.collection.elements);
    this.saveState();
  }

  get paginator(): ICollectionPaginator {
    return this.config.paginator;
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
        this.config.paginator.pagination.length = elements.length;
        const { pageIndex, pageSize } = this.config.paginator.pagination;
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
    this.saveState();
  }

  changePage(pageEvent: PageEvent): void {
    this.config.paginator.pagination = pageEvent;
    this._elements.next(this._elements.value);
    this.saveState();
  }

  discoverElements([...ids]: number[]): void {
    this._elements.value
      ?.filter((element) => ids.includes(element.id))
      .forEach((element) => element.discover());
    this.saveState();
  }

  protected convertItemToStorageItem(item: ICollectionState): string {
    return JSON.stringify(item);
  }

  protected convertStorageItemToItem(storageItem: string): ICollectionState {
    return JSON.parse(storageItem);
  }

  private loadConfig(
    defaultConfig: ICollectionConfig,
    config: ICollectionConfig
  ): ICollectionConfig {
    return {
      ...config,
      filter: {
        ...config.filter,
        options: defaultConfig.filter.options,
      },
    };
  }

  private saveState(): void {
    this.save({ collection: this.collection, config: this.config });
  }
}
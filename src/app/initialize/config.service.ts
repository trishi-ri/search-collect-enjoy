import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable, of } from 'rxjs';
import { ICollectionElement } from '../pages/collection-page/collection-element/collection-element.model';
import {
  ICollectionFilter,
  CollectionFilterEnum,
} from '../pages/collection-page/collection-filter/collection-filter.model';

interface IConfig {
  collection: ICollectionConfig;
  collectionGenerator: ICollectionGeneratorConfig;
}

export interface ICollectionConfig {
  filter: ICollectionFilter;
  pagination: PageEvent;
  pageSizeOptions: number[];
}

export interface ICollectionGeneratorConfig {
  maxCollectionLength: number;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  getConfig(): Observable<IConfig> {
    const collection: ICollectionConfig = {
      filter: {
        options: [
          {
            name: CollectionFilterEnum[CollectionFilterEnum.all],
            value: CollectionFilterEnum.all,
            count: 0,
            filter: () => true,
          },
          {
            name: CollectionFilterEnum[CollectionFilterEnum.uncollected],
            value: CollectionFilterEnum.uncollected,
            count: 0,
            filter: (element: ICollectionElement) => !element.firstDiscover,
          },
          {
            name: CollectionFilterEnum[CollectionFilterEnum.collected],
            value: CollectionFilterEnum.collected,
            count: 0,
            filter: (element: ICollectionElement) => !!element.firstDiscover,
          },
        ],
        value: CollectionFilterEnum.all,
      },
      pagination: {
        length: 0,
        pageIndex: 0,
        pageSize: 25,
        previousPageIndex: 0,
      },
      pageSizeOptions: [5, 10, 25, 100],
    };
    const collectionGenerator: ICollectionGeneratorConfig = {
      maxCollectionLength: 100,
    };
    return of({ collection, collectionGenerator } as IConfig);
  }
}

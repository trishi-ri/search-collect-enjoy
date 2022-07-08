import { CollectionElement } from '../collection-element/collection-element.model';

export interface ICollectionFilter {
  options: IFilterOption[];
  value: CollectionFilterEnum;
}

export enum CollectionFilterEnum {
  all = 'all',
  uncollected = 'uncollected',
  collected = 'collected',
}

export interface IFilterOption {
  name: string;
  count: number;
  value: CollectionFilterEnum;
  filter: (element: CollectionElement) => boolean;
}

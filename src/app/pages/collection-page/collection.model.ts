import { ICollectionElement } from './collection-element/collection-element.model';

export class Collection {
  constructor(
    public name?: string,
    public elements: ICollectionElement[] = []
  ) {}
}

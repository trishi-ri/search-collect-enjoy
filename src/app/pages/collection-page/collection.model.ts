import { CollectionElement, ICollectionElement } from '@collection-page/models';

export class Collection implements ICollection {
  name?: string;
  elements: CollectionElement[] = [];

  constructor(collection?: ICollection) {
    this.name = collection?.name;
    this.elements = (collection?.elements || []).map(
      (element) =>
        new CollectionElement(
          element.id,
          element.name,
          element.description,
          element.iconStyle
        )
    );
  }
}

export interface ICollection {
  name?: string;
  elements: ICollectionElement[];
}

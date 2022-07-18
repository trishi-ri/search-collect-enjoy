import { ICollectionElement } from '@collection-page/models';
import { DateTimeISO } from '@shared/general-types';

export interface IInventoryItem {
  count: number;
  name: string;
  collectionId: number; // TODO: переходить от инветаря к коллекции, либо отображать карточку
  lastFoundTime: DateTimeISO; // TODO: сортировка по новизне

  remove(): void;
  add(): void;
  getCollectionElement(): ICollectionElement | undefined;
}

export class InventoryItem implements IInventoryItem {
  count: number = 0;
  name: string;
  collectionId: number;
  lastFoundTime: string;

  constructor(
    collectionId: number,
    getCollectionElement: () => ICollectionElement | undefined
  ) {
    this.collectionId = collectionId;
    this.getCollectionElement = getCollectionElement;
    this.name = this.getCollectionElement()?.name ?? 'undefined';
    this.lastFoundTime = new Date().toISOString();
    this.count = 1;
  }

  remove(): void {
    this.count -= 1;
  }

  add(): void {
    this.count += 1;
  }

  getCollectionElement(): ICollectionElement | undefined {
    throw new Error('Method not implemented.');
  }
}

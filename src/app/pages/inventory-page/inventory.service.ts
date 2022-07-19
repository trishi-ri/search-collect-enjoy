import { Injectable } from '@angular/core';
import { CollectionService } from '@collection-page/collection.service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { Storageble } from 'src/app/initialize/storage.service';
import { IInventoryItem, InventoryItem } from './inventory-item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService extends Storageble<IInventoryItem[]> {
  private _inventoryItems = new BehaviorSubject<IInventoryItem[]>([]);

  constructor(private collectionService: CollectionService) {
    super('inventory');
  }

  public init(): void {
    const loadedItems = this.load();
    if (loadedItems) {
      this.updateInventory(loadedItems);
    }
  }

  public get inventoryItems(): Observable<IInventoryItem[]> {
    return this._inventoryItems.asObservable();
  }

  public addToInventory(collectionId: number): void {
    const inventory = this._inventoryItems.value;
    inventory.push(this.getNewItem(collectionId));
  }

  public removeFromInventory(collectionIds: number[]): void {
    const updatedInventory = this._inventoryItems.value
      .map((item) => {
        if (collectionIds.includes(item.collectionId)) {
          item.remove();
        }
        return item;
      })
      .filter(({ count }) => count > 0);
    this.updateInventory(updatedInventory);
  }

  protected convertItemToStorageItem(item: IInventoryItem[]): string {
    return JSON.stringify(item);
  }

  protected convertStorageItemToItem(storageItem: string): IInventoryItem[] {
    const items: IInventoryItem[] = JSON.parse(storageItem);

    return items.map((item: IInventoryItem) => {
      const newItem = this.getNewItem(item.collectionId);
      newItem.count = item.count;
      newItem.lastFoundTime = item.lastFoundTime;
      return newItem;
    });
  }

  private updateInventory(updatedInventory: IInventoryItem[]): void {
    this._inventoryItems.next(updatedInventory);
    this.save(this._inventoryItems.value);
  }

  private getNewItem(collectionId: number): InventoryItem {
    return new InventoryItem(collectionId, () =>
      this.collectionService.getElementById(collectionId)
    );
  }
}

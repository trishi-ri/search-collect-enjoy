import { Component, OnInit } from '@angular/core';
import { CollectionService } from '@collection-page/collection.service';
import { ICollectionElement } from '@collection-page/models';
import { InventoryService } from '@inventory-page/inventory.service';
import { NotificationService } from 'src/app/initialize/notification.service';
import { ITimerState, SearchService } from './search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  public searchingInProgress = false;
  public timerState?: ITimerState;
  public newElement?: ICollectionElement;

  constructor(
    private searchService: SearchService,
    private notificationService: NotificationService,
    private collectionService: CollectionService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    const loadedTimerState = this.searchService.loadTimerState();
    if (loadedTimerState) {
      this.timerState = loadedTimerState;
    }
  }

  public onTimerChanged(): void {
    this.searchingInProgress = true;
    this.searchService.saveTime(this.timerState);
  }

  public onSearchClick(): void {
    this.timerState = { startTime: new Date(), durationAsSeconds: 5 };
  }

  public onCancelClick(): void {
    this.timerState = undefined;
    this.searchService.saveTime(this.timerState);
    this.searchingInProgress = false;
  }

  public onTimerDone(): void {
    this.searchingInProgress = false;
    this.searchService.saveTime(undefined);
    this.newElement = this.collectionService.discoverRandomElement();
    if (this.newElement.howManyFound === 1) {
      this.notificationService.notify({
        message: `yay, new element! It is ${this.newElement.name}!`,
        targetPath: 'collection',
      });
    }
  }

  public onAddToInventoryClick(): void {
    if (!this.newElement) {
      return;
    }
    this.inventoryService.addToInventory(this.newElement.id);
    this.notificationService.notify({
      message: `${this.newElement.name} was added to inventory`,
      targetPath: 'inventory',
    });
    this.newElement = undefined;
  }
  public onDropClick(): void {
    this.newElement = undefined;
  }
}

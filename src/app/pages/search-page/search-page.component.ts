import { Component, OnInit } from '@angular/core';
import { CollectionService } from '@collection-page/collection.service';
import { ICollectionElement } from '@collection-page/models';
import { NotificationService } from 'src/app/initialize/notification.service';
import { ITimerState, SearchService } from './search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  public disableSearchButton = false;
  public timerState?: ITimerState;

  constructor(
    private searchService: SearchService,
    private notificationService: NotificationService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const loadedTimerState = this.searchService.loadTimerState();
    if (loadedTimerState) {
      this.timerState = loadedTimerState;
    }
  }

  public onTimerChanged(): void {
    this.disableSearchButton = true;
    this.searchService.saveTime(this.timerState);
  }

  public onSearchClick(): void {
    this.timerState = { startTime: new Date(), durationAsSeconds: 10 };
  }

  public onTimerDone(): void {
    this.disableSearchButton = false;
    this.searchService.saveTime(undefined);
    const newElement: ICollectionElement =
      this.collectionService.discoverRandomElement();
    this.notificationService.notify({
      message: `yay! It is ${newElement.name}!`,
      targetPath: 'collection',
    });
  }
}

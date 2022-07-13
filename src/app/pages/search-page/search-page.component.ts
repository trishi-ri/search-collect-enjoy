import { Component, OnInit } from '@angular/core';
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
    private notificationService: NotificationService
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
    this.timerState = { startTime: new Date(), durationAsSeconds: 60 };
  }

  public onTimerDone(): void {
    this.disableSearchButton = false;
    this.searchService.saveTime(undefined);
    this.notificationService.notify({ message: 'timer done!' });
  }
}

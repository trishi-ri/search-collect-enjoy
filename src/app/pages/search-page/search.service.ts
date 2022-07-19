import { Injectable } from '@angular/core';
import { ICommand } from '@shared/models/command';
import { IoC } from 'src/app/initialize/app.initializer';
import { Storageble } from 'src/app/initialize/storage.service';
import { IoCKeys } from 'src/assets/ioc-keys';
import { ITimerTime, TimerTime } from './search-timer/timer-time.model';

export interface ITimerState {
  startTime: Date;
  durationAsSeconds: number;
}

interface ISearchState {
  timerState?: ITimerState;
}

@Injectable({ providedIn: 'root' })
export class SearchService extends Storageble<ISearchState> {
  constructor() {
    super('search');
  }

  public init(defaultTimerTime: ITimerTime): void {
    // TODO: search.json - text while seaching
    IoC.resolve<ICommand>(
      IoCKeys.Registry,
      IoCKeys.SearchDefaultTimerTime,
      () => new TimerTime(defaultTimerTime)
    ).execute();
  }

  public saveTime(timerState?: ITimerState): void {
    this.save({ timerState });
  }

  public loadTimerState(): ITimerState | undefined {
    return this.load()?.timerState;
  }

  // TODO: save new element?

  protected convertItemToStorageItem(item: ISearchState): string {
    return JSON.stringify(item);
  }

  protected convertStorageItemToItem(storageItem: string): ISearchState {
    const { timerState } = JSON.parse(storageItem);
    return {
      timerState: timerState
        ? {
            startTime: new Date(timerState.startTime),
            durationAsSeconds: timerState.durationAsSeconds,
          }
        : undefined,
    };
  }
}

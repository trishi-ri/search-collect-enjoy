import { Injectable } from '@angular/core';
import { Storageble } from 'src/app/initialize/storage.service';

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

  public init(): void {
    // TODO: load config from initializer?
    // TODO: search.json - text while seaching
  }

  public saveTime(timerState?: ITimerState): void {
    this.save({ timerState });
  }

  public loadTimerState(): ITimerState | undefined {
    return this.load()?.timerState;
  }

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

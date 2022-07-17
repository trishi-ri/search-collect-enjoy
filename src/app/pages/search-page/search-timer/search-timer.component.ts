import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ITimerState } from '@search-page/search.service';
import { timer, take, tap, takeUntil, Subject } from 'rxjs';
import { ITimerTime, TimerTime } from './timer-time.model';

@UntilDestroy()
@Component({
  selector: 'app-search-timer',
  templateUrl: './search-timer.component.html',
  styleUrls: ['./search-timer.component.scss'],
})
export class SearchTimerComponent {
  @Input() set timerState(state: ITimerState | undefined) {
    if (!state) {
      this.startNewTimerEvent.next();
      this.timerTime = new TimerTime({ minutes: 0, seconds: 0 });
      this.updateTimerProgress(this.timerTime, 0);
      return;
    }
    const startTimerTime = this.getStartTimerTime(state);
    if (!startTimerTime) {
      this.timerIsDone.emit();
      return;
    }
    this.startTimer(new TimerTime(startTimerTime), state.durationAsSeconds);
  }

  @Output() timerChanged = new EventEmitter<void>();

  @Output() timerIsDone = new EventEmitter<void>();
  public timerTime: TimerTime = new TimerTime({ minutes: 0, seconds: 0 });
  public minutesProgress = 100;
  public secondsProgress = 100;

  private startNewTimerEvent = new Subject<void>();

  public startTimer(startTime: TimerTime, allSeconds: number): void {
    this.startNewTimerEvent.next();
    this.timerTime = startTime;
    const lastSeconds = startTime.asSeconds;
    this.updateTimerProgress(startTime, allSeconds);
    timer(0, 1000)
      .pipe(
        take(lastSeconds),
        tap(() => {
          this.timerTime = this.timerTime.addSeconds(-1);
          this.timerChanged.emit();
          this.updateTimerProgress(this.timerTime, allSeconds);
          if (this.timerTime.asSeconds <= 0) {
            this.timerIsDone.emit();
          }
        }),
        takeUntil(this.startNewTimerEvent),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateTimerProgress(timerTime: ITimerTime, allSeconds: number): void {
    this.minutesProgress = this.asProcents(
      timerTime.minutes,
      (allSeconds - (allSeconds % 60)) / 60
    );

    this.secondsProgress = this.asProcents(timerTime.seconds, 60);
  }

  private getStartTimerTime(state: ITimerState): TimerTime | undefined {
    const timeAsMilliseconds = state.startTime.getTime();
    const endTimeAsMilliseconds =
      timeAsMilliseconds + state.durationAsSeconds * 1000;
    const currentDate = new Date();
    if (currentDate.getTime() > endTimeAsMilliseconds) {
      return undefined;
    }
    const lastDurrationAsSeconds = Math.trunc(
      (endTimeAsMilliseconds - currentDate.getTime()) / 1000
    );
    const seconds = lastDurrationAsSeconds % 60;
    const minutes = (lastDurrationAsSeconds - seconds) / 60;
    return new TimerTime({ minutes, seconds });
  }

  private asProcents(current: number, all: number): number {
    return Math.trunc((current / all) * 100);
  }
}

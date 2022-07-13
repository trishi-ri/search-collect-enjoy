import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ITimerState } from '@search-page/search.service';
import { timer, take, tap, takeUntil, Subject } from 'rxjs';
import { TimerTime } from './timer-time.model';

@UntilDestroy()
@Component({
  selector: 'app-search-timer',
  templateUrl: './search-timer.component.html',
  styleUrls: ['./search-timer.component.scss'],
})
export class SearchTimerComponent {
  @Input() set timerState(state: ITimerState | undefined) {
    if (!state) {
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
  public timerTime!: TimerTime;
  public progress = 100;
  public secondsProgress = 100;

  private startNewTimerEvent = new Subject<void>();

  public startTimer(startTime: TimerTime, allSeconds: number): void {
    this.startNewTimerEvent.next();
    this.timerTime = startTime;
    const lastSeconds = startTime.asSeconds;
    this.updateTimerProgress(lastSeconds, allSeconds);
    timer(0, 1000)
      .pipe(
        take(lastSeconds),
        tap(() => {
          this.timerTime = this.timerTime.addSeconds(-1);
          this.timerChanged.emit();
          this.updateTimerProgress(
            allSeconds - this.timerTime.asSeconds,
            allSeconds
          );
          if (this.progress <= 0) {
            this.timerIsDone.emit();
          }
        }),
        takeUntil(this.startNewTimerEvent),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private updateTimerProgress(
    currentSeconds: number,
    allSeconds: number
  ): void {
    this.progress = 100 - Math.trunc((currentSeconds / allSeconds) * 100);

    const secondsPart = currentSeconds % 60;
    this.secondsProgress =
      100 -
      Math.trunc((secondsPart / (allSeconds > 60 ? 60 : allSeconds)) * 100);
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
}

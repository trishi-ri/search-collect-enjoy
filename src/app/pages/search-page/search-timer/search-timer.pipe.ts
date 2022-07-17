import { Pipe, PipeTransform } from '@angular/core';
import { ITimerTime, TimerTime } from './timer-time.model';

@Pipe({
  name: 'searchTimer',
})
export class SearchTimerPipe implements PipeTransform {
  transform(timer: ITimerTime): string {
    return timer
      ? `${this.addLeadZero(timer.minutes)}:${this.addLeadZero(timer.seconds)}`
      : '';
  }

  private addLeadZero(time: number): string {
    return `${time < 10 ? '0' : ''}${time}`;
  }
}

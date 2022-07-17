export class TimerTime {
  minutes: number;
  seconds: number;

  constructor(time: ITimerTime) {
    this.minutes = time.minutes;
    this.seconds = time.seconds;
  }

  public get asSeconds(): number {
    return 60 * this.minutes + this.seconds;
  }

  public addSeconds(seconds: number = 1): TimerTime {
    const updatedTimeAsSeconds = this.asSeconds + seconds;
    this.minutes = Math.trunc(updatedTimeAsSeconds / 60);
    this.seconds = updatedTimeAsSeconds % 60;
    return new TimerTime(this);
  }
}

export interface ITimerTime {
  minutes: number;
  seconds: number;
}

export interface CommandQueue {
  start(): void;
  hardStop(): void;
  softStop(): void;
}

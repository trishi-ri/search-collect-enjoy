import { CommandQueue } from '../command-queue';
import { Command } from './command';

export class SoftStopQueue implements Command {
  constructor(private queue: CommandQueue) {}

  execute(): void {
    this.queue.softStop();
  }
}

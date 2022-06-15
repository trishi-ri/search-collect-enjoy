import { CommandQueue } from '../command-queue';
import { Command } from './command';

export class HardStopQueue implements Command {
  constructor(private queue: CommandQueue) {}

  execute(): void {
    this.queue.hardStop();
  }
}

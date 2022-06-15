import { CommandQueue } from '../command-queue/command-queue';
import { Command } from './command';

export class StartQueue implements Command {
  constructor(private queue: CommandQueue) {}

  execute(): void {
    this.queue.start();
  }
}

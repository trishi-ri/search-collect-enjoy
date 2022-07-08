import { BehaviorSubject, Observable, map } from 'rxjs';
import { ICommand } from './command';

export enum QueueState {
  init,
  executing,
  executingError,
  waiting,
  hardStopping,
  softStopping,
  stopped,
}

type QueueStatus = { state: QueueState; command?: ICommand; error?: Error };

export class CommandQueueModel {
  nextCommands: ICommand[] = [];
  status = new BehaviorSubject<QueueStatus>({
    state: QueueState.init,
  });

  addCommand(...commands: ICommand[]): void {
    (commands || []).forEach((command: ICommand) =>
      this.nextCommands.push(command)
    );
  }

  getNextCommand(): ICommand | undefined {
    if (!this.waitingCommands) {
      return;
    }
    return this.nextCommands.shift();
  }

  start(): void {
    this.setState(QueueState.waiting);
    this.executeCommands();
  }

  hardStopQueue(): void {
    this.setState(QueueState.hardStopping);
  }

  softStopQueue(): void {
    this.setState(QueueState.softStopping);
  }

  executeCommands(): void {
    let nextCommand = this.getNextCommand();
    while (nextCommand) {
      this.executeCommand(nextCommand);
      nextCommand = this.getNextCommand();
    }
    if (this.stoppingCommand) {
      this.setState(QueueState.stopped);
    }
  }

  get statusLogger$(): Observable<string> {
    return this.status.pipe(
      map(
        (status) =>
          `${QueueState[status.state]}${
            status.command ? ' : ' + status.command.constructor.name : ''
          }${status.error ? ' : ' + status.error.message : ''}`
      )
    );
  }

  executeCommand(command: ICommand): void {
    const wasSoftStopState = this.waitingCommands && this.stoppingCommand;
    this.setState(QueueState.executing, command);
    try {
      command.execute();
    } catch (error) {
      if (error instanceof Error) {
        this.setState(QueueState.executingError, command, error);
      }
    }
    if (this.executingCommand) {
      this.setState(
        wasSoftStopState ? QueueState.softStopping : QueueState.waiting
      );
    }
  }

  get waitingCommands(): boolean {
    return [QueueState.waiting, QueueState.softStopping].includes(
      this.status.value.state
    );
  }

  get executingCommand(): boolean {
    return [QueueState.executing, QueueState.executingError].includes(
      this.status.value.state
    );
  }

  get stoppingCommand(): boolean {
    return [QueueState.hardStopping, QueueState.softStopping].includes(
      this.status.value.state
    );
  }

  get isEmpty(): boolean {
    return this.nextCommands.length === 0;
  }

  protected setState(
    state: QueueState,
    command?: ICommand,
    error?: Error
  ): void {
    this.status.next({ state, command, error });
  }
}

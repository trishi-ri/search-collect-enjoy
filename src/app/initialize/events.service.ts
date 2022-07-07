import { Injectable } from '@angular/core';
import { ICommand } from '@shared/models/command';
import { CommandQueueModel } from '@shared/models/command-queue';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private commandQueue = new CommandQueueModel();

  public start(): void {
    this.commandQueue.start();
  }

  public newCommand(command: ICommand): void {
    this.commandQueue.addCommand(command);
  }

  public status(): Observable<string> {
    return this.commandQueue.statusLogger$;
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface INotification {
  message: string;
  actionButton?: { name: string; action: Function };
}

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notification = new Subject<INotification>();

  constructor(private snackBar: MatSnackBar) {
    this.notification
      .pipe(map((notification: INotification) => this.show(notification)))
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  public notify(notification: INotification): void {
    this.notification.next(notification);
  }

  private show({ message, actionButton }: INotification): void {
    setTimeout(() => {
      this.snackBar
        .open(message, actionButton?.name, {
          duration: 3000,
        })
        .onAction()
        .pipe(filter(() => !!actionButton))
        .subscribe(() => actionButton?.action());
    });
  }
}

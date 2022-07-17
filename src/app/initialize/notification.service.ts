import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Storageble } from './storage.service';

export interface INotification {
  message: string;
  targetPath?: string;
}

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class NotificationService extends Storageble<INotification[]> {
  private notification = new Subject<INotification>();
  private _notificationsForPages = new BehaviorSubject<INotification[]>([]);

  constructor(private snackBar: MatSnackBar) {
    super('notifies');
    this.notification
      .pipe(map((notification: INotification) => this.show(notification)))
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  init(): void {
    const loadedNotifies = this.load();
    this._notificationsForPages.next(loadedNotifies ?? []);
  }

  public notify(notification: INotification): void {
    this.notification.next(notification);
  }

  private show(notification: INotification): void {
    const { message } = notification;
    setTimeout(() => {
      this.snackBar
        .open(message, undefined, {
          duration: 3000,
        })
        .afterOpened()
        .pipe(tap(() => this.addNotificationForPage(notification)))
        .pipe(untilDestroyed(this))
        .subscribe();
    });
  }

  public get notificationsForPages(): Observable<INotification[]> {
    return this._notificationsForPages.asObservable();
  }

  public clearNotificationsForPage(pagePath: string): void {
    this.setNotificationsForPages(
      this._notificationsForPages.value.filter(
        (notify) => notify.targetPath !== pagePath
      )
    );
  }

  private addNotificationForPage(notification: INotification): void {
    if (!notification.targetPath) {
      return;
    }
    this.setNotificationsForPages([
      ...this._notificationsForPages.value,
      notification,
    ]);
  }

  private setNotificationsForPages(notifications: INotification[]): void {
    this._notificationsForPages.next(notifications);
    this.save(this._notificationsForPages.value);
  }

  protected convertItemToStorageItem(item: INotification[]): string {
    return JSON.stringify(item);
  }

  protected convertStorageItemToItem(storageItem: string): INotification[] {
    return JSON.parse(storageItem);
  }
}

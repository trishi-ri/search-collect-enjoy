import { fakeAsync, tick } from '@angular/core/testing';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { INotification, NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  const testNotifies: INotification[] = [
    { message: 'test' },
    { message: 'testForPage', targetPath: 'page' },
  ];
  const snackBar = jasmine.createSpyObj(MatSnackBar, ['open']);

  beforeEach(() => {
    snackBar.open = jasmine.createSpy('open').and.returnValue({
      afterOpened: () => of(undefined),
    } as MatSnackBarRef<TextOnlySnackBar>);
    service = new NotificationService(snackBar);
    spyOn(service, 'load').and.returnValue(testNotifies);
  });

  it('init, notificationsForPages', () => {
    service.init();

    expect(service.load).toHaveBeenCalled();

    const notificationsForPageSpy = jasmine.createSpy();
    service.notificationsForPages.subscribe(notificationsForPageSpy);

    expect(notificationsForPageSpy).toHaveBeenCalledWith([testNotifies[1]]);
  });

  it('clearNotificationsForPage', () => {
    service.init();
    service.clearNotificationsForPage('page');

    const notificationsForPageSpy = jasmine.createSpy();
    service.notificationsForPages.subscribe(notificationsForPageSpy);
    expect(notificationsForPageSpy).toHaveBeenCalledWith([]);
  });

  it('notify', fakeAsync(() => {
    const notification: INotification = {
      message: 'test',
    };
    service.notify(notification);
    tick();
    expect(snackBar.open as jasmine.Spy).toHaveBeenCalledWith(
      notification.message,
      undefined,
      {
        duration: 3000,
      }
    );
  }));
});

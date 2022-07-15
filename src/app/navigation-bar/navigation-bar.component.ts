import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ROUTES } from '../app-routing.module';
import {
  INotification,
  NotificationService,
} from '../initialize/notification.service';
import { INavigationButton, NavigationButton } from './navigation-bar.model';

@UntilDestroy()
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit {
  public navigationButtons: INavigationButton[] = [];
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.navigationButtons = ROUTES.filter(
      (route) => (route.component || route.loadChildren) && route.path
    ).map((route) => new NavigationButton(`${route.path}`));

    this.notificationService.notificationsForPages
      .pipe(untilDestroyed(this))
      .subscribe((notifies: INotification[]) => {
        this.navigationButtons.forEach((button) => {
          const notifiesForPath = notifies.filter(
            (notify) => notify.targetPath === button.path
          );
          button.updateNotifyBadge(notifiesForPath.length);
        });
      });
  }

  onClickButton(button: INavigationButton): void {
    button.updateNotifyBadge(0);
    this.notificationService.clearNotificationsForPage(button.path);
  }
}

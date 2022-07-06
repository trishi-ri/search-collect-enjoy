import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CollectionGenerator } from '../pages/collection-page/collection-generator.service';
import { CollectionService } from '../pages/collection-page/collection.service';

import { ConfigService } from './config.service';
import { NotificationService } from './notification.service';

function loadConfigFactory(
  configService: ConfigService,
  collectionGenerator: CollectionGenerator,
  collectionService: CollectionService,
  notificationService: NotificationService
) {
  return () =>
    configService
      .getConfig()
      .pipe(
        switchMap((config) =>
          collectionGenerator
            .init(config.collectionGenerator)
            .pipe(switchMap(() => of(config)))
        ),
        tap((config) => {
          collectionService.init(config.collection);
        })
      )
      .pipe(
        tap(() => notificationService.notify({ message: 'app initialized!' }))
      );
}

export const loadConfigProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [
    ConfigService,
    CollectionGenerator,
    CollectionService,
    NotificationService,
  ],
  multi: true,
};

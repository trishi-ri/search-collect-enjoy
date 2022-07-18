import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CollectionGeneratorService } from '@collection-page/collection-generator.service';
import { CollectionService } from '@collection-page/collection.service';

import { ConfigService, IMainConfig } from './config.service';
import { NotificationService } from './notification.service';
import { IoCKeys } from 'src/assets/ioc-keys';
import { IoCModel } from '@shared/models/ioc';
import { InventoryService } from '@inventory-page/inventory.service';

export const IoC = new IoCModel();

function loadConfigFactory(
  configService: ConfigService,
  collectionGenerator: CollectionGeneratorService,
  collectionService: CollectionService,
  notificationService: NotificationService,
  inventoryService: InventoryService
) {
  return () =>
    configService
      .getMainConfig()
      .pipe(
        switchMap((mainConfig: IMainConfig) =>
          collectionGenerator
            .init(
              mainConfig.collection.getProperty(
                IoCKeys.CollectionGeneratorConfig
              )
            )
            .pipe(switchMap(() => of(mainConfig)))
        ),
        tap((mainConfig: IMainConfig) => {
          collectionService.init(
            mainConfig.collection.getProperty(IoCKeys.CollectionConfig)
          );
          inventoryService.init();
        })
      )
      .pipe(
        tap(() => {
          notificationService.init();
          notificationService.notify({ message: 'app initialized!' });
        })
      );
}

export const loadConfigProvider: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: loadConfigFactory,
  deps: [
    ConfigService,
    CollectionGeneratorService,
    CollectionService,
    NotificationService,
    InventoryService,
  ],
  multi: true,
};

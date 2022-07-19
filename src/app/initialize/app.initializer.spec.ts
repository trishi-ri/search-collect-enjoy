import { CollectionGeneratorService } from '@collection-page/collection-generator.service';
import { CollectionService } from '@collection-page/collection.service';
import { InventoryService } from '@inventory-page/inventory.service';
import { of } from 'rxjs';
import { IoCKeys } from 'src/assets/ioc-keys';
import { loadConfigProvider } from './app.initializer';
import { ConfigService, IMainConfig } from './config.service';
import { NotificationService } from './notification.service';

describe('loadConfigProvider', () => {
  it('loadConfigFactory', () => {
    const configService = jasmine.createSpyObj('ConfigService', [
      'getMainConfig',
    ]);
    const collectionGenerator = jasmine.createSpyObj(
      'CollectionGeneratorService',
      ['init']
    );
    const collectionService = jasmine.createSpyObj('CollectionService', [
      'init',
    ]);
    const notificationService = jasmine.createSpyObj('NotificationService', [
      'init',
      'notify',
    ]);
    const inventoryService = jasmine.createSpyObj('InventoryService', ['init']);

    const values: Record<string, unknown> = {
      [IoCKeys.CollectionGeneratorConfig]: 'CollectionGeneratorConfig',
      [IoCKeys.CollectionConfig]: 'CollectionConfig',
    };
    const collection = {
      getProperty: <T>(key: string): T => values[key] as T,
      setProperty: <T>(key: string, newValue: T): void => {
        values[key] = newValue;
      },
    };
    configService.getMainConfig = jasmine
      .createSpy('mainConfig')
      .and.returnValue(
        of({
          collection,
        })
      );
    collectionGenerator.init = jasmine
      .createSpy('generatioInit')
      .and.returnValue(of(undefined));

    loadConfigProvider
      .useFactory(
        configService,
        collectionGenerator,
        collectionService,
        notificationService,
        inventoryService
      )()
      .subscribe();

    expect(configService.getMainConfig).toHaveBeenCalled();
    expect(collectionGenerator.init).toHaveBeenCalledWith(
      'CollectionGeneratorConfig'
    );
    expect(collectionService.init).toHaveBeenCalledWith('CollectionConfig');
    expect(inventoryService.init).toHaveBeenCalled();
    expect(notificationService.init).toHaveBeenCalled();
    expect(notificationService.notify).toHaveBeenCalledWith({
      message: 'app initialized!',
    });
  });
});

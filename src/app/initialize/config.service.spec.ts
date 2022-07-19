import { CollectionConfig } from '@collection-page/collection.config';
import { UObject } from '@shared/models/u-object';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  it('getMainConfig', () => {
    const collection = new UObject();
    spyOn(CollectionConfig, 'init');
    spyOnProperty(CollectionConfig, 'config').and.returnValue(collection);

    const configSpy = jasmine.createSpy();
    new ConfigService().getMainConfig().subscribe(configSpy);
    expect(CollectionConfig.init as jasmine.Spy).toHaveBeenCalled();
    expect(configSpy).toHaveBeenCalledWith({ collection });
  });
});

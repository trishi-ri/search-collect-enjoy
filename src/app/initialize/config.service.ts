import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CollectionConfig } from '@collection-page/collection.config';
import { IUObject } from '@shared/models/u-object';

export interface IMainConfig {
  collection: IUObject;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public getMainConfig(): Observable<IMainConfig> {
    CollectionConfig.init();
    return of({
      collection: CollectionConfig.config,
    } as IMainConfig);
  }
}

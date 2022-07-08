import { IUObject, UObject } from '@shared/models/u-object';
import { IoCKeys } from 'src/assets/ioc-keys';
import {
  ICollectionFilter,
  ICollectionPaginator,
  CollectionFilterEnum,
  ICollectionElement,
} from './models';

export interface ICollectionConfig {
  filter: ICollectionFilter;
  paginator: ICollectionPaginator;
}

export interface ICollectionGeneratorConfig {
  maxCollectionLength: number;
}

export class CollectionConfig {
  public static init(): void {
    CollectionConfig.config.setProperty(IoCKeys.CollectionConfig, {
      filter: CollectionConfig.filter,
      paginator: CollectionConfig.paginator,
    } as ICollectionConfig);

    CollectionConfig.config.setProperty(
      IoCKeys.CollectionGeneratorConfig,
      CollectionConfig.generator as ICollectionGeneratorConfig
    );
  }

  public static get config(): IUObject {
    return new UObject();
  }

  private static get filter(): ICollectionFilter {
    return {
      options: [
        {
          name: CollectionFilterEnum[CollectionFilterEnum.all],
          value: CollectionFilterEnum.all,
          count: 0,
          filter: () => true,
        },
        {
          name: CollectionFilterEnum[CollectionFilterEnum.uncollected],
          value: CollectionFilterEnum.uncollected,
          count: 0,
          filter: (element: ICollectionElement) => !element.firstDiscover,
        },
        {
          name: CollectionFilterEnum[CollectionFilterEnum.collected],
          value: CollectionFilterEnum.collected,
          count: 0,
          filter: (element: ICollectionElement) => !!element.firstDiscover,
        },
      ],
      value: CollectionFilterEnum.all,
    };
  }

  private static get paginator(): ICollectionPaginator {
    return {
      pagination: {
        length: 0,
        pageIndex: 0,
        pageSize: 25,
        previousPageIndex: 0,
      },
      pageSizeOptions: [5, 10, 25, 100],
    };
  }

  private static get generator(): ICollectionGeneratorConfig {
    return {
      maxCollectionLength: 100,
    };
  }
}

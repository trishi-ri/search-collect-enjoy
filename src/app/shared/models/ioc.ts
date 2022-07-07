import { IoCKeys } from 'src/assets/ioc-keys';
import { ICommand } from './command';

export interface IIoC {
  resolve<T>(key: string, ...parameters: unknown[]): T;
}

export class IoCModel implements IIoC {
  dependencies: IoCDependencies = this.defaultDependencies;

  resolve<T>(key: IoCKey, ...args: unknown[]): T {
    try {
      return this.getDependencyFn(key)(...args) as T;
    } catch (e) {
      throw e;
    }
  }

  private getDependencyFn(key: string): IoCDependencyFn {
    const dependencyFn = this.dependencies[key];
    if (dependencyFn) {
      return dependencyFn;
    } else {
      throw new Error(`IoC-dependency not found by key "${key}"`);
    }
  }

  private addDependency(key: IoCKey, dependency: IoCDependencyFn): void {
    this.dependencies[key] = dependency;
  }

  private get defaultDependencies(): IoCDependencies {
    return {
      [IoCKeys.Registry]: (key, dependency): ICommand => ({
        execute: () =>
          this.addDependency(key as IoCKey, dependency as IoCDependencyFn),
      }),
    };
  }
}

type IoCKey = string;
type IoCDependencyFn = (...args: unknown[]) => unknown;
type IoCDependencies = Record<IoCKey, IoCDependencyFn>;

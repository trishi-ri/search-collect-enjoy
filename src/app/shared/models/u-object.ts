import { IoC } from 'src/app/initialize/app.initializer';
import { IoCKeys } from 'src/assets/ioc-keys';
import { ICommand } from './command';

export interface IUObject {
  getProperty<T>(key: string): T;
  setProperty<T>(key: string, newValie: T): void;
}

export class UObject implements IUObject {
  constructor(private objectIoCPrefix?: string) {}

  getProperty<T>(key: string): T {
    return IoC.resolve<T>(this.getFullKey(key));
  }

  setProperty<T>(key: string, newValue: T): void {
    IoC.resolve<ICommand>(
      IoCKeys.Registry,
      this.getFullKey(key),
      () => newValue
    ).execute();
  }

  private getFullKey(key: string): string {
    return [this.objectIoCPrefix, key].filter((value) => value).join('.');
  }
}

import { Injectable } from '@angular/core';
import { Command } from '../commands';
import { IoC } from './ioc';

type IoCKey = 'IoC.Registry' | string;
type IoCValue = (...args: unknown[]) => unknown;
type IoCRecords = Record<IoCKey, IoCValue>;

@Injectable()
export class IoCContainer implements IoC {
  private records: IoCRecords = this.defaultRecords;

  public resolve<T>(key: IoCKey, ...args: unknown[]): T {
    try {
      return this.getValue(key)(...args) as T;
    } catch (e) {
      throw e;
    }
  }

  public get keys(): IoCKey[] {
    return Object.keys(this.records);
  }

  private getValue(key: IoCKey): IoCValue {
    const value = this.records[key];
    if (value) {
      return value;
    }
    throw new Error(`not found ioc-record by key "${key}"`);
  }

  private get defaultRecords(): IoCRecords {
    return {
      ['IoC.Registry']: (key, value): Command => {
        return {
          execute: () => (this.records[key as string] = value as IoCValue),
        };
      },
    };
  }
}

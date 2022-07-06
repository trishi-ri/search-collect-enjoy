type UnloadedValue<T> = T | undefined;

export abstract class Storageble<T> {
  private readonly mainKey = 'sce';

  constructor(protected storageKey: string) {}

  save(value: T): void {
    localStorage.setItem(this.fullKey, this.convertItemToStorageItem(value));
  }

  load<U = undefined>(
    unloadedValue: UnloadedValue<U> = undefined
  ): T | UnloadedValue<U> {
    const value = localStorage.getItem(this.fullKey);
    if (!value) {
      return unloadedValue;
    }
    try {
      return this.convertStorageItemToItem(value);
    } catch {
      return unloadedValue;
    }
  }

  clear(): void {
    localStorage.removeItem(this.fullKey);
  }

  private get fullKey(): string {
    return [this.mainKey, this.storageKey].filter((key) => key).join('.');
  }

  protected abstract convertItemToStorageItem(item: T): string;
  protected abstract convertStorageItemToItem(storageItem: string): T;

  // TODO: версии для сохраняемых стейтов и abstract для стратегии миграции между версиями?
}

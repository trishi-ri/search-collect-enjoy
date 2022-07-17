export abstract class Storageble<T> {
  private readonly mainKey = 'sce';

  constructor(protected storageKey: string) {}

  save(value: T): void {
    localStorage.setItem(this.fullKey, this.convertItemToStorageItem(value));
  }

  load(): T | undefined {
    const value = localStorage.getItem(this.fullKey);
    if (!value) {
      return undefined;
    }
    try {
      return this.convertStorageItemToItem(value);
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  clear(): void {
    localStorage.removeItem(this.fullKey);
  }

  private get fullKey(): string {
    return [this.mainKey, this.storageKey].filter((key) => key).join('.');
  }

  // TODO: optional, if empty then use JSON.parse and JSON.stringfy
  protected abstract convertItemToStorageItem(item: T): string;
  protected abstract convertStorageItemToItem(storageItem: string): T;

  // TODO: версии для сохраняемых стейтов и abstract для стратегии миграции между версиями?
}

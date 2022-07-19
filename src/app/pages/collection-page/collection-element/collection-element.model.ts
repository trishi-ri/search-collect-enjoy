import { CssStyle, DateTimeISO } from '@shared/general-types';

export interface ICollectionElement {
  id: number;
  name: string;
  description: string;
  firstDiscover?: DateTimeISO;
  howManyFound: number;
  iconStyle: CssStyle;

  use(): void;
  discover(): void;
}

export class CollectionElement implements ICollectionElement {
  id: number;
  name: string;
  description: string;
  firstDiscover?: DateTimeISO;
  howManyFound: number;
  iconStyle: CssStyle;

  constructor(element: Partial<ICollectionElement>) {
    this.id = element.id ?? 0;
    this.name = element.name ?? '';
    this.description = element.description ?? '';
    this.firstDiscover = element.firstDiscover;
    this.iconStyle = element.iconStyle ?? {};
    this.howManyFound = element.howManyFound ?? 0;
  }

  public use(): void {
    throw new Error('Method not implemented.');
  }

  public discover(): void {
    this.howManyFound = this.howManyFound + 1;
    if (!this.firstDiscover) {
      this.firstDiscover = new Date().toISOString();
    }
  }
}

export type DateTimeISO = string;
export type CssStyle = Record<string, string>;

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
  firstDiscover?: DateTimeISO;
  howManyFound: number = 0;

  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string,
    public readonly iconStyle: Record<string, string>
  ) {}

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

export interface INavigationButton {
  name: string;
  path: string;
  notifyBadge: number;
  notifyBadgeHidden: boolean;
  toggleNotifyBadge(): void;
  updateNotifyBadge(newNotiyfBadge: number): void;
}

export class NavigationButton implements INavigationButton {
  name: string;
  path: string;
  notifyBadge = 0;
  hideBadge = false;

  constructor(path: string) {
    this.name = path;
    this.path = path;
  }

  get notifyBadgeHidden() {
    return this.notifyBadge === 0 || this.hideBadge;
  }

  toggleNotifyBadge(): void {
    this.hideBadge = !this.hideBadge;
  }

  updateNotifyBadge(actualBadge: number): void {
    this.notifyBadge = actualBadge;
  }
}

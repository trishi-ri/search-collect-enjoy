export interface ICommand {
  execute(): void;
}

export class MacroCommand implements ICommand {
  constructor(private commands: ICommand[]) {}

  execute(): void {
    this.commands.forEach((command) => command.execute());
  }
}

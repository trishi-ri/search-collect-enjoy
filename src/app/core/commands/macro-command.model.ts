import { Command } from './command';

export class MacroCommand implements Command {
  constructor(private commands: Command[] = []) {}

  execute(): void {
    this.commands.forEach((command) => command.execute());
  }
}

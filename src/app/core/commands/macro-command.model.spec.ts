import { Command } from './command';
import { MacroCommand } from './macro-command.model';

describe('MacroCommand', () => {
  it('execute all commands', () => {
    const commands: Command[] = [
      { execute: jasmine.createSpy('first command') },
      { execute: jasmine.createSpy('second command') },
    ];
    const macroCommand = new MacroCommand(commands);
    macroCommand.execute();

    expect(commands[0].execute).toHaveBeenCalled();
    expect(commands[1].execute).toHaveBeenCalled();
  });

  it('error was interrapt executing commands and throw error', () => {
    const commands: Command[] = [
      { execute: jasmine.createSpy('first command').and.throwError('err') },
      { execute: jasmine.createSpy('second command') },
    ];
    const macroCommand = new MacroCommand(commands);

    expect(() => macroCommand.execute()).toThrowError('err');
    expect(commands[0].execute).toHaveBeenCalled();
    expect(commands[1].execute).not.toHaveBeenCalled();
  });
});

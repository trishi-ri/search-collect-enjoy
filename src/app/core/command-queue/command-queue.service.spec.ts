import {
  Command,
  MacroCommand,
  StartQueue,
  HardStopQueue,
  SoftStopQueue,
} from '../commands';
import { CommandQueueService } from './command-queue.service';

class TestCommand implements Command {
  execute(): void {}
}

describe('CommandQueueService', () => {
  let queue: CommandQueueService;
  let stateSpy: jasmine.Spy;
  const testCommand = new TestCommand();

  beforeEach(() => {
    queue = new CommandQueueService();
    stateSpy = jasmine.createSpy();
    queue.statusLogger$.subscribe(stateSpy);
  });

  it('после команды старт поток запущен', () => {
    const mainCommandsQueue = new MacroCommand([
      { execute: () => queue.addCommand(testCommand, testCommand) },
      new StartQueue(queue),
    ]);
    mainCommandsQueue.execute();

    expect(stateSpy.calls.allArgs()).toEqual([
      ['init'],
      ['waiting'],
      ['executing : TestCommand'],
      ['waiting'],
      ['executing : TestCommand'],
      ['waiting'],
    ]);
  });

  it('после команды hard stop, поток завершается', () => {
    const mainCommandsQueue = new MacroCommand([
      { execute: () => queue.addCommand(testCommand) },
      { execute: () => queue.addCommand(new HardStopQueue(queue)) },
      { execute: () => queue.addCommand(testCommand) },
      new StartQueue(queue),
    ]);
    mainCommandsQueue.execute();

    expect(stateSpy.calls.allArgs()).toEqual([
      ['init'],
      ['waiting'],
      ['executing : TestCommand'],
      ['waiting'],
      ['executing : HardStopQueue'],
      ['hardStopping'],
      ['stopped'],
    ]);
    expect(queue.isEmpty).toBe(false);
  });

  it('после команды soft stop, поток завершается только после того, как все задачи закончились', () => {
    const mainCommandsQueue = new MacroCommand([
      { execute: () => queue.addCommand(testCommand) },
      { execute: () => queue.addCommand(new SoftStopQueue(queue)) },
      { execute: () => queue.addCommand(testCommand) },
      new StartQueue(queue),
    ]);
    mainCommandsQueue.execute();

    expect(stateSpy.calls.allArgs()).toEqual([
      ['init'],
      ['waiting'],
      ['executing : TestCommand'],
      ['waiting'],
      ['executing : SoftStopQueue'],
      ['softStopping'],
      ['executing : TestCommand'],
      ['softStopping'],
      ['stopped'],
    ]);
    expect(queue.isEmpty).toBe(true);
  });

  it('после ошибки выполнение не прерывается', () => {
    const testCommandWithError = new TestCommand();
    spyOn(testCommandWithError, 'execute').and.throwError('test error');

    const mainCommandsQueue = new MacroCommand([
      { execute: () => queue.addCommand(testCommandWithError, testCommand) },
      new StartQueue(queue),
    ]);
    mainCommandsQueue.execute();

    expect(stateSpy.calls.allArgs()).toEqual([
      ['init'],
      ['waiting'],
      ['executing : TestCommand'],
      ['executingError : TestCommand : test error'],
      ['waiting'],
      ['executing : TestCommand'],
      ['waiting'],
    ]);
  });
});

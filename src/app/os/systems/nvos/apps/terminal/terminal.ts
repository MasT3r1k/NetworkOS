import { BiosApi } from '../../../../../bios/biosApi';
import { device } from '../../system';

type LineTypes = 'info' | 'input';

interface Args {
  type?: 'string' | 'number';
  help?: string;
  name: string;
}

interface Command {
  name: string;
  aliases: string[];
  execute: Function;
}

class Command {
  declare name: string;
  public aliases: string[] = [];
  declare execute: Function;

  constructor(name: string, execute: Function) {
    this.name = name;
    this.execute = execute;
  }

  run(terminal: TerminalClass, args: string[], makeSudo: boolean = false): void {
    this.execute(terminal, args, makeSudo);
  }
}

class Line {
  public text: string = ' ';
  public type: LineTypes = 'info';
  public author: string = '';
  constructor(text: string) {
    this.text += text;
  }

  public setAsExecutedByUser() {
    this.type = 'input';
    this.author = device.activeUser;
  }
}

let commands: Command[] = [];
export function registerCommand(cmd: string, args: Args[], execute: Function) {
  commands.push(new Command(cmd, execute));
}

registerCommand(
  'adduser',
  [{ name: 'user', type: 'string', help: 'username' }],
  (terminal: TerminalClass, args: string[]) => {
    if (!device.getUser(device.activeUser)?.checkAdmin()) {
      terminal.print('You are not administrator.');
      terminal.doneProcess(true);
      return;
    }
    if (!args[0]) {
      terminal.print('First set name of username.');
      terminal.doneProcess(true);
      return;
    }
    if (device.checkUser(args[0])) {
      terminal.print('Username is already exists.');
      terminal.doneProcess(true);
      return;
    }

    device.addUser(args[0]);
    terminal.print('Created new user: ' + args[0] + '.');
    terminal.doneProcess(true);
  }
);

registerCommand(
  'removeuser',
  [{ name: 'user', type: 'string', help: 'username' }],
  (terminal: TerminalClass, args: string[]) => {
    if (!device.getUser(device.activeUser)?.checkAdmin()) {
      terminal.print('You are not administrator.');
      terminal.doneProcess(true);
      return;
    }
    if (!args[0]) {
      terminal.print('First set name of username.');
      terminal.doneProcess(true);
      return;
    }

    let user = device.getUser(args[0]);

    if (user == null) {
      terminal.print('Username is not exists.');
      terminal.doneProcess(true);
      return;
    }

    if (user.name.toLowerCase() == device.activeUser.toLowerCase()) {
      terminal.print('You cant delete yourself.');
      terminal.doneProcess(true);
      return;
    }

    device.deleteUser(args[0]);
    terminal.print('Deleted user: ' + user.name + '.');
    terminal.doneProcess(true);
  }
);

registerCommand(
  'switchuser',
  [{ name: 'user', type: 'string', help: 'username' }],
  (terminal: TerminalClass, args: string[]) => {
    if (!device.getUser(device.activeUser)?.checkAdmin()) {
      terminal.print('You are not administrator.');
      terminal.doneProcess(true);
      return;
    }
    if (!args[0]) {
      terminal.print('First set name of username.');
      terminal.doneProcess(true);
      return;
    }

    let user = device.getUser(args[0]);

    if (user == null) {
      terminal.print('Username is not exists.');
      terminal.doneProcess(true);
      return;
    }

    if (user.name.toLowerCase() == device.activeUser.toLowerCase()) {
      terminal.print('You cant switch to yourself.');
      terminal.doneProcess(true);
      return;
    }

    device.switchUser(args[0]);
    terminal.print('Switch to: ' + user.name + '.');
    terminal.doneProcess(true);
  }
);

registerCommand('help', [], (terminal: TerminalClass) => {
  commands.forEach((_) => {
    terminal.print(_.name);
  });
  terminal.doneProcess(true);
});

export class TerminalClass {
  public lines: Line[] = [];
  public isProcessing: boolean = false;
  declare input: HTMLInputElement;

  public doneProcess(status: boolean): void {
    this.isProcessing = !status;
    this.input.focus();
  }

  constructor() {
    this.print(
      'Welcome to ' + device.deviceName + ' as ' + device.activeUser + '!'
    );
    this.print(' ');
    this.print(
      `System information as of ${BiosApi.getTime().date}. ${
        BiosApi.getTime().month
      }. ${BiosApi.getTime().year} ${BiosApi.getTime().hours}:${
        BiosApi.getTime().minutes
      }:${BiosApi.getTime().seconds}`
    );
    this.print('');
    this.print(' * You are now using Terminal by MasTerik with ❤️');
    this.print(" * For any help run <pre>help</pre>");
    this.print('');
    this.print(' * This Terminal supports HTML! 🙀');
  }

  public runCommand(cmd: string) {
    this.isProcessing = true;
    if (cmd.startsWith('sudo')) {
      cmd = cmd.slice('sudo'.length)
    }
    let executeLine = new Line(cmd);
    executeLine.setAsExecutedByUser();
    this.lines.push(executeLine);

    if (cmd == '') {
      this.isProcessing = false;
      return;
    }

    let CMDName = cmd.split(' ')[0].toLowerCase();
    let CMDArgs = cmd.slice(CMDName.length + 1).split(' ');

    let getCMD = commands.filter(
      (_) => _.name == CMDName || _.aliases.includes(CMDName)
    )[0];

    if (!getCMD) {
      let error = new Line(`${CMDName}: command not found`);
      this.lines.push(error);
      this.isProcessing = false;
      return;
    }

    getCMD.run(this, CMDArgs);
  }

  public print(text: string) {
    this.lines.push(new Line(text));
  }
}

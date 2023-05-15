import { BiosApi } from "src/app/bios/biosApi";
import { device } from "../../system";

type LineTypes = 'info' | 'input';

interface Command {
    name: string;
    aliases: string[];
}

class Command {
    declare name: string;
    public aliases: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

}


class Line {
    public text: string = ' ';
    public type: LineTypes = 'info';
    constructor(text: string) {
        this.text += text;
    }

    public setAsExecutedByUser() {
        this.type = 'input';
    }
}

export class TerminalClass {
    private commands: Command[] = [];
    public lines: Line[] = [];
    public isProcessing: boolean = false;
    declare input: HTMLInputElement;

    constructor() {
        this.print('Welcome to ' + device.deviceName + ' as ' + device.activeUser + '!')
        this.print(' ');
        this.print(`System information as of ${BiosApi.getTime().date}. ${BiosApi.getTime().month}. ${BiosApi.getTime().year} ${BiosApi.getTime().hours}:${BiosApi.getTime().minutes}:${BiosApi.getTime().seconds}`);
        this.print('')
        this.print(' * You are now using Terminal by MasTerik with ❤️')
        this.print(" * For any help run <a class='code link'>help</a>")
        this.print('')
        this.print(' * This Terminal supports HTML! 🙀')
    }

    public runCommand(cmd: string) {
        this.isProcessing = true;
        let executeLine = new Line(cmd);
        executeLine.setAsExecutedByUser();
        this.lines.push(executeLine);
        if (cmd == '') {this.isProcessing = false;return;}
        let CMDName = cmd.split(' ')[0];
        let CMDArgs = cmd.slice(CMDName.length);

        let getCMD = this.commands.filter(_ => _.name == CMDName || _.aliases.includes(CMDName))[0];
        if (!getCMD) {
            let error = new Line(`${CMDName}: command not found`);
            this.lines.push(error);
            this.isProcessing = false;
            return;
        }
    }

    public print(text: string) {
        this.lines.push(new Line(text));
    }

    public registerCommand(cmd: string, args: string[], execute: Function) {

    }
}

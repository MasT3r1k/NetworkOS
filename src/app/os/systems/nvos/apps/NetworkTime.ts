import { Processes } from "../Process";
import { BiosApi } from "../../../../bios/biosApi";
import { TerminalClass, registerCommand } from "./terminal/terminal";


export let module = {
    name: "NetworkTime",
    windows: [],
    run: () => {
        let process = Processes.createProcess(module.name, false);
        process.setAsHidden();
        
        
        registerCommand('time', [], (terminal: TerminalClass) => {
            terminal.print(
            'Now is ' +
                BiosApi.getTime().hours +
                ':' +
                BiosApi.getTime().minutes +
                ':' +
                BiosApi.getTime().seconds
            );
            terminal.doneProcess(true);
        });
        
        registerCommand('date', [], (terminal: TerminalClass) => {
            terminal.print(
            'Today is ' +
                BiosApi.getTime().date +
                '. ' +
                BiosApi.getTime().month +
                '. ' +
                BiosApi.getTime().year
            );
            terminal.doneProcess(true);
        });

        process.setData({
            format: BiosApi.getTime().format,
            hours: BiosApi.getTime().hours,
            minutes: BiosApi.getTime().minutes,
            seconds: BiosApi.getTime().seconds
        });

        process.execute(() => {
            setInterval(() => {
                process.setData({
                    format: BiosApi.getTime().format,
                    hours: BiosApi.getTime().hours,
                    minutes: BiosApi.getTime().minutes,
                    seconds: BiosApi.getTime().seconds
                });
            }, 1000)
        })
        process.run();
    }
}


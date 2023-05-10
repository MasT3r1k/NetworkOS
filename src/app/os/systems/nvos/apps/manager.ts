import { appsConfig } from "../appsConfig";
import { WindowApp } from "../window/window";

export namespace ApplicationManager {
    export let processes: Record<string, Process> = {};
    export let processesOrder: Record<string, number> = {};
    export function addMainProcess(id: number, window: number) {
        Object.values(processesOrder).forEach((value, index) => {
            processesOrder[index] = value + 1;
        });
        processesOrder[id + '-' + window] = 0;
    }
    export class Process {
        declare id: number;
        declare name: string;
        loaded: boolean = false;
        hidden: boolean = false;
        disabled: boolean = false;
        windows: WindowApp[] = [];
        data: any = {};
        maxWindows: number = 1;
        execute: Function = () => {
            console.log("Process " + this.name + " started!");
        };
        constructor(name: string) {
            this.id = Object.keys(processes).length as number;
            this.name = name;
            this.execute();
        }
    
    
        disable(): void {
            this.disabled = true;
        }

        closeProcess(): void {
            processes[this.name].disable();
            Object.values(processes).filter(_ => _.id > this.id).forEach((process) => {
                process.id -= 1;
            });
        }

        public setData(data: any): void {
            this.data = data;
        }
    }

    export async function runProcess(app: string): Promise<Process | null> {
        if (appsConfig[app]) {
            let config = appsConfig[app];
            let existProcess = await Object.values(processes).filter((a) => a.name == app);
            if (!(existProcess.length == 1 && (existProcess[0].maxWindows > 0 && existProcess[0].windows.length >= existProcess[0].maxWindows))) {
                let process = (existProcess.length == 0) ? new Process(config.id) : existProcess[0];
                let windowA = new WindowApp(config.name, config.name);
                process.hidden = config.hidden;
                if (!process.hidden) {
                    windowA.component = config.component;
                    process.windows.push(windowA);
                    windowA.loaded = true;
                }
                if (existProcess.length == 0) {
                    processes[app] = process;
                    process.execute();
                    addMainProcess(process.id, (process.windows.length - 1));
                }
                return process;
            }
            return null;
        }else{
            console.error(`[Error] ${app} is not installed.`);
            return null;
        }
    }

    export function getProcess(process: string): Process[] {
        let existProcesses = Object.values(processes).filter((_) => _.name == process);
        return existProcesses;

    }


    export function closeAllProcesses(): void {
        processes = {};
    }
}
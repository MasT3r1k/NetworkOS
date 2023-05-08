import { appsConfig } from "../appsConfig";
import { WindowApp } from "../window/window";

export namespace ApplicationManager {
    export let processes: Process[] = [];
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
        maxWindows: number = 1;
        constructor(name: string) {
            this.id = processes.length as number;
            this.name = name;
        }
    
    
        disable(): void {
            this.disabled = true;
        }

        closeProcess(): void {
            processes.splice(this.id, 1);
            processes.filter(_ => _.id > this.id).forEach((process) => {
                process.id -= 1;
            });
        }
    }

    export async function runProcess(app: string) {
        if (appsConfig[app]) {
            let config = appsConfig[app];
            let existProcess = await processes.filter((a) => a.name == app);
            if (!(existProcess.length == 1 && existProcess[0].windows.length >= existProcess[0].maxWindows)) {
                let process = (existProcess.length == 0) ? new Process(config.id) : existProcess[0];
                let windowA = new WindowApp(config.name, config?.loader);
                windowA.component = config.component;
                process.windows.push(windowA);
                windowA.loaded = true;
                if (existProcess.length == 0) {
                    processes.push(process);
                    addMainProcess(process.id, (process.windows.length - 1));
                }
            }
            // let config = appsConfig[app];
            // if (!config.maxWindows) { config.maxWindows = 1 }
            // if (config.maxWindows && config.Windows.length >= config.maxWindows) {
            // //   config.Windows.forEach(window => {
            // //     if (processes.windows[window].minimazed) processes[window].minimaze();
            // //   });
            //   // TODO: select window
            //   return;
            // }
            // let process = new Process(config.id);
            // let window = new WindowApp(config.id, config.loader);
            // window.component = config.component;
            // process.windows.push(window)
            // processes.push(process);
            // window.loaded = true;
        }else{
            console.error("[Error] Application is not installed.");
        }
    }

    export function closeAllProcesses(): void {
        processes = [];
    }
}
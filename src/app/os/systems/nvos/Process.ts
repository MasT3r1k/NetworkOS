import { Type } from "@angular/core";
import { WindowApp } from "./window/window";
import { appsConfig } from "./appsConfig";
import { NetworkLanguages } from "./locale";

export namespace Processes {
    export let list: string[] = [];
    export let processes: Record<string, Process> = {};
    export class Process {
        declare name: string;
        windows: WindowApp[] = [];
        maxWindows: number = 1;
        startedLoading: number = new Date().getTime();

        hidden: boolean = false;
        disabled: boolean = false;
        declare data: any;

        run: Function = () => {
            let loadedLoading = new Date().getTime();
            console.log("Process " + this.name + " started in " + (loadedLoading - this.startedLoading) + "ms!");
        }

        update: Function = () => {};
        updateInterval: any;

        constructor(name: string, autorun: boolean = true) {
            if (!name) return;
            if (list.includes(name) && processes?.[name])  {
                let process = processes[name];
                let config = appsConfig[process.name];
                process.maxWindows = (config.maxWindows) ? config.maxWindows : 1;
                if (config && config?.component && (process.maxWindows === -1 || process.windows.length < process.maxWindows)) {
                    process.openWindow(config.component, config.loader)
                }else{
                    if (process.windows.length > 0) {
                        if (process.windows[0].minimazed) {
                            process.windows[0].minimaze();
                        }
                    }
                }
                return;
            }
            this.name = name;
            list.push(this.name);
            processes[this.name] = this;
            
            if (autorun == true) {
                this.run();
            }

            let config = appsConfig?.[this.name];
            if (config && config?.maxWindows != null) {
                this.maxWindows = config.maxWindows as number;
            }
            if (config?.component && (this.maxWindows === -1 || this.windows.length < this.maxWindows)) {
                this.openWindow(config.component, config.loader)
            }

            this.updateInterval = setInterval(this.update(), 1000);
        }

        public setMaxwindows(count: number): number { // Returns new max Windows count
            this.maxWindows = count;
            return count;
        }

        public setData(data: any) {
            this.data = data;
        }

        public setAsHidden(): void {
            this.hidden = true;
        }

        public disable(): void {
            this.disabled = true;
        }

        public execute(fun: Function) {
            fun();
        }

        public openWindow(component: Type<any>, loader?: Type<any>) {
            if (this.maxWindows != -1 && this.windows.length >= this.maxWindows) { return; }
            let win = new WindowApp(this.name, (NetworkLanguages.locale[NetworkLanguages.getLanguage()]['data']['apps'][this.name]) ? NetworkLanguages.locale[NetworkLanguages.getLanguage()]['data']['apps'][this.name] : this.name);
            win.loadComponent(component);
            this.windows.push(win);
            win.loaded = true;
        }

        public closeProcess(): void {
            if (this.name) {
                list.splice(list.indexOf(this.name as string), 1);
                delete processes[this.name];
            }
        }

    }

    export function createProcess(app: string, autorun: boolean = true) {
        return new Process(app, autorun);
    }

}
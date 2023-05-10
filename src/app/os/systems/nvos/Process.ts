import { Type } from "@angular/core";
import { WindowApp } from "./window/window";
import { appsConfig } from "./appsConfig";

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
            if (list.includes(name) || processes?.[name]) return;
            this.name = name;
            list.push(this.name);

            processes[this.name] = this;

            if (autorun == true) {
                this.run();
            }

            let config = appsConfig?.[this.name];
            if (config?.component && this.windows.length < this.maxWindows) {
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
            if (this.windows.length >= this.maxWindows) { return; }
            let win = new WindowApp(this.name, this.name);
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
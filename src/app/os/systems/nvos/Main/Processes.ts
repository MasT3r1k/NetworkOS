/*
 *  Network Processes
 *      Made by MasTerik
 *      Version 2.0
 */

import { Type } from "@angular/core";

export namespace NProcesses {

    let runningProcesses: string[] = [];
    let processes: Process[] = [];

    export class Process {
        declare name: string;
        private appStarted: number = new Date().getTime();
        private appLoaded: number = 0;
        private autoStartup: boolean = false;
        private installed: boolean = false;
        private installingStatus: number = 0;
        private installingInterval: NodeJS.Timer | null = null;
        private running: boolean = false;

        private windows: WindowApp[] = [];
        private limitWindows: number = -1;

        constructor(name: string) {
            this.name = name;
            processes.push(this);
        }

        /*
        *   Install and uninstall
        *     Installing and uninstalling apps from AppStore
        *     - This is complete new
        *     
        */

        public install() {
            if (this.installed) return;
            this.installingInterval = setInterval(() => {
                if (this.installingStatus < 100) {
                    this.installingStatus += 1;
                    return;
                }
            
                this.installed = true;
                this.installingStatus = 0;
                this.installingInterval = null;

                console.log("Process " + this.name + " was successfully installed!")

            }, 100);
        }

        public uninstall() {
            if (!this.installed) return;
            this.installingInterval = setInterval(() => {
                if (this.installingStatus < 100) {
                    this.installingStatus += 1.5;
                    return;
                }
            
                this.installed = false;
                this.installingStatus = 0;
                this.installingInterval = null;

                console.log("Process " + this.name + " was successfully uninstalled!")

            }, 100);
        }



        /*
        *   Run process
        *     This function is for start process
        *     - Merged run() function and execute() from previous versionm
        *     
        */

        public run: Function = async(execute: Function) => {
            if (!this.installed) return;
            await execute();
            this.appLoaded = new Date().getTime();
            console.log("Started process: " + this.name);
            runningProcesses.push(this.name);
            return true;
        }

        /*
         *  Kill process
         *    This function complete stop process and close all windows
         *    - Renamed from closeProcess()
         * 
         */
        public kill(): boolean {
            if (!this.installed) return false;
            this.running = false;
            runningProcesses.splice(runningProcesses.indexOf(this.name), 1);
            return true;
        }

        /*
        *   Set limit for windows
        *     Set maximum open windows per this process
        *     - Now check if running more windows
        *     
        */

        public setLimitWindows(count: number): number {
            if (this.windows.length < count) {
                this.limitWindows = count;
            }
            return this.limitWindows;
        }

        /*
        *   Open and close window of process
        *     - Added option to close window in process
        *     
        */

        public openWindow(component: Type<any>) {
            if (!this.installed) return;
            if (this.limitWindows <= this.windows.length && this.limitWindows !== -1) return;


        }

        public closeWindow(window: WindowApp | number) {
            if (!this.installed) return;
            let id = (typeof window == 'number') ? window : this.windows.indexOf(window);

            if (!this.windows[id]) return false;
            this.windows[id].closeWindow();
            return true;
        }




    }

    export function runProcess(name: string) {
        return new Process(name);
    }

    export class WindowApp {


        public closeWindow() {

        }
    }

}
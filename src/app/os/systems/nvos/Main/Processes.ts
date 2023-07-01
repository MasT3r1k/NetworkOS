/*
 *  Network Processes
 *      Made by MasTerik
 *      Version 2.0
 *    Updated to -Map-
 */

import { Type } from "@angular/core";
import { NetworkPerms } from "../PermissionSystem";
import { ApplicationDatabase } from "../apps/networkhome/NetworkHome";

export namespace NProcesses {

    export let processes: Map<string, Process> = new Map();

    export function getProcess(process: string): Process | undefined {
        return processes.get(process);
    }

    export function getRunningProcesses(): string[] {

        let p: string[] = [];               //? Empty array

        processes.forEach((value, key) => { //? Add items to array
            if (value.getRunning() === false) return;
            p.push(key);
        });

        return p;                           //? Return array
    };

    export function getInstalledProcesses(): string[] {

        let p: string[] = [];               //? Empty array

        processes.forEach((value, key) => { //? Add items to array
            if (value.getInstallStatus() === false) return;
            p.push(key);
        });

        return p;                           //? Return array
    };


    export class Process {
        public name: string = '';
        private appStarted: number = new Date().getTime();
        private appLoaded: number = 0;
        private autoStartup: boolean = false;
        private installed: boolean = false;
        private installingStatus: number = 0;
        private hidden: boolean = false;
        private installingInterval: ReturnType<typeof setInterval> = setInterval(() => {}, 1000);
        private running: boolean = false;
        private systemProcess: boolean = false;

        private perms: NetworkPerms.appPerms[] = [];

        private windows: WindowApp[] = [];
        private limitWindows: number = -1;

        constructor(name: string, installed: boolean = false) {
            this.name = name;
            this.installed = installed;
            processes.set(name, this);
            if (this.autoStartup) {
                this.run();
            }
        }

        /*
        *   System process
        *       Check if is system process && Allow all perms
        * 
        */

        public isSystemProcess(): boolean {
            return this.systemProcess;
        }

        public makeSystemProcess(): void {
            this.systemProcess = true;
        }

        public unmakeSystemProcess(): void {
            this.systemProcess = false;
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
                clearInterval(this.installingInterval);

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
                clearInterval(this.installingInterval);

                console.log("Process " + this.name + " was successfully uninstalled!")

            }, 100);
        }

        public getInstallStatus(): boolean {
            return this.installed;
        }


        /*
        *   Run process
        *     This function is for start process
        *     - Merged run() function and execute() from previous versionm
        *     
        */

        public run: Function = async(execute: Function): Promise<boolean> => {
            if (!this.installed) {console.error('Aplikace není nainstalovaná.');return false}
            if (this.running) {console.error('Aplikace již běží.');return false}
            this.appLoaded = new Date().getTime();
            this.running = true;
            if (execute) await execute();
            
            let db = ApplicationDatabase.filter(_ => _.name == this.name)[0];
            if (db) {
                this.openWindow(db.component);
            }
            if (this.getRunning() === false) return false;
            console.log("Started process: " + this.name);
            return true;
        }

        /*
         *  Kill process
         *    This function complete stop process and close all windows
         *    - Renamed from closeProcess()
         * 
         */
        public kill(): boolean {
            if (!this.installed) {console.error('Aplikace není nainstalovaná.');return false}
            if (!this.running) {console.error('Aplikace již neběží.');return false}
            this.windows = [];
            this.running = false;
            return true;
        }

        public getRunning(): boolean {
            return this.running;
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

        public canOpenNextWindow(): boolean {
            return !(this.limitWindows <= this.windows.length && this.limitWindows !== -1);
        }

        /*
        *   Open and close window of process
        *     - Added option to close window in process
        *     
        */

        public openWindow(component: Type<any>) {
            if (!this.installed) return;
            if (!this.canOpenNextWindow()) return;

            this.windows.push(new WindowApp(this.name, this.name, component));

        }

        public closeWindow(window: WindowApp | number): boolean {
            if (!this.installed) return false;
            let id = (typeof window == 'number') ? window : this.windows.indexOf(window);

            if (!this.windows[id]) return false;
            this.windows.splice(id, 1);
            if (this.windows.length == 0) this.running = false;
            return !this.windows[id] as boolean;
        }

        public getWindows(): WindowApp[] {
            return this.windows;
        }


        /*
        *   Process options
        * 
        */

        public getVisibility(): boolean {
            return !this.hidden;
        }



    }

    export function createProcess(name: string, installed: boolean = false) {
        return new Process(name, installed);
    }

    interface windowSize {
        width: number;
        height: number;
    }

    interface windowHeader {
        default: boolean;
        close: boolean;
        maximize: boolean;
        minimize: boolean;
    }
    type windowStatus = 'normal' | 'maximized' | 'minimized';

    //! Window Mover    OLD VERSION
    // TODO Move somewhere else xd

    class Mover {
        public status: boolean = false;
        constructor() {}
        public toggle(boolean: boolean) {
            this.status = boolean;
        }
    }
    export let moving = new Mover();


    /* 
    *   Window manager
    *       Version 2.0
    */

    export let windowOrder: WindowApp[] = [];
    export let windowActive: WindowApp | null = null;
    export function unActiveWindow(): void {
        windowActive = null;
    }

    export function getWindowOrder(window: WindowApp): number {
        return 6 + windowOrder.indexOf(window);
    }

    export class WindowApp {

        private declare process: string;
        private declare title: string;
        private windowStatus: windowStatus = 'normal';
        private declare windowBody: Type<any>;
        private declare ActivatingWindowFunc: Function;

        private windowSize: windowSize = {
            width: 1440,
            height: 710
        }

        private hidden: boolean = false;

        private header: windowHeader = {
            default: true,
            close: true,
            maximize: true,
            minimize: true
        };

        constructor(process: string, title: string, component: Type<any>) {
            let p = getProcess(process);
            if (p === undefined) return;
            this.process = p.name;
            this.title = title;
            this.windowBody = component;
        }


        /*
        *   Window statuses && Window options
        *       Improved: From minimaze() and maximaze() functions to setStatus()
        */

        public getStatus(): windowStatus {
            return this.windowStatus;
        }

        public setStatus(status: windowStatus): void {
            this.windowStatus = status;
        }

        public toggleStatus(status: windowStatus): void {
            this.setStatus((this.getStatus() == status) ? "normal" : status)
        }

        public setTitle(title: string): void {
            this.title = title;
        }

        public getProcesName(): string | false {
            let p = this.getProces();
            return p ? p.name : p;
        }

        public getProces(): Process | false {
            let p = getProcess(this.process)
            if (p === undefined) {  // Check if process is still active
                return false;
            }
            return p;
        }

        public getTitle(): string {
            return this.title;
        }

        public getHeader(): windowHeader {
            return this.header;
        }

        public getComponent(): Type<any> {
            return this.windowBody;
        }

        public getVisibility(): boolean {
            return !this.hidden;
        }
    
        public getSize(): windowSize {
            return this.windowSize;
        }


        /*
        *   Multitasking
        *
        */

        public setActivatingWindowFunc(Fc: Function): void {
            this.ActivatingWindowFunc = Fc;
        }

        public activeWindow(): void {
            windowOrder.splice(windowOrder.indexOf(this), 1);
            windowOrder.push(this);
            windowActive = this;
            if (this.ActivatingWindowFunc) {
                this.ActivatingWindowFunc()
            }
        }


        /*
        *   Windows movement
        *       MOVE FUNCTION - !old # FIXED
        */

        move(event: MouseEvent): void {
            if (this.windowStatus == 'maximized') return;
            moving.toggle(true);
            let pos1 = 0, pos2 = 0, pos3 = event.clientX, pos4 = event.clientY;
            let windowA = event.target as HTMLBaseElement;
            let desktop = event.target as HTMLBaseElement;
            if (!windowA || !desktop) return;
            while (!windowA.classList.contains('window')) {
                windowA = windowA.offsetParent as HTMLBaseElement;
            }
            while (!desktop.classList.contains('desktop')) {
                desktop = desktop.offsetParent as HTMLBaseElement;
            }
    
            
    
            desktop.onmousemove = function(e) {
                e.preventDefault();
    
                if (!moving.status) { moving.toggle(true) }
    
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
    
                pos3 = e.clientX;
                pos4 = e.clientY;
    
                if (((windowA.offsetTop as number) - pos2) >= windowA.offsetHeight / 2 && ((windowA.offsetTop as number) - pos2) + windowA.offsetHeight / 2 <= desktop.clientHeight) {
                    windowA.style.top = ((windowA.offsetTop as number) - pos2) + 'px';
                }
                if (((windowA.offsetLeft as number) - pos1) >= windowA.offsetWidth / 2 && ((windowA.offsetLeft as number) - pos1) + windowA.offsetWidth / 2 <= desktop.clientWidth) {
                    windowA.style.left = ((windowA.offsetLeft as number) - pos1) + 'px';
                }
            }
    
            desktop.onmouseup = function() {
                if (moving.status) { moving.toggle(false); }
                desktop.onmouseup = null;
                desktop.onmousemove = null;
            }
        }


        /*
        *   Close window
        */

        public closeWindow() {
            let p = this.getProces();
            if (p === false) return;
            p.closeWindow(this);
        }
    }

}
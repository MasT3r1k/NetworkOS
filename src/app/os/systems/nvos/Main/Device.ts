/*
 *  Network Device
 *      Made by MasTerik
 *      Version 2.0
 */

import { ApplicationDatabase, registerProccesses } from '../apps/networkhome/NetworkHome';
import { valid_languages } from '../locale';
import { NProcesses } from './Processes';

interface displayInformation {
    screenWidth: number;
    screenHeight: number;
}

export interface desktopApp {
    app: string;
    text: string;
    icon: string;
    editing: boolean;
    isEmpty: boolean;
}

export namespace NDevice {
    type themes = 'dark' | 'light';

    class SystemClass {

        private deviceName: string = 'NetworkOS';
        private deviceUser: string = 'admin';
        private deviceStarted: number = new Date().getTime();
        private users: User[] = [];
        private theme: themes = 'dark';
        private desktopBackground: string = '/assets/nvos/default_wallpaper_3.webp';
        private loginBackground: string = '/assets/nvos/default_wallpaper_5.webp';

        private installed: boolean = false;

        private display: displayInformation = {
            screenHeight: 0,
            screenWidth: 0
        };

        public desktopApps: desktopApp[] = [];

        private lockStatus: boolean = true;
        private taskBarTime: string = '%h:%m:%s';

        private language: valid_languages = 'Czech';

        constructor() {}

        public getMainBackground(): string {
            return this.desktopBackground;
        }

        public setMainBackground(img: string): void {
            this.desktopBackground = img;
        }

        public getLockBackground(): string {
            return this.loginBackground;
        }

        public isDeviceUnlocked(): boolean {
            return this.lockStatus && this.deviceUser != '';
        }

        public lockDevice(): void {
            this.lockStatus = false;
        }

        public getDesktopApps(): desktopApp[] {
            return this.desktopApps;
        }

        public setResolution(resolution: Record<'width' | 'height', number>) {
            this.display.screenWidth = resolution.width;
            this.display.screenHeight = resolution.height;
        }

        public getResolution(): displayInformation {
            return this.display;
        }

        public addApplication(name: string, app: string, icon?: string) {
            icon ??= ApplicationDatabase.filter(_ => _.name === app)?.[0]?.icon;
            let a = {
                app: app,
                text: name,
                icon: icon,
                editing: false,
                isEmpty: false
            };
            
            let b = this.desktopApps.filter(__ => __.isEmpty == true)[0];
            if (!b) return;
            this.desktopApps[this.desktopApps.indexOf(b)] = a;
        }

        public getUser(user: string): User {
            return this.users.filter(_ => _.getName().toLowerCase() === user.toLowerCase())[0];
        }

        public getUsers(): string[] {
            let _: string[] = [];
            this.users.forEach(u => {
                _.push(u.getName())
            })
            return _;
        }

        public getActiveUser(): string {
            return this.deviceUser;
        }

        public startSystem(device: string, user: string, password: string) {
            // Set device name
            this.deviceName = device;

            // Set desktopApps
            this.desktopApps = [];
            for(let i = 0;i < 12*25;i++) {  // TODO AUTOMATIC CALCULATE
                this.desktopApps.push({
                    app: '',
                    text: '',
                    icon: '',
                    editing: false,
                    isEmpty: true
                });
            }
            registerProccesses();
            this.addApplication('Network Home', 'NetworkHome');
            NProcesses.createProcess('NetworkHome', true);

            // Create admin user
            let u = new User(user, password);
            u.setAdmin(true);
            this.deviceUser = user;
            this.users.push(u)
        }

        public deleteUser(user: string): boolean {
            if (this.getUser(this.deviceUser).checkAdmin() !== true) return false;
            if (this.getUser(user) === null) return false;
            if (this.deviceUser.toLowerCase() === user.toLowerCase()) return false;
            
            this.users.slice(this.users.indexOf(this.getUser(user)), this.users.indexOf(this.getUser(user)) + 1);

            return false;
        }

    }

    // TODO Move to the NetworkUsers
    class User {
        private name: string;
        private password: string;
        private logged: boolean = false;
        private isAdmin: boolean = false;

        constructor(name: string, password: string = '') {
            this.name = name;
            this.password = password;
            this.logged = true;
        }

        public getName(): string {
            return this.name;
        }

        public hasPassword(): boolean {
            return this.password !== '';
        }

        public setAdmin(force: boolean = false): void {
            if (force) {
                this.isAdmin = true;
            }

            // TODO GET ACTIVE USER, IF ADMIN, CAN SET ADMIN
        }

        public removeAdmin(): void {
            this.isAdmin = false;
        }

        public checkAdmin(): boolean {
            return this.isAdmin;
        }
    }

    export let System: SystemClass = new SystemClass();
}
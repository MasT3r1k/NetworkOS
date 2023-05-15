import { valid_languages } from "./locale";

type themes = 'light' | 'dark';
type backgroundTypes = 'classic' | '3d';

class User {
    declare name: string;
    private password: string = 'admin';
    private isAdmin: boolean = false;
    constructor(name: string, admin: boolean = false) {
        this.name = name;
        this.isAdmin = admin;
    }

    checkAdmin(): boolean {
        return this.isAdmin;
    }

    makeAdmin(): void {
        if (device.getUser(device.activeUser)?.checkAdmin()) {
            this.isAdmin = true;
        }
    }

    checkPassword(password: string): boolean {
        return (password == this.password) as boolean;
    }
}

class Device {
    private users: User[] = [];
    public deviceName: string = 'Network';
    public activeUser: string = '';
    public theme: themes = 'dark';
    public isUnlocked: boolean = false;
    public backgroundType: backgroundTypes = 'classic';
    public background: string = '/assets/nvos/default-bg.jpg';
    public backgroundLockscreen: string = '/assets/nvos/default-bg.jpg';
    public language: valid_languages = 'Czech';
    constructor() {
        let admin = new User('admin', true);
        this.users.push(admin);
        this.load();
        this.save();
    }

    public getUsers(): string[] {
        let a: string[] = [];
        this.users.forEach((u) => a.push(u.name.toLowerCase()));
        return a;
    }

    public getUser(user: string): User | null {
        if (!this.checkUser(user.toLowerCase())) return null;
        return this.users.filter(_ => _.name.toLowerCase() == user.toLowerCase())[0];
    }

    public checkUser(name: string): boolean {
        return this.getUsers().includes(name.toLowerCase());
    }

    public addUser(name: string) {
        if (!this.checkUser(name)) {
            let u = new User(name);
            this.users.push(u);
        }
    }

    public setUser(name: string) {
        if (this.checkUser(name)) {
            this.activeUser = name;
        }
    }

    public save() {
        localStorage.setItem("users", JSON.stringify(this.users));
        localStorage.setItem("activeUser", this.activeUser);
    }

    public load() {
        if (localStorage.getItem("users")) {
            // this.users = JSON.parse(localStorage.getItem("users") as string);
        }
        if (localStorage.getItem("activeUser")) {
            this.activeUser = localStorage.getItem("activeUser") as string;
        }
    }
}

export let device = new Device();

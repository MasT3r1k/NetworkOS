type themes = 'light' | 'dark';


class User {
    declare name: string;
    private isAdmin: boolean = false;
    constructor(name: string, admin: boolean = false) {
        this.name = name;
        this.isAdmin = admin;
    }

    checkAdmin(): boolean {
        return this.isAdmin;
    }

    makeAdmin() {
        if (device.checkUser(device.activeUser)?.checkAdmin()) {
            this.isAdmin = true;
        }
    }
}

class Device {
    private users: User[] = [];
    public activeUser: string = 'admin';
    public theme: themes = 'dark';
    constructor() {
        let admin = new User('admin', true);
        this.users.push(admin);
        this.load();
        this.save();
    }

    public getUsers(): string[] {
        let a: string[] = [];
        this.users.forEach((u) => a.push(u.name));
        return a;
    }

    public checkUser(name: string): User | null {
        return this.users.filter(_ => _.name == name)?.[0] || null;
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

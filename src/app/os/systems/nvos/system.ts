type themes = 'light' | 'dark';

interface DeviceI {
    users: string[];
    administrators: string[];
    activeUser: string;
    theme: themes;
}

class Device implements DeviceI {
    public administrators: string[] = ['admin'];
    public users: string[] = ['admin'];
    public activeUser: string = 'admin';
    public theme: themes = 'dark';
    constructor() {
        this.load();
        this.save();
    }

    public addUser(name: string, isAdmin: boolean = false) {
        this.users.push(name);
        if (isAdmin) {
            this.administrators.push(name);
        }
    }

    public setUser(name: string) {
        if (this.users.includes(name)) {
            this.activeUser = name;
        }
    }

    public save() {
        localStorage.setItem("users", JSON.stringify(this.users));
        localStorage.setItem("activeUser", this.activeUser);
        localStorage.setItem("administrators", JSON.stringify(this.administrators));
    }

    public load() {
        if (localStorage.getItem("users")) {
            this.users = JSON.parse(localStorage.getItem("users") as string);
        }
        if (localStorage.getItem("administrators")) {
            this.administrators = JSON.parse(localStorage.getItem("administrators") as string);

        }
        if (localStorage.getItem("activeUser")) {
            this.activeUser = localStorage.getItem("activeUser") as string;
        }
    }
}

export let device = new Device();

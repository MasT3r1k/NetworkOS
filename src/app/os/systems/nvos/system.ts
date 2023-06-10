import { valid_languages } from './locale';

type themes = 'light' | 'dark';
type backgroundTypes = 'classic' | '3d';

type TaskbarPosition = 'top' | 'bottom';

interface screenInformation {
  width: number;
  height: number;
}

interface Taskbar {
  position: TaskbarPosition;
  timeFormat: string;
}

class User {
  declare name: string;
  private password: string = '';
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
  public activeUser: string = 'admin';
  public theme: themes = 'dark';
  public started: Date = new Date();
  public isUnlocked: boolean = true;
  public devMode: boolean = true;
  public backgroundType: backgroundTypes = 'classic';
  public background: string = '/assets/nvos/default_wallpaper_6.jpg';
  public backgroundHistory: string[] = ['/assets/nvos/default_wallpaper_6.jpg', '/assets/nvos/default_wallpaper_2.jpg', '/assets/nvos/default_wallpaper_3.jpg', '/assets/nvos/default_wallpaper_4.jpg', '/assets/nvos/default_wallpaper_5.jpg', '/assets/nvos/default_wallpaper_1.jpg'];
  public backgroundLockscreen: string = '/assets/nvos/default_wallpaper_5.jpg';
  public taskBar: Taskbar = {
    position: 'bottom',
    timeFormat: '%h:%m:%s'
  };
  public screenInfo: screenInformation = {
    width: 0,
    height: 0,
  };
  public language: valid_languages = 'Czech';
  constructor() {
    let admin = new User('admin', true);
    this.users.push(admin);
    this.load();
    this.save();
  }

  public updateResolution(resolution: Record<'width' | 'height', number>): void {
    this.screenInfo = {
      width: resolution.width,
      height: resolution.height
    };
  }

  public setTimeFormat(format: string): void {
    this.taskBar.timeFormat = format;
  }

  public setBackground(background: string) {
    if (!this.backgroundHistory.includes(background)) {
      this.backgroundHistory.pop();
      this.backgroundHistory.unshift(background);
    }
    this.background = background;
  }

  public setLockscreenBackground(background: string) {
    this.backgroundLockscreen = background;
  }

  public uptime(): number {
    return (new Date().getTime() - this.started.getTime());
  }

  public getUsers(): string[] {
    let _: string[] = [];
    this.users.forEach((u) => _.push(u.name.toLowerCase()));
    return _;
  }

  public getUser(user: string): User | null {
    if (!this.checkUser(user.toLowerCase())) return null;
    return this.users.filter(
      (_) => _.name.toLowerCase() == user.toLowerCase()
    )[0];
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

  public switchUser(name: string) {
    if (this.activeUser.toLowerCase() == name.toLowerCase()) return;
    if (!this.getUser(this.activeUser)?.checkAdmin()) return;
    if (this.getUser(name) == null) return;
    this.activeUser = this.getUser(name)?.name as string;
    //TODO
  }

  public setUser(name: string) {
    if (this.checkUser(name)) {
      this.activeUser = name;
    }
  }

  public deleteUser(name: string) {
    if (this.activeUser.toLowerCase() == name.toLowerCase()) return;
    this.users.splice(this.users.indexOf(this.getUser(name) as User));
  }

  public save() {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('activeUser', this.activeUser);
  }

  public load() {
    if (localStorage.getItem('users')) {
      // this.users = JSON.parse(localStorage.getItem("users") as string);
    }
    if (localStorage.getItem('activeUser')) {
      this.activeUser = localStorage.getItem('activeUser') as string;
    }
  }
}

export let device = new Device();

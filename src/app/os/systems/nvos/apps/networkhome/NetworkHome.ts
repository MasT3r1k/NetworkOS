import { Type } from "@angular/core";
import { NetworkappsComponent } from "./networkhome.component";
import { SearchComponent } from "./search/search.component";
import { InstalledComponent } from "./installed/installed.component";
import { ProcessesComponent } from "./processes/processes.component";
import { UsersComponent } from "./users/users.component";

export let ApplicationDatabase: Application[] = [];

class Application {
    declare name: string;
    declare component: Type<any>;
    declare icon: string;
    declare isSystemApp: boolean;

    constructor(name: string, component: Type<any>, icon?: string, systemApp?: boolean) {
        this.name = name;
        this.component = component;
        icon ??= '/assets/nvos/apps/' + name +  '.webp';
        this.icon = icon;
        this.isSystemApp = systemApp || false;
        ApplicationDatabase.push(this);
    }
}

export let sidebar = [{
    icon: 'fa-solid fa-grid-2',
    name: 'Vyhledávat',
    component: SearchComponent
}, {
    icon: 'fa-regular fa-rocket-launch',
    name: 'Nainstalované aplikace',
    component: InstalledComponent
}, {
    icon: 'fa-regular fa-browser',
    name: 'Spuštěné procesy',
    component: ProcessesComponent
}, {
    icon: 'fa-solid fa-users',
    name: 'Uživatelé',
    component: UsersComponent
}];

export function registerProccesses(): void {
    //! REQUIRED APPS !\\
    //! DO NOT TOUCH THIS PART THANKS ;)
    new Application('NetworkHome', NetworkappsComponent, '/assets/nvos/apps/appmanager.png', true);

    //? Other apps
}
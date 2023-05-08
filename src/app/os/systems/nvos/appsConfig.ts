import { Type } from "@angular/core";
import { SettingsComponent } from "./apps/settings/settings.component";
import { LoaderComponent as SettingsLoader } from "./apps/settings/loader/loader.component";
import { TaskmanagerComponent } from "./apps/taskmanager/taskmanager.component";
import { LoaderComponent as TaskManagerLoader } from "./apps/taskmanager/loader/loader.component";

interface appConfig {
    id: string;
    component: Type<any>;
    name: string;
    loader: Type<any>;
    Windows: number[];
    maxWindows: number;
}

class App implements appConfig {
    declare component: Type<any>;
    declare loader: Type<any>;
    declare id: string;
    declare name: string;
    Windows: number[] = [];
    maxWindows: number = 1;
    hidden: boolean = false;
    
    constructor(id: string, name: string, hidden?:boolean, component?: Type<any>, loader?: Type<any>) {
        this.id = id;
        if (component) {
            this.component = component;
        }
        if (loader) {
            this.loader = loader;
        }
        if (hidden) {
            this.hidden = hidden;
        }
        this.name = name;
    }
}

export let appsConfig: Record<string, App> = {
    Settings: new App('Settings', 'Nastavení', false, SettingsComponent, SettingsLoader),
    TaskManager: new App('TaskManager', 'Správce úloh', false, TaskmanagerComponent, TaskManagerLoader),
    NetworkTime: new App('NetworkTime', 'Správa času a datumu systému', true),
    NetworkNotifications: new App('NetworkNotifications', 'Správa oznámení systému', true),
    NetworkSearch: new App('NetworkSearch', 'Vyhledávání v systému', true),
    NetworkDiskManager: new App('NetworkDiskManager', 'Správa disků v zařízení', true)
};
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
    
    constructor(id: string,name: string, component: Type<any>, loader: Type<any>) {
        this.id = id;
        this.component = component;
        this.loader = loader;
        this.name = name;
    }
}

export let appsConfig: Record<string, App> = {
    Settings: new App('Settings', 'Nastavení', SettingsComponent, SettingsLoader),
    TaskManager: new App('TaskManager', 'Správce úloh', TaskmanagerComponent, TaskManagerLoader)
};
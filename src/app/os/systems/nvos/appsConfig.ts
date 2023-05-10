import { Type } from "@angular/core";
import { SettingsComponent } from "./apps/settings/settings.component";
import { LoaderComponent as SettingsLoader } from "./apps/settings/loader/loader.component";
import { TaskmanagerComponent } from "./apps/taskmanager/taskmanager.component";
import { LoaderComponent as TaskManagerLoader } from "./apps/taskmanager/loader/loader.component";
import { TerminalComponent } from "./apps/terminal/terminal.component";

interface appConfig {
    id: string;
    component: Type<any>;
    name: string;
    loader: Type<any>;
    Windows: number[];
    maxWindows: number;
}

export class windowAppConfig implements appConfig {
    declare component: Type<any>;
    declare loader: Type<any>;
    declare id: string;
    declare name: string;
    Windows: number[] = [];
    maxWindows: number = 1;
    hidden: boolean = false;
    
    constructor(id: string, name: string, hidden:boolean = false, component?: Type<any>, loader?: Type<any>) {
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

export let appsConfig: Record<string, windowAppConfig> = {
    Settings: new windowAppConfig('Settings', 'Nastavení', false, SettingsComponent, SettingsLoader),
    TaskManager: new windowAppConfig('TaskManager', 'Správce úloh', false, TaskmanagerComponent, TaskManagerLoader),
    Terminal: new windowAppConfig('Terminal', 'Terminál', false, TerminalComponent)
};
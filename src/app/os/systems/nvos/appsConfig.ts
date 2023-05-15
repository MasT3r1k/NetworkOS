import { Type } from "@angular/core";
import { SettingsComponent } from "./apps/settings/settings.component";
import { LoaderComponent as SettingsLoader } from "./apps/settings/loader/loader.component";
import { TaskmanagerComponent } from "./apps/taskmanager/taskmanager.component";
import { LoaderComponent as TaskManagerLoader } from "./apps/taskmanager/loader/loader.component";
import { TerminalComponent } from "./apps/terminal/terminal.component";
import { NetworkLanguages } from "./locale";

interface appConfig {
    id: string;
    component: Type<any>;
    loader: Type<any>;
    maxWindows: number;
}

export class windowAppConfig implements appConfig {
    declare component: Type<any>;
    declare loader: Type<any>;
    declare id: string;
    public maxWindows: number = 1;
    hidden: boolean = false;
    
    constructor(id: string, hidden:boolean = false, component?: Type<any>, loader?: Type<any>) {
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
    }
}

export let appsConfig: Record<string, windowAppConfig> = {
    Settings: new windowAppConfig('Settings', false, SettingsComponent, SettingsLoader),
    TaskManager: new windowAppConfig('TaskManager', false, TaskmanagerComponent, TaskManagerLoader),
    Terminal: new windowAppConfig('Terminal', false, TerminalComponent)
};

appsConfig['Terminal'].maxWindows = -1;
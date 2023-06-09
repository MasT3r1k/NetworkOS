import { Type } from "@angular/core";
import { device } from "../../system";
import { DisplayComponent as Display } from "./display/display.component";
import { LockscreenComponent as Lockscreen } from "./lockscreen/lockscreen.component";
import { ApperanceComponent as Apperance } from "./apperance/apperance.component";
import { SoundComponent as Sound } from "./sound/sound.component";
import { NotificationsComponent as Notifications } from "./notifications/notifications.component";
import { StorageComponent as Storage } from "./storage/storage.component";
import { UsersComponent as Users } from "./users/users.component";
import { LanguageComponent as Language } from "./language/language.component";
import { UpdatesystemComponent as UpdateSystem } from "./updatesystem/updatesystem.component";
import { AboutsystemComponent as AboutSystem } from "./aboutsystem/aboutsystem.component";
import { MultitaskComponent as MultiTask } from "./multitask/multitask.component";
import { ManageComponent as Manage } from "./manage/manage.component";
import { SourcecodeComponent as SourceCode } from "./sourcecode/sourcecode.component";

interface Sidebar {
    display: string;
    visibility: boolean;
    items: page[];
}

interface page {
    icon: string;
    text: string;
    component: Type<any> | null;
}

class SettingsApp {
    sidebar: Sidebar[] = [{
        display: "Systém",
        visibility: true,
        items: [{
            icon: 'fa-regular fa-display',
            text: 'Obrazovka',
            component: Display
        }, {
            icon: 'fa-solid fa-lock',
            text: 'Zamykací obrazovka',
            component: Lockscreen
        }, {
            icon: 'fa-solid fa-paintbrush-fine',
            text: 'Vzhled',
            component: Apperance
        }, {
            icon: 'fa-solid fa-volume',
            text: 'Zvuk',
            component: Sound
        }, {
            icon: 'fa-solid fa-bell',
            text: 'Oznámení',
            component: Notifications
        }, {
            icon: 'fa-solid fa-hard-drive',
            text: 'Uložiště',
            component: Storage
        }, {
            icon: 'fa-solid fa-users',
            text: 'Uživatelé',
            component: Users
        }, {
            icon: 'fa-solid fa-language',
            text: 'Jazyk',
            component: Language
        }, {
            icon: 'fa-solid fa-shield-halved',
            text: 'Aktualizace systému',
            component: UpdateSystem
        }, {
            icon: 'fa-solid fa-planet-moon',
            text: 'O systému',
            component: AboutSystem
        }]
    }, {
        display: "Developer mode",
        visibility: device.devMode,
        items: [{
            icon: 'fa-solid fa-hippo',
            text: 'Ovládací okno',
            component: MultiTask
        }, {
            icon: 'fa-solid fa-cloud-arrow-down',
            text: 'Správa systému',
            component: Manage
        }, {
            icon: 'fa-brands fa-github',
            text: 'Zdrojový kód systému',
            component: SourceCode
        }]
    }];

    activePage: page = this.sidebar[0].items[0];

    public itemInfo(item: any): { id: number, section: string | undefined } {
        let id: number = 0;
        let section: string | undefined = undefined; 
        this.sidebar.forEach(_ => {
            if (section != undefined) return;
            if (_.items.includes(item)) {
                id += _.items.indexOf(item);
                section = _.display;
            }else{
                id += _.items.length;
            }
        })
        return {id: id, section: section};
    }

}

export let config = new SettingsApp();
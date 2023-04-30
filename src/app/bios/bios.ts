import { BiosConfig } from "./config";
import { Utils } from "../utils/NVUtils";
import { Calendar } from "../utils/calendarManager";
import { cpu } from "../virtualComputer/hardwares/cpu";
import { SystemUtils } from "../utils/systemUtils";
import { Router } from "@angular/router";

type BiosItemType = 'select' | 'input' | 'info' | 'empty' | 'execute';
type BiosScreenType = 'main' | 'flash';
type BiosSectionAnimation = 'left' | 'right';

interface BiosItemSelect {
    selected?: string[] | number[];
    seperator?: string;
    data?: string;
    values: string[];
    dynamicValues?: Function[];
    options?: {
      min?: number;
      max?: number;
      length?: number;
      step?: number;
      execute?: Function;
    }[];
}
interface BiosItem {
    text: string;
    type: BiosItemType;
    description?: string;
    readonly?: boolean;
    dynamic?: boolean;
    execute?: Function[];
    exit?: boolean | string;
    data: BiosItemSelect;
}
interface BiosOptions {
    title: string;
    navbar: string;
    items: BiosItem[];
}
interface BiosTime {
    Time: Date;
    Offset: number;
}

type BiosUserPlatform = 'Administrator' | 'User';

interface BiosSecurity {
    AdministratorPassword: string;
    SataPassword: string[];
    UserPassword: string;
    UserPlatform: BiosUserPlatform
}


export namespace Bios {
    export const Language: BiosConfig.supported_languages = "Czech";
    export let BiosPage: number = 0;
    export let BiosPages: string[] = [];
    export let selected_item: number = 0;
    export let editing_item: number | null = null;
    export let modal_item: string | number = 0;
    export let animation: BiosSectionAnimation | null = null;
    export let biosScreenType: BiosScreenType = 'main';
    export let Time: BiosTime = {
        Time: Calendar.time,
        Offset: Calendar.offset
    };

    export function reloadBios() {
        Bios.BiosPage = 0;
        Bios.BiosPages = [];
        Bios.selected_item = 0;
        Bios.editing_item = null;
        Bios.modal_item = 0;
        Bios.animation = null;
        Bios.biosScreenType = 'main';
    }


    export function moveTo(page: number) {
        if (Bios.editing_item != null) return;
        if (Bios.animation !== null) return;
        if (page == Bios.BiosPage) return;
        if (page == Bios.BiosPages.length) return;
        if (!Bios.BiosPages[page] || !Bios.BiosOptions[page]) return;
        let direction: BiosSectionAnimation = (page < Bios.BiosPage) ? 'left' : 'right';
        Bios.animation = direction;
        setTimeout(() => {
          Bios.BiosPage = page;
          Bios.selectItem(null);
          Bios.animation = null;
        }, 350)
      }
    

    export function selectItem(id: number | null) {
        if (Bios.editing_item != null) return;
        if (id === null) {
          let newId = 0;
          while (Bios.BiosOptions[Bios.BiosPage].items[newId]) {
            if (!(Bios.BiosOptions[Bios.BiosPage].items[newId].readonly == true)) {
                Bios.selected_item = newId;
                return;
            }
            newId += 1;
          }
        }
        else if (Bios.BiosOptions[Bios.BiosPage].items[id as number]?.readonly !== true) {
            Bios.selected_item = id;
        }
      }
    
    export let default_config = {
        lgn: 1,                 // Language
        tof: 0,                 // Time offset
        nb: 0,                  // Network boot
        wl: 0,                  // Wireless LAN
        gh: 0,                  // Graphic Device
        wol: 0,                 // Wake on LAN
        bbf: 1,                 // BIOS Back flash
        svm: 0,                 // AMD-SVM
        iommu: 0,               // AMD-IOMMU
        bm: 0,                  // Boot mode
        fb: 0,                  // Fast boot
        sb: 0,                  // Secure boot
        pm: 0,                  // Platform mode
        bpo: 0,                 // Boot priority order
        apwd: '',               // Administrator password
        upwd: '',               // User password
        spwd: []                // Sata password
    }

    export let data = JSON.parse(localStorage.getItem('bios-options') as string) || default_config;

    export let Security: BiosSecurity = {
        AdministratorPassword: data.apwd,
        SataPassword: data.spwd,
        UserPassword: data.upwd,
        UserPlatform: (data.pm) ? 'User' : 'Administrator'
    };

    export function resetBios() {
        data = Bios.default_config;
    }
    
    export function restoreBios() {
        data = JSON.parse(localStorage.getItem('bios-options') as string) || Bios.default_config;
    }
    
    export function saveBios() {
        localStorage.setItem("bios-options", JSON.stringify(data));
        return localStorage.getItem("bios-options");
    }


    export let BiosOptions: BiosOptions[] = [
        {
            navbar: "Main",
            title: "System overview",
            items: [
            {
                text: 'System Language',
                type: 'select',
                description: 'Choose the default language',
                data: {
                    data: 'lgn',
                    selected: [data.lgn],
                    values: ['Czech', 'English']
                }
            }, {
                text: 'System Time',
                type: 'input',
                description: 'Change system time',
                dynamic: true,
                data: {
                    seperator: ':',
                    options: [{
                        min: 0,
                        max: 23,
                        step: 1
                    }, {
                        min: 0,
                        max: 59,
                        length: 2,
                        step: 1
                    },
                    {
                        min: 0,
                        max: 59,
                        length: 2,
                        step: 1
                    }],
                    values: [],
                    dynamicValues: [Calendar.getHours, Calendar.getMinutes, Calendar.getSeconds]
                }
            }, {
                text: 'System Date',
                type: 'input',
                description: 'Change system date',
                dynamic: true,
                data: {
                    seperator: '/',
                    options: [{
                        min: 1,
                        max: 12,
                        step: 1
                    }, {
                        min: 1,
                        max: Calendar.getDays(Calendar.getMonth(), Calendar.getFullYear()),
                        step: 1
                    },
                    {
                        min: 1970,
                        max: 9999,
                        step: 1
                    }],
                    values: [],
                    dynamicValues: [Calendar.getMonth, Calendar.getDate, Calendar.getFullYear]
                }
            }, {
                text: 'Network Boot',
                type: 'select',
                description: 'Enable/Disable PXE Boot on to LAN',
                data: {
                    data: 'nb',
                    selected: [data.nb],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Wireless LAN',
                type: 'select',
                description: 'Enable/Disable wireless LAN device',
                data: {
                    data: 'wl',
                    selected: [data.wl],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Graphic Device',
                type: 'select',
                description: 'Select graphic device<br><b>[Discrete]</b> - Enable the integrated and discrete graphic controller.<br><b>[UMA Only]</b> - Enable integrated graphic controller only.',
                data: {
                    data: 'gh',
                    selected: [data.gh],
                    values: ['Discrete', 'UMA Only']
                }
            }, {
                text: 'Wake on LAN',
                type: 'select',
                description: 'Enable/Disable Integrated LAN to wake the system',
                data: {
                    data: 'wol',
                    selected: [data.wol],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'BIOS Back Flash',
                type: 'select',
                description: 'Allow BIOS to be back levelled to a previous version',
                data: {
                    data: 'bbf',
                    selected: [data.bbf],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Processor Type',
                type: 'info',
                readonly: true,
                data: {
                    values: [cpu.name + " @ " + SystemUtils.formatSize(cpu.speed, 'G', 'Hz', 1) + " (" + cpu.type + "bit)"]
                }
            }, {
                text: 'Processor Speed',
                type: 'info',
                readonly: true,
                data: {
                    values: [SystemUtils.formatSize(cpu.speed, 'auto', 'Hz', 2)]
                }
            }, {
                text: 'Cache Size',
                type: 'info',
                readonly: true,
                data: {
                    values: [SystemUtils.formatSize(cpu.cache, 'K', 'bit', 3)]
                }
            }, {
                text: 'Total Memory',
                type: 'info',
                readonly: true,
                data: {
                    values: [SystemUtils.formatSize(cpu.maxMemory, 'auto', 'Bit', 0)]
                }
            }, {
                text: 'Serial Number',
                type: 'info',
                readonly: true,
                data: {
                    values: [Utils.randomChar(22).toLocaleUpperCase()]
                }
            }]
        }, {
            navbar: "Advanced",
            title: "Advanced options",
            items: [{
                text: 'AMD-SVM',
                type: 'select',
                description: 'This is AMD virtualization function switch',
                data: {
                    data: 'svm',
                    selected: [data.svm],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'AMD-IOMMU',
                type: 'select',
                description: 'This is AMD virtualization function switch',
                data: {
                    data: 'iommu',
                    selected: [data.iommu],
                    values: ['Enabled', 'Disabled']
                }
            }]
        }, {
            navbar: "Boot",
            title: "Boot options",
            items: [{
                text: 'Administrator Password',
                type: 'info',
                readonly: true,
                data: {
                    selected: [0],
                    values: [Utils.isEmpty(Bios.Security.AdministratorPassword) ? 'Not set' : 'Set']
                }
            }, {
                text: 'User Password',
                type: 'info',
                readonly: true,
                data: {
                    selected: [0],
                    values: [Utils.isEmpty(Bios.Security.UserPassword) ? 'Not set' : 'Set']
                }
            }, {
                text: 'HDD Password',
                type: 'info',
                readonly: true,
                data: {
                    selected: [0],
                    values: [Utils.isEmpty(Bios.Security.SataPassword) ? 'Not set' : 'Set']
                }
            }, {
                text: 'Set Administrator Password',
                type: 'execute',
                description: 'Set Administrator password to secure bios',
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Set SATA Hard Disk Passwords',
                type: 'execute',
                description: 'Set password to secure disk',
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Boot Mode',
                type: 'select',
                description: 'Set System Boot Mode<br><b>[UEFI]</b> - For OS need pure UEFI<br><b>[Legacy]</b> - For OS need legacy support',
                data: {
                    data: 'bm',
                    selected: [data.bm],
                    values: ['UEFI', 'Legacy']
                }
            }, {
                text: 'Fast Boot',
                type: 'select',
                description: 'Enable/Disable Fast Boot',
                data: {
                    data: 'fb',
                    selected: [data.fb],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Secure Boot',
                type: 'select',
                description: 'Enable/Disable Secure Boot',
                data: {
                    data: 'sb',
                    selected: [data.sb],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Platform Mode',
                type: 'info',
                readonly: true,
                data: {
                    data: 'pm',
                    selected: [data.pm],
                    values: [(Bios.Security.UserPlatform == "User") ? 'User Mode' : 'Admin Mode']
                }
            }, {
                text: 'Boot priority order',
                type: 'select',
                description: 'Set boot priority',
                data: {
                    data: 'bpo',
                    selected: [data.bpo],
                    values: ['1. IBM 1405', '2. Samsung 860 EVO M.2 (NVOS)']
                }
            }]
        }, {
            navbar: "Tools",
            title: "Tools options",
            items: [{
                text: 'Flash disk 16GB (Bios Flash)',
                type: 'execute',
                description: 'Run the utility to select or update BIOS. This utility supports: Fat 12/16/32, NTFS, CD-DISC',
                exit: 'flash',
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Flash disk 64GB (NVOS Flash)',
                type: 'execute',
                description: 'Run the utility to install operation system: NVOS. This utility supports: NTFS',
                exit: 'flash',
                data: {
                    selected: [0],
                    values: []
                }
            }]
        }, {
            navbar: "Exit",
            title: "Exit",
            items: [{
                text: 'Load Optimized Defaults',
                type: 'execute',
                description: 'Restores/loads the default values for all the setup options',
                execute: [resetBios],
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Save Changes & Exit',
                type: 'execute',
                description: 'Exit BIOS and save your changes to CMOS',
                execute: [saveBios],
                exit: true,
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Discard Changes & Exit',
                type: 'execute',
                description: 'Exit BIOS without saving any changes',
                exit: true,
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: ' ',
                type: 'empty',
                readonly: true,
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Save Changes',
                type: 'execute',
                description: 'Save your changes to CMOS',
                execute: [saveBios],
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Discard Changes',
                type: 'execute',
                description: 'Restore changes to previous version',
                execute: [restoreBios],
                data: {
                    selected: [0],
                    values: []
                }
            }]
        }
    ]
    export const Version: string = "1.0.0 Alpha";

    export const variables: Record<string, string> = {
        description: "Created by MasTerik"
    }

    function updateOptions(BiosOptions: BiosOptions[]) {
        BiosOptions.forEach((section) => {
            section.items.filter((value) => {
                if (value.dynamic == true && value.data.dynamicValues) {
                    value.data.dynamicValues?.forEach((func: Function, index: number) => {
                        value.data.values[index] = func().toString();
                    })
                }
            });
        })
    }

    updateOptions(Bios.BiosOptions);
    setInterval(() => {
        updateOptions(Bios.BiosOptions);
    }, 1000)

    export function keyboardEvent(key: string, lastItem: number, newItem: number, router: Router) {
        switch(key) {
            case "ArrowUp":
                if (Bios.biosScreenType == 'main') {
                    if (Bios.editing_item == null) {
                        while (Bios.BiosOptions[Bios.BiosPage].items[newItem - 1] && lastItem == Bios.selected_item) {
                        newItem -= 1;
                        Bios.selectItem(newItem);
                        }
                    }else{
                        let item = Bios.modal_item;
                        if (Bios.BiosOptions[Bios.BiosPage].items[Bios.editing_item].data.values?.[item as number - 1]) {
                        Bios.modal_item = item as number - 1;
                        }
                    }
                }
                break;
            case "ArrowDown":
                if (Bios.biosScreenType == 'main') {
                    if (Bios.editing_item == null) {
                        while (Bios.BiosOptions[Bios.BiosPage].items[newItem + 1] && lastItem == Bios.selected_item) {
                            newItem += 1;
                            Bios.selectItem(newItem);
                        }
                    }else{
                        let item = Bios.modal_item;
                        if (Bios.BiosOptions[Bios.BiosPage].items[Bios.editing_item].data.values?.[item as number + 1]) {
                            Bios.modal_item = item as number + 1;
                        }
                    }
                }
                break;
            case "ArrowLeft":
                if (Bios.biosScreenType == 'main') {
                Bios.moveTo(Bios.BiosPage - 1);
                }
                break;
            case "ArrowRight":
                if (Bios.biosScreenType == 'main') {
                Bios.moveTo(Bios.BiosPage + 1);
                }
                break;
            case "Enter":
                let item = Bios.BiosOptions[Bios.BiosPage].items[Bios.selected_item];
                if (Bios.editing_item == null) {
                switch(item.type) {
                    case "select":
                    Bios.editing_item = Bios.selected_item;
                    Bios.modal_item = item.data?.selected?.[0] as string | number;
                    break;
                    case "execute":
                    Bios.BiosOptions[Bios.BiosPage].items[Bios.selected_item].execute?.forEach(func => {
                        func()
                    });
                    switch(Bios.BiosOptions[Bios.BiosPage].items[Bios.selected_item].exit){
                        case true:
                        router.navigate(['/']);
                        break;
                        case "flash":
                        Bios.biosScreenType = 'flash';
                        break;
                    }
                    break;
                    default:
                    console.error("Enter event is missing.");
                    break;
                }
                }else{
                item.data.selected = [Bios.modal_item as number];
                Bios.data[item.data?.data as string] = Bios.modal_item as string;
                Bios.editing_item = null;
                }
                break;
            case "Escape":
                if (Bios.biosScreenType == 'main') {
                if (Bios.editing_item != null) {
                    Bios.editing_item = null;
                }
                }else if (Bios.biosScreenType == 'flash') {
                Bios.biosScreenType = 'main';
                }
                break;
            }
        
    }

}

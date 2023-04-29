import { BiosConfig } from "./config";
import { Utils } from "../utils/NVUtils";
import { Calendar } from "../utils/calendarManager";
import { cpu } from "../virtualComputer/hardwares/cpu";
import { SystemUtils } from "../utils/systemUtils";

type BiosItemType = 'select' | 'input' | 'info' | 'empty' | 'execute';
interface BiosItemSelect {
    selected?: string[] | number[];
    seperator?: string;
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
    execute?: Function;
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
    SecureBoot: number;
    AdministratorPassword: string;
    SataPassword: string[];
    UserPassword: string;
    UserPlatform: BiosUserPlatform
}


export namespace Bios {
    export const Language: BiosConfig.supported_languages = "Czech";
    export let Time: BiosTime = {
        Time: Calendar.time,
        Offset: Calendar.offset
    };
    
    let data = {
        lgn: 1,                 // Language
        tof: Calendar.offset,   // Time offset
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

    export let Security: BiosSecurity = {
        SecureBoot: data.sb,
        AdministratorPassword: '',
        SataPassword: [],
        UserPassword: '',
        UserPlatform: (data.pm) ? 'User' : 'Administrator'
    };


    localStorage.setItem("bios-options", JSON.stringify(data));

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
                    selected: [data.nb],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Wireless LAN',
                type: 'select',
                description: 'Enable/Disable wireless LAN device',
                data: {
                    selected: [data.wl],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Graphic Device',
                type: 'select',
                description: 'Select graphic device<br><b>[Discrete]</b> - Enable the integrated and discrete graphic controller.<br><b>[UMA Only]</b> - Enable integrated graphic controller only.',
                data: {
                    selected: [data.gh],
                    values: ['Discrete', 'UMA Only']
                }
            }, {
                text: 'Wake on LAN',
                type: 'select',
                description: 'Enable/Disable Integrated LAN to wake the system',
                data: {
                    selected: [data.wol],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'BIOS Back Flash',
                type: 'select',
                description: 'Allow BIOS to be back levelled to a previous version',
                data: {
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
                    selected: [data.svm],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'AMD-IOMMU',
                type: 'select',
                description: 'This is AMD virtualization function switch',
                data: {
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
                    selected: [data.bm],
                    values: ['UEFI', 'Legacy']
                }
            }, {
                text: 'Fast Boot',
                type: 'select',
                description: 'Enable/Disable Fast Boot',
                data: {
                    selected: [data.fb],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Secure Boot',
                type: 'select',
                description: 'Enable/Disable Secure Boot',
                data: {
                    selected: [Security.SecureBoot],
                    values: ['Enabled', 'Disabled']
                }
            }, {
                text: 'Platform Mode',
                type: 'info',
                readonly: true,
                data: {
                    selected: [data.pm],
                    values: [(Bios.Security.UserPlatform == "User") ? 'User Mode' : 'Admin Mode']
                }
            }, {
                text: 'Boot priority order',
                type: 'select',
                description: 'Set boot priority',
                data: {
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
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Flash disk 64GB (NVOS Flash)',
                type: 'execute',
                description: 'Run the utility to install operation system: NVOS. This utility supports: NTFS',
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
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Save Changes & Exit',
                type: 'execute',
                description: 'Exit BIOS and save your changes to CMOS',
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Discard Changes & Exit',
                type: 'execute',
                description: 'Exit BIOS without saving any changes',
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
                data: {
                    selected: [0],
                    values: []
                }
            }, {
                text: 'Discard Changes',
                type: 'execute',
                description: 'Restore changes to previous version',
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

}
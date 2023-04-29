import { Type } from "@angular/core";
import { valid_systems } from "../os/systems/systems";

export interface SystemConfig extends Record<string, any> {
    id: valid_systems;                                                        //* OS Identification ! REQUIRED
    name: string;                                                           //* OS name
    buildOs?: string;                                                        //* OS version / default: 1.0
    mainComponent: Type<any>;                                               //* OS Main component
    loaderComponent?: Type<any>;                                             //* OS Loader component / default grub loader
    system_disk: number; // TODO: Accept only registered disk               //* Disk where is os installed
    author?: string;                                                         //* OS Author / default: Anonymous
    color?: string;                                                         //* Main color of os (for better orientation in grub menu)
    options?: Record<string, any>;                                           //* OS options (optional)
}

export namespace SystemUtils {
    export function formatSize(bits: number, specifedIn: string = "auto", suffix: string = "Bit", fixed: number = 2) {
        switch(true) {
            case (bits >= 8796093022208 && specifedIn == 'auto') || specifedIn == 'T':
                return (bits / 8796093022208).toFixed(fixed) + "T" + suffix;
            case (bits >= 8589934592 && specifedIn == 'auto') || specifedIn == 'G':
                return (bits / 8589934592).toFixed(fixed) + "G" + suffix;
            case (bits >= 8388608 && specifedIn == 'auto') || specifedIn == 'M':
                return (bits / 8388608).toFixed(fixed) + "M" + suffix;
            case (bits >= 8192 && specifedIn == 'auto') || specifedIn == 'K':
                return (bits / 8192).toFixed(fixed) + "K" + suffix;
            default:
                return bits.toFixed(fixed) + "b";
        }
    }

}
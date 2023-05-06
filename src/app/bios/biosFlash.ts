import { Type } from "@angular/core";
import { Grub } from "../grub/grub";
import { valid_systems } from "../os/systems/systems";
import { SystemConfig } from "../utils/systemUtils";
import { valid_bios } from "./bios";

export namespace BiosFlash {
    export type FlashTypes = 'os' | 'bios';
    export let status: boolean = false;
    export let type: FlashTypes | null = null;
    export let system: SystemConfig | null = null;
    export let bios: null = null;
    export let title: string = '';
    export let customInstaller: Type<any> | null = null;

    export function exitFlash(): void {
        BiosFlash.type = null;
        BiosFlash.status = false;
        BiosFlash.system = null;
        BiosFlash.bios = null;
        BiosFlash.title = '';
        BiosFlash.customInstaller = null;
    }

    export function installOS(name: valid_systems) {
        BiosFlash.type = 'os';
        BiosFlash.status = true;
        BiosFlash.system = Grub.GetSystems()[name as valid_systems];
        Grub.loadInstallation(name as valid_systems);
        BiosFlash.title = BiosFlash.system.name;
        BiosFlash.customInstaller = BiosFlash.system.installComponent || null;
    }

    export function installBIOS(name: valid_bios) {
        BiosFlash.type = 'bios';
        BiosFlash.status = true;
        BiosFlash.bios = null;
        BiosFlash.title = 'Updating new BIOS: ' + name;
    }


}
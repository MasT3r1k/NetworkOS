import { config as NVOSConfig } from "../os/systems/nvos/config";
import { valid_systems } from "../os/systems/systems";
import { SystemConfig } from "../utils/systemUtils";

type Loader = 'systems' | 'install' | 'loadSystem';

interface GrubInterface {
    selected_system: valid_systems | null;
    systems: Record<valid_systems, SystemConfig>;
}


class GrubClass implements GrubInterface {
    declare loader: Loader;

    selected_system: valid_systems | null = null;
    systems: Record<valid_systems, SystemConfig> = {
        NVOS: NVOSConfig
    };

    constructor() {
        this.resetGrub();
    }

    public GetSystems(): Record<valid_systems, SystemConfig> {
        return this.systems;
    }

    public SelectSystem(name: valid_systems): void {
        this.selected_system = name;
    }

    public GetSelectedSystem(): SystemConfig | null {
        if (this.selected_system === null) return null;
        return this.systems[this.selected_system];
    }

    public loadInstallation(system: valid_systems): void {
        this.loader = 'install';
        this.selected_system = system;
    }

    public resetGrub(): void {
        this.loader = 'systems';
        this.selected_system = null;
    }

    public loadIntoSystem(): void {
        this.loader = 'loadSystem';
    }

}

export const Grub = new GrubClass();
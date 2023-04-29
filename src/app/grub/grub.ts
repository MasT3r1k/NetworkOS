import { config as NVOSConfig } from "../os/systems/nvos/config";
import { valid_systems } from "../os/systems/systems";
import { SystemConfig } from "../utils/systemUtils";


interface GrubInterface {
    selected_system: valid_systems | null;
    systems: Record<valid_systems, SystemConfig>;
}


class GrubClass implements GrubInterface {
    selected_system: valid_systems | null = null;
    systems: Record<valid_systems, SystemConfig> = {
        NVOS: NVOSConfig,
        TestOS: NVOSConfig
    };

    constructor() { 
     }

    public GetSystems() {
        return this.systems;
    }

    public SelectSystem(name: valid_systems): void {
        this.selected_system = name;
    }

    public GetSelectedSystem() {                            //! NULL = not selected system, other = system config
        if (this.selected_system === null) return null;
        return this.systems[this.selected_system];
    }
}

export const Grub = new GrubClass();
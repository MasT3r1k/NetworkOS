import { Utils } from "src/app/utils/NVUtils";
import { Processes } from "./Process";

interface ContentItem {
    text: string;
    action: Function;
}

export class ContextMenu {
    public active: boolean = false;
    public items: ContentItem[] = [];
    public coordinates: Utils.Coordinates = {
        x: 0,
        y: 0
    };
    declare process: Processes.Process;
    constructor() { }

    public set(data: any, event: MouseEvent) {
        this.active = false;
        setTimeout(() => {
            this.items = [];
            if (data && data.type == 'desktopItem' && data.process) {
                this.coordinates = {
                    x: event.clientX,
                    y: event.clientY
                }
                let proces = Processes.processes?.[data.process];
                this.items.push({text: (proces) ? 'Zavřít' : 'Spustit', action: () => {
                    if (proces) {
                        proces.closeProcess();
                    }else{
                        Processes.createProcess(data.process);
                    }
                }})
                this.active = true;
            }
        }, 5);
    }
}

export let context = new ContextMenu(); 
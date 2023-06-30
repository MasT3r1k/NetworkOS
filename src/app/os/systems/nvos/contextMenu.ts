import { Utils } from "src/app/utils/NVUtils";
import { Processes } from "./Process";
import { NProcesses } from "./Main/Processes";

interface ContentItem {
    text: string;
    action: Function;
}

class ContextButton implements ContentItem {
    public text: string = '';
    public action: Function = () => {};

    constructor(text: string, func: Function) {
        this.text = text;
        this.action = func;
        context.items.push(this);
    }


}

export class ContextMenu {
    public active: boolean = false;
    public items: ContextButton[] = [];
    public coordinates: Utils.Coordinates = {
        x: 0,
        y: 0
    };
    declare process: NProcesses.Process;
    constructor() { }

    public set(data: any, event: MouseEvent) {
        this.active = false;
        setTimeout(() => {
            this.items = [];
            if (data && data.type == 'desktopItem' && data.process && data.item) {
                this.coordinates = {
                    x: event.clientX,
                    y: event.clientY
                }
                let proces = NProcesses.getProcess(data.process);
                if (!proces) return;
                new ContextButton((proces && proces.getRunning()) ? 'Zavřít' : 'Spustit', (proces.getRunning()) ? () => proces?.kill() : () => proces?.run());
                if (proces && proces.getRunning() && proces.getWindows.length > 0 && proces.canOpenNextWindow()) {
                    new ContextButton('Otevřít další okno', () => Processes.createProcess(data.process))
                }
                new ContextButton('Přejmenovat', () => {
                    data.item.editing = true;
                });
                this.active = true;
            }
        }, 5);
    }
}

export let context = new ContextMenu(); 
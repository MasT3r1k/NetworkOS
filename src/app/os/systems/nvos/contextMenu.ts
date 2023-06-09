import { Utils } from "src/app/utils/NVUtils";
import { Processes } from "./Process";

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
    declare process: Processes.Process;
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
                let proces = Processes.processes?.[data.process];
                new ContextButton((proces) ? 'Zavřít' : 'Spustit', (proces) ? () => proces.closeProcess() : () => Processes.createProcess(data.process));
                if (proces && proces.windows.length > 0 && proces.maxWindows < proces.windows.length) {
                    new ContextButton('Otevřít další okno', () => Processes.createProcess(data.process))
                }
                new ContextButton('Přejmenovat', () => {data.item.text = 'Přejmenováno'});
                this.active = true;
            }
        }, 5);
    }
}

export let context = new ContextMenu(); 
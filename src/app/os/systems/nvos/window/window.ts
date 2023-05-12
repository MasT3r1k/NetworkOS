import { Type } from "@angular/core";
import { NetworkPerms } from "../PermissionSystem";

type windowButtons = 'close' | 'maximize' | 'minimize';

interface App {
    process: string;
    title: string;
    width: number;
    height: number;
    borderRadius: number;
    buttons: Record<windowButtons, boolean>;
    maximazed: boolean;
    minimazed: boolean;
    component: Type<any> | null;
    loader?: Type<any>;
    loaded: boolean;
    needPerms?: NetworkPerms.requiredPerms;
    hasPerms: NetworkPerms.appPerms[];
    disabled: boolean;
    hidden: boolean;
}

export let WindowOrder: WindowApp[] = [];
export let WindowActive: WindowApp | null = null;

export function unActiveWindow() {
    WindowActive = null;
}

export class WindowApp implements App {
    declare process: string;
    declare title: string;
    width: number = 1000;
    height: number = 600;
    component: Type<any> | null = null;
    borderRadius: number = 8;
    declare loader: Type<any>;
    loaded: boolean = false;
    disabled: boolean = false;
    public buttons: Record<windowButtons, boolean> =  {
        close: true, // DEFAULT: TRUE
        maximize: true, // DEFAULT: TRUE
        minimize: true, // DEFAULT: TRUE
    };
    maximazed: boolean = false;
    minimazed: boolean = false;
    hidden: boolean = false;
    hasPerms: NetworkPerms.appPerms[] = [];
    moving: boolean = false;

    public _temp: any = {};

    constructor(process: string, title: string, loader?: Type<any>) {
        this.process = process;
        this.title = title;
        if (loader) this.loader = loader;
        WindowOrder.push(this);
        WindowActive = this;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    loadComponent(component: Type<any>): void {
        this.component = component;
    }

    setButtons(btns: windowButtons, boolean: boolean): void {
        this.buttons[btns] = boolean;
    }

    maximaze(): void {
        this.maximazed = !this.maximazed;
    }
    minimaze(): void {
        this.minimazed = !this.minimazed;
        if (this.minimazed) {
            setTimeout(() => {
                this.hidden = true;
            }, 300)
        }else{
            this.hidden = false;
        }
    }

    activeWindow(): void {
        WindowOrder.splice(WindowOrder.indexOf(this), 1);
        WindowOrder.push(this);
        WindowActive = this;
    }

    move(event: MouseEvent): void {
        let pos1 = 0, pos2 = 0, pos3 = event.clientX, pos4 = event.clientY;
        let windowA = event.target as HTMLBaseElement;
        let desktop = event.target as HTMLBaseElement;
        if (!windowA || !desktop) return;
        while (windowA.className !== 'window') {
            windowA = windowA.offsetParent as HTMLBaseElement;
        }
        while (desktop.className !== 'desktop') {
            desktop = desktop.offsetParent as HTMLBaseElement;
        }
        

        desktop.onmousemove = function(e) {
            e.preventDefault();

            if (!windowA.classList.contains('moving')) { windowA.classList.add("moving"); }

            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;

            pos3 = e.clientX;
            pos4 = e.clientY;

            if (((windowA.offsetTop as number) - pos2) >= windowA.offsetHeight / 2 && ((windowA.offsetTop as number) - pos2) + windowA.offsetHeight / 2 <= desktop.clientHeight) {
                windowA.style.top = ((windowA.offsetTop as number) - pos2) + 'px';
            }
            if (((windowA.offsetLeft as number) - pos1) >= windowA.offsetWidth / 2 && ((windowA.offsetLeft as number) - pos1) + windowA.offsetWidth / 2 <= desktop.clientWidth) {
                windowA.style.left = ((windowA.offsetLeft as number) - pos1) + 'px';
            }
        }

        desktop.onmouseup = function() {
            if (windowA.classList.contains('moving')) { windowA.classList.remove("moving"); }
            desktop.onmouseup = null;
            desktop.onmousemove = null;
        }
    }

    disable(): void {
        this.disabled = true;
    }


}
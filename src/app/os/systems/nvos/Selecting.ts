import { moving } from "./window/window";

export namespace Selecting {
    export interface Point {
        x: number;
        y: number;
    }

    export class DesktopSelectorClass {
        firstPoint: Point = {x: 0, y: 0};
        secondPoint: Point = {x: 0, y: 0};
        active: boolean = false;

        declare selectContains: string[];

        constructor() {}

        public createSelector(x: number, y: number) {
            this.firstPoint = {x: x, y: y};
            this.secondPoint = {x: x, y: y};
            this.selectContains = [];
        }

        public activeSelector(event: MouseEvent) {
            this.createSelector(event.clientX, event.clientY);
            let desktop: HTMLBaseElement | null = event.target as HTMLBaseElement;
            if (!desktop) return;
            while (desktop && desktop.className !== 'desktop') {
                if (desktop.classList.contains('item') && !desktop.classList.contains('empty')) {
                    desktop = null;
                    event.preventDefault();
                    return;
                } else {
                    if (desktop != null) {
                        desktop = desktop.offsetParent as HTMLBaseElement;
                    }
                }
            }
            if (!desktop) return;
            
            DesktopSelector.active = true;
            moving.toggle(true)
            desktop.onmousemove = function(e) {
                e.preventDefault();
                if (!DesktopSelector.active) return;
                DesktopSelector.secondPoint = {x: e.clientX, y: e.clientY};
            }

            desktop.onmouseup = function() {
                if (!desktop) return;
                moving.toggle(false)
                desktop.onmousedown = null;
                desktop.onmouseup = null;
                DesktopSelector.active = false;
                DesktopSelector.firstPoint = {x: 0, y: 0};
                DesktopSelector.secondPoint = {x: 0, y: 0};
            }
        }

        public isVertically(vertical: boolean) {
            return vertical ? this.firstPoint.y > this.secondPoint.y : this.firstPoint.x > this.secondPoint.x;
        }

        public GetX(first: boolean) {
            return (this.isVertically(false) && first) ? this.secondPoint.x : this.firstPoint.x;
        }

        public GetY(first: boolean) {
            return (this.isVertically(true) && first) ? this.secondPoint.y : this.firstPoint.y;

        }

        public getWidth() {
            return Math.abs(this.secondPoint.x - this.firstPoint.x);
        }

        public getHeight() {
            return Math.abs(this.secondPoint.y - this.firstPoint.y);

        }
    }

    export let DesktopSelector = new DesktopSelectorClass();
}
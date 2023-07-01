export class Expander {

    private Expanding: Array<[string, boolean]> = [];
    constructor(data: string[]) {
        data.forEach(_ => {
            this.addItem(_, false);
        })
    }

    addItem(item: string, toggle: boolean = false): void {
        if (this.getExpand(item)) {console.error("[Expander] This item is already exists!");return;}
        this.Expanding.push([item, toggle]);
    }

    getExpand(item: string): [string, boolean] | null {
        return this.Expanding.filter(_ => _[0] === item)?.[0] || null;
    }

    isExpand(item: string): boolean {
        return this.getExpand(item)?.[1] || false;
    }

    toggleExpand(item: string, toggle?: boolean): void {
        let i = this.getExpand(item);

        // Close all expands
        this.Expanding.forEach(_ => {
            if (i === _) return;
            _[1] = false;
        });

        // Open expand
        if (i != null) {
            i[1] = (toggle) ? toggle : !i[1];
        }
    }

}
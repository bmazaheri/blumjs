export class Row {
    public cells: Cell[];

    constructor() {
        this.cells = new Array<Cell>(7);
    }
};

export class Cell {
    content: string;
}
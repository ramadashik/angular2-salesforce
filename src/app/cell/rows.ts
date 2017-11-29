import { Cell } from './cell';
export class Row {
     constructor () {
        this.rowCount = null;
        this.row = [];
        // this.row.push(new Cell());
        // this.row[rowLength] = new Cell();
    }
    rowCount: number;
    row: Cell[];
}


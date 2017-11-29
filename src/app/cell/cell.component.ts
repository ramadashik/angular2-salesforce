import { Component, OnInit } from '@angular/core';
import { CellService } from './cell.service';
import { Cell } from './cell';
import { Table } from '../table/table';
import { TableService } from '../table/table.service';
import { Row } from './rows';


@Component({
    selector: `app-cell`,
    templateUrl: './cell.component.html',
    providers: [CellService]
})

export class CellComponent implements OnInit {
    private cells: Cell[];
    private table: Table;
    private rows: Array<Row>;

    constructor(private _cellService: CellService, private _dataService: TableService) {
        this._cellService = _cellService;
        this._dataService = _dataService;
    }

    public getCells() {
        this._cellService.getCells()
        .then((cells) => this.cells = cells );
    }

    public getTable() {
        this._dataService.getTable()
        .then((table) => this.table = table );
    }

    public buildRows(theArr: Cell[], table: Table): Array<Row> {
        let tempRows = new Array<Row>();
        let j: number = 0;
        for (let i = 0; i < table.RowCount__c; i++) {
            let temp = new Row();
            tempRows.push(temp);
            tempRows[i].rowCount = i;
            for (let y = 0; y < table.ColumnCount__c; y++) {
                tempRows[i].row.push(theArr[j]);
                j++;
            }
        }
        return tempRows;
    }

    public safeBuildRows() {
        this._cellService.getCells()
        .then((cells) => {
            console.log(cells);
            this._dataService.getTable()
            .then((table) => {
                console.log(table);
                this.rows = this.buildRows(cells, table);
                console.log(this.rows);
             });
        });
    }

    ngOnInit() {
        this.getCells();
        this.getTable();
        this.safeBuildRows();
    }
}

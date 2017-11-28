import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CellService } from './cell.service';
import { Cell } from './cell';
import { Table } from '../table/table';
import { TableService } from '../table/table.service';

@Component({
    selector: `app-cell`,
    templateUrl: './cell.component.html',
    providers: [CellService]
})

export class CellComponent implements OnInit{
    private cells: Cell[];
    private table: Table;
    private rows: Cell[][];

    constructor(private _cellService: CellService, private _dataService: TableService) {
        this._cellService = _cellService;
        this._dataService = _dataService;
    }

    public getCells() {
        this._cellService.getCells()
        .then((cells) => {this.cells = cells; console.log(cells);});
    }

    public getTable() {
        this._dataService.getTable()
        .then((table) => {this.table = table; console.log('get table');});
    }

    public buildRows(theArr: Cell[]): Cell[][]{
        const arr: Cell[] = theArr;
        let rows: Cell[][];
        for (let item of arr) {
            rows[item.RowCoord__c][item.ColumnCoord__c] = new Cell();
            rows[item.RowCoord__c][item.ColumnCoord__c] = item;
        }
        return rows;
    }

    public safeBuildRows() {
        this._cellService.getCells()
        .then((cells) => {this.cells = cells; this.buildRows(cells);});
        
    }

    ngOnInit() {
        
        this.getCells();
        this.getTable();
        // this.safeBuildRows();
        console.log(this.rows);
    }
    

}

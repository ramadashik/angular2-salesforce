import { Component, OnInit } from '@angular/core';
import { CellService } from './cell.service';
import { Cell } from './cell';
import { Table } from '../table/table';
import { TableService } from '../table/table.service';
import { Row } from './rows';


@Component({
    selector: `app-cell`,
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.css'],
    providers: [CellService]
})

export class CellComponent implements OnInit {
    // @Input() myVal: number;
    private cells: Cell[];
    private table: Table;
    private rows: Array<Row>;
    private editCell: Cell;
    private sum: number;
    private sumCol: number;
    private sumRow: number;

    constructor(private _cellService: CellService, private _dataService: TableService) {
        this._cellService = _cellService;
        this._dataService = _dataService;
        this.editCell = new Cell();
        this.editCell.Id = '0';
    }



    public getCells() {
        this._cellService.getCells()
        .then((cells) => {
            this.cells = cells;
        }  );
    }

    public getTable() {
        this._dataService.getTable()
        .then((table) => this.table = table );
    }

    public buildRows(theArr: Cell[], table: Table): Array<Row> {
        const tempRows = new Array<Row>();
        let j = 0;
        for (let i = 0; i < table.RowCount__c; i++) {
            const temp = new Row();
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
            this._dataService.getTable()
            .then((table) => {
                this.rows = this.buildRows(cells, table);
                this.getSummRow(this.rows);
                this.getSumm(cells);
                this.getSummCol(this.rows);
             });
        });
    }

    public toggle(eCell: Cell) {
        this.editCell = eCell;
        console.log(this.editCell);
    }

    // ngOnChanges(changes: SimpleChange) {

    // }
    public saveValue(newValue: number, eCell: Cell) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].Id === eCell.Id) {
                this.cells[i].Value__c = newValue;
                this._cellService.updateCellBack(this.cells[i]);
                this.safeBuildRows();
                this.editCell.Id = '0';
            }
        }

    }

    ngOnInit() {
        this.getTable();
        this.getCells();
        this.safeBuildRows();
    }

    public addRow() {
        const colNum = this.table.ColumnCount__c;
        const rowNum = this.table.RowCount__c;
        this.table.RowCount__c++;
        let newRow = new Row();
        newRow.rowCount = rowNum;
        for (let i = 0; i < colNum; i++) {
            let newCell = new Cell();
            newCell.ColumnCoord__c = i;
            newCell.RowCoord__c = rowNum;
            newRow.row.push(newCell);
        }
        this._cellService.insertNewRow(newRow, this.table);
        this.safeBuildRows();
    }

    public addColumn() {
        const colNum = this.table.ColumnCount__c;
        const rowNum = this.table.RowCount__c;
        this.table.ColumnCount__c++;
        let newCol = new Row();
        for (let i = 0; i < this.rows.length; i++) {
            let newCell = new Cell();
            newCell.ColumnCoord__c = colNum;
            newCell.RowCoord__c = i;
            newCol.row.push(newCell);
        }
        this._cellService.insertNewColumn(newCol, this.table);
        this.safeBuildRows();
    }

    public getSumm(cells: Cell[]) {
        this.sum = 0;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].Value__c) {
                this.sum += cells[i].Value__c;
            }
        }
    }

    public getSummCol(rows: Array<Row>) {
        let maxVal = 0;
        let temp: number;
        for (let i = 0; i < this.table.ColumnCount__c; i++) {
            temp = 0;
            for (let j = 0; j < this.table.RowCount__c; j++) {
                if (rows[j].row[i].Value__c) {
                    temp += rows[j].row[i].Value__c;
                }
                if (temp > maxVal) {
                    maxVal = temp;
                    this.sumCol = i;
                }
            }
        }
    }

    public getSummRow(rows: Array<Row>) {
        let maxVal = 0;
        let temp: number;
        for (let i = 0; i < this.table.RowCount__c; i++) {
            temp = 0;
            for (let j = 0; j < this.table.ColumnCount__c; j++) {
                if (rows[i].row[j].Value__c) {
                    temp += rows[i].row[j].Value__c;
                }
                if (temp > maxVal) {
                    maxVal = temp;
                    this.sumRow = i;
                }
            }
        }
    }


}

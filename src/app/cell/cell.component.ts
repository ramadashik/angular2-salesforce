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
        .then((cells) => this.cells = cells );
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
        console.log(tempRows);
        return tempRows;
    }

    public safeBuildRows() {
        this._cellService.getCells()
        .then((cells) => {
            this._dataService.getTable()
            .then((table) => {
                this.rows = this.buildRows(cells, table);
                this.getSumm(cells);
                this.getSummCol(cells);
                this.getSummRow(cells);
             });
        });
    }

    public toggle(eCell: Cell) {
        this.editCell = eCell;
        console.log(this.editCell);
    }

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
        this.getCells();
        this.getTable();
        this.safeBuildRows();
    }

    public addRow() {
        this.table.RowCount__c++;
        const colNum = this.table.ColumnCount__c;
        const rowNum = this.table.RowCount__c;
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
        this.table.ColumnCount__c++;
        const colNum = this.table.ColumnCount__c;
        const rowNum = this.table.RowCount__c;
        let newCol = new Row();
        for (let i = 0; i < this.rows.length; i++) {
            let newCell = new Cell();
            newCell.ColumnCoord__c = colNum;
            newCell.RowCoord__c = i;
            newCol.row.push(newCell);
            this.rows[i].row.push(newCell);
        }
        this._cellService.insertNewRow(newCol, this.table);
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

    public getSummCol(cells: Cell[]) {
        this.sumCol = 0;
        let maxVal = 0;
        let temp = 0;
        for (let i = 0; i < this.cells.length; i += this.table.ColumnCount__c) {
            for (let j = 0; j < this.table.RowCount__c; j++) {
                if (cells[i].Value__c) {
                    temp += cells[i].Value__c;
                }
            }
            if (temp > maxVal) {
                maxVal = temp;
                this.sumCol = cells[i].ColumnCoord__c;
            }
        }
    }

    public getSummRow(cells: Cell[]) {
        this.sumRow = 0;
        let maxVal = 0;
        let temp = 0;
        for (let i = 0; i < this.cells.length; i += this.table.RowCount__c) {
            for (let j = 0; j < this.table.ColumnCount__c; j++) {
                if (cells[i].Value__c) {
                    temp += cells[i].Value__c;
                    if (temp > maxVal) {
                        maxVal = temp;
                        this.sumRow = cells[i].RowCoord__c;
                    }
                }
            }
        }
    }

}

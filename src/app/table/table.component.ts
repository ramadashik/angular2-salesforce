import { Component, ViewChild } from '@angular/core';
import { TableService } from './table.service';
import { Table } from './table';

@Component({
    selector: `app-table`,
    templateUrl: './table.component.html',
    providers: [TableService]
})

export class TableComponent {
    private table: Table;

    constructor(private _dataService: TableService) {
        this._dataService = _dataService;
    }

    public getTable() {
        this._dataService.getTable()
        .then((table) => {this.table = table; console.log(this.table);});
    }

    // ngOnInit() {
    //     this.getTable();
    // }



}

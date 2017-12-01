import { Injectable } from '@angular/core';
import { Cell } from './cell';
import { Row } from './rows';
import { Table } from '../table/table';
// import { resolve } from 'path';
// import { reject } from 'q';

declare class Visualforce {
    static remoting: { Manager: { invokeAction: any } };
}


@Injectable()
export class CellService {
     constructor() {}

    private callRemote(methodName, params, resolve, reject) {
        // console.log(params);
        Visualforce.remoting.Manager.invokeAction(
            methodName,
            ...params,
            function (result, event) {
            // console.log({ event });
            // console.log({ result });
            if (event.status) {
                resolve(result);
            }
            },
            {
                escape: true
            }
        );
    }

    getCells(): Promise<Cell[]> {
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.getCells', [], resolve, reject);
          });
    }

    updateCellBack(newCell: Cell): Promise<{}> {
        console.log('getContact called');
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.updateCell',
            [newCell.Id, newCell.Value__c], resolve, reject);
        });
    }

    insertNewRow(newRow: Row, table: Table): Promise<{}> {
        console.log('insertNewRow called');
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.insertNewRow',
            [newRow.row, table], resolve, reject);
        });
    }

    insertNewColumn(newColumn: Row, table: Table): Promise<{}> {
        console.log('insertNewColumn called');
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.insertNewColumn',
            [newColumn.row, table], resolve, reject);
        });
    }
}

import { Injectable } from '@angular/core';
import { Table } from './table';

declare class Visualforce {
    static remoting: { Manager: { invokeAction: any } };
}


@Injectable()
export class TableService {
     constructor() {}

    private callRemote(methodName, params, resolve, reject) {
        //console.log(params);
        Visualforce.remoting.Manager.invokeAction(
            methodName,
            ...params,
            function (result, event) {
            //console.log({ event });
            //console.log({ result });
        
            if (event.status) {
                resolve(result);
            }
            },
            {
                escape: true
            }
        );
    }

    getTable(): Promise<Table> {
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.getTable', [], resolve, reject)
          });
    }
}

import { Injectable } from '@angular/core';
import { Cell } from './cell';

declare class Visualforce {
    static remoting: { Manager: { invokeAction: any } };
}


@Injectable()
export class CellService {
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

    getCells(): Promise<Cell[]> {
        return new Promise((resolve, reject) => {
            this.callRemote('JSTaskController.getCells', [], resolve, reject)
          });
    }
}

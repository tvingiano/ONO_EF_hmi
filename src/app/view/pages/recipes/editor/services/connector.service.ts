import { Injectable } from '@angular/core';
import { IConnList } from '../classes/connList';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectorService {

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  // It was initally used when bloccoComponent was used,
  // This service would have managed the connectors and the relative recipes these would have formed
  // No longer used in future versions
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  connectors: IConnList[] = [];
  order = [0];

  public connectorsOrder = new Observable(subscriber => {
    subscriber.next(this.connectors);
  });

  newConn(id, t, origin, from, target){
    const arr = {id, t, origin, from, target, xo: 0, yo: 1, xt: 0, yt: 0};
    let push = true;

    // Check if already exist a connector with the same id (or origin) in this.connectors
    // If it does i will replace it


    for (const item of this.connectors){
      if (item.id === id){
        const index = this.connectors.indexOf(item);
        if (index !== -1) {
          this.connectors[index] = arr;
        }
        push = false;
      }
    }
    if (push === true){

      this.connectors.push(arr);
    }

    for (let i = 0; i < this.connectors.length; i++){
      if (this.connectors[i].id === this.connectors[i].t){
        this.connectors.splice(i, 1);
      }
    }

    this.getRecipeOrder();

  }

  getRecipeOrder(){

    // It create the order the recipe should be executed using the connectors order
    const conn = this.connectors;
    let pos = 0;
    const order = [0];

    conn.forEach(() => {
      for (let i = 0; i < this.connectors.length; i++){
        if (conn[i].id === pos && conn[i].id !== conn[i].t){
          pos = conn[i].t;
          order.push(pos);
        }
      }
    });
    this.order = order;
  }


  getConnectors(){
    // just a callback for this.connectors (dunno why i used it, it's much easier to just call this.connService.connectors)
    return this.connectors;
  }
}

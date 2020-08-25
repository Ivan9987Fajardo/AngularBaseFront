import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpService
  ) { 
  }

  getAllItems(){
    return this.http.getBase('/items');
  }

  addItem(data){
    return this.http.postBase('/items',data);
  }

  deleteItem(id){
    return this.http.deleteBase('/items',id);
  }

  putItem(id,data){
    return this.http.putBase('/items',id,data);
  }
}

import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items;
  form: FormGroup;
  add = false;
  update = false;
  constructor(
    private inventory: InventoryService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  showAdd(){
    this.close();
    this.add = !this.add;
    if(this.add){
      this.initForm();
    }
  }

  close(){
    if(this.add)
    this.add = false;
    if(this.update)
    this.update = false;
  }

  mapValue(){
    this.items.forEach(element => {
      if(element.itemId == this.form.get('itemId').value){
        this.form.get('name').setValue(element.name);
        this.form.get('quantity').setValue(element.quantity);
      }
      
    });
    
  }

  showUpdate(){
    this.close();
    this.update = !this.update;
    if(this.update){
      this.initForm();
      this.form.addControl('itemId',new FormControl());
    }
  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  getAllItems(){
    this.inventory.getAllItems().subscribe(data=>{
      this.items=data;
      console.log(data);
    })
  }

  addItem(){
    this.inventory.addItem(this.form.getRawValue()).subscribe(data => {
      this.items = data;
    })
  }

  deleteItem(id){
    this.inventory.deleteItem(id).subscribe(data => {
      this.items = data;
    })
  }

  updateItem(){
    var form = this.form.getRawValue();
    var id = form.itemId;
    delete form.itemId;

    this.inventory.putItem(id, form).subscribe(data => {
      this.items = data
    })
  }
}

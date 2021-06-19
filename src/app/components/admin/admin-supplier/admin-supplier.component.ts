import { Component, OnInit } from '@angular/core';

import { SupplierService } from 'src/app/services/supplier.service';
import { Suppliers } from '../../../models/supplier';

@Component({
  selector: 'app-admin-supplier',
  templateUrl: './admin-supplier.component.html',
  styleUrls: ['./admin-supplier.component.css']
})
export class AdminSupplierComponent implements OnInit {

  array:Suppliers[];
  editable:Suppliers=new Suppliers();
  open=false;
  deleteOpen=false;
  adding=false;
  constructor(private stServ:SupplierService) { }


  ngOnInit(): void {
    this.loadData();
  }

  edit(index){
    this.editable={...this.array[index]};
    this.open=true;
    this.adding=false;
  }

  loadData(){
    this.stServ.getSuppliers().subscribe(array => {
      this.array = array;
    });
  }

  delete(index){
    this.editable={...this.array[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteSupplier(this.editable._id).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }

  closeModal(){
    this.open=false;
    this.deleteOpen=false;
    this.resetEditable();
  }

  addNew(){
    this.editable=new Suppliers();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Suppliers();
  }

  updateConf(){
    if(!this.adding)
    this.stServ.updateSupplier(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addSupplier(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }

}

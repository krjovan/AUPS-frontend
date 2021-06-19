import { Component, OnInit } from '@angular/core';

import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from '../../../models/orders';

import { DeliversService } from 'src/app/services/delivers.service';
import { Delivers } from '../../../models/delivers';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user';


import { SupplierService } from 'src/app/services/supplier.service';
import { Suppliers } from '../../../models/supplier';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/article.service';
@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  array:Orders[];
  editable:Orders=new Orders();
  open=false;
  deleteOpen=false;
  adding=false;
  //sub
  nested:User[];
  nested2:Delivers[];

  getNames:Suppliers[];
  getNames2:Articles[];
  //sub
  constructor(private stServ:OrdersService,private additional:UserService,private additional2:DeliversService,
    private supplServ:SupplierService,private artSer:ArticlesService) { }
  //sub
  getSubSection(){
    this.additional.getUsers({}).subscribe(array => {
      this.nested = array;
    });
  }

  getSubSection2(){
    this.additional2.getDelivers().subscribe(array => {
      this.nested2 = array;
    });
    this.supplServ.getSuppliers().subscribe(array => {
      this.getNames = array;
    });
    this.artSer.getArticles().subscribe(array => {
      this.getNames2 = array;
    });
  }

  findByName(id){
    return this.nested.find(el=>el._id==id).name;
  }

  findByName2(id){
    var find=this.nested2.find(el=>el._id==id);
    return find.price + ", " + this.getNames.find(el=>el._id==find.supplierId).name+ ", " + this.getNames2.find(el=>el._id==find.articlesId).name;
  }

  //sub

  ngOnInit(): void {
    this.loadData();
    this.getSubSection();
    this.getSubSection2();
  }

  edit(index){
    this.editable={...this.array[index]};
    this.open=true;
    this.adding=false;
  }

  loadData(){
    this.stServ.getOrders().subscribe(array => {
      this.array = array;
    });
  }

  delete(index){
    this.editable={...this.array[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteOrder(this.editable._id).subscribe(()=>{
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
    this.editable=new Orders();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Orders();
  }

  updateConf(){
    if(!this.adding)
    this.stServ.updateOrder(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addOrder(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeliversService } from 'src/app/services/delivers.service';
import { Delivers } from '../../../models/delivers';

import { SupplierService } from 'src/app/services/supplier.service';
import { Suppliers } from '../../../models/supplier';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/article.service';
@Component({
  selector: 'app-admin-article-delivery',
  templateUrl: './admin-article-delivery.component.html',
  styleUrls: ['./admin-article-delivery.component.css']
})
export class AdminArticleDeliveryComponent implements OnInit {


  array:Delivers[];
  editable:Delivers=new Delivers();
  open=false;
  deleteOpen=false;
  adding=false;
  //sub
  nested:Suppliers[];
  nested2:Articles[];
  //sub
  constructor(private stServ:DeliversService,private additional:SupplierService,private additional2:ArticlesService) { }
  //sub
  getSubSection(){
    this.additional.getSuppliers().subscribe(array => {
      this.nested = array;
    });
  }

  getSubSection2(){
    this.additional2.getArticles().subscribe(array => {
      this.nested2 = array;
    });
  }

  findByName(id){
    return this.nested.find(el=>el._id==id).name;
  }

  findByName2(id){
    return this.nested2.find(el=>el._id==id).name;
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
    this.stServ.getDelivers().subscribe(array => {
      this.array = array;
    });
  }

  delete(index){
    this.editable={...this.array[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteDelivery(this.editable._id).subscribe(()=>{
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
    this.editable=new Delivers();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Delivers();
  }

  updateConf(){
    if(!this.adding)
    this.stServ.updateDelivery(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addDelivery(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }
}

import { Component, OnInit } from '@angular/core';


import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from '../../models/orders';

import { DeliversService } from 'src/app/services/delivers.service';
import { Delivers } from '../../models/delivers';

import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

import { StocksService } from 'src/app/services/stocks.service';
import { Stocks } from '../../models/stocks';
import { SupplierService } from 'src/app/services/supplier.service';
import { Suppliers } from '../../models/supplier';
import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/article.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {


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

  stocks:Stocks[];
  showStock:Stocks[];

  completeDelivery=null;
  //sub
  constructor(private stServ:OrdersService,private additional:UserService,private additional2:DeliversService,
    private supplServ:SupplierService,private artSer:ArticlesService, private authSer: AuthenticationService,
    private stockSer:StocksService) { }
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

/*   edit(index){
    this.editable={...this.array[index]};
    this.open=true;
    this.adding=false;
  } */

  loadData(){
    let id=this.authSer.getUserDetails()._id;
    this.stServ.getOrders().subscribe(array => {
      this.array = array.filter(el=>el.userID == id);
    });
    this.stockSer.getStocks().subscribe(array=>{
      this.stocks=array;
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

  complete(index){
    this.editable={...this.array[index]};
    console.log("sta mi je editabe",this.editable,this.nested2);
    var find=this.nested2.find(el=>el._id==this.editable.deliversID);
    var article=this.getNames2.find(el=>el._id==find.articlesId);
    this.showStock=this.stocks.filter(el=>el.articleID==article._id);
    this.open=true;
  }

  closeModal(){
    this.open=false;
    this.deleteOpen=false;
    this.resetEditable();
  }

/*   addNew(){
    this.editable=new Orders();
    this.open=true;
    this.adding=true;
  } */

  resetEditable(){
    this.editable=new Orders();
  }

  updateConf(){
    var stock=this.stocks.find(el=>el._id==this.completeDelivery);
    stock.amount=Number(stock.amount)+Number(this.editable.amount);
    this.stockSer.updateStock(stock).subscribe(()=>{
      this.stServ.deleteOrder(this.editable._id).subscribe(()=>{
        this.closeModal();
        this.loadData();
      });
    });
  }
}

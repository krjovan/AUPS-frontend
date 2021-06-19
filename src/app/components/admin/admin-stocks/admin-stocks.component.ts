import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stocks } from '../../../models/stocks';

import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/article.service';

@Component({
  selector: 'app-admin-stocks',
  templateUrl: './admin-stocks.component.html',
  styleUrls: ['./admin-stocks.component.css']
})
export class AdminStocksComponent implements OnInit {

  stocks:Stocks[];
  editable:Stocks=new Stocks();
  open=false;
  deleteOpen=false;
  adding=false;
  //sub
  nested:Articles[];
  //sub
  constructor(private stServ:StocksService,private additional:ArticlesService) { }
  //sub
  getSubSection(){
    this.additional.getArticles().subscribe(array => {
      this.nested = array;
    });
  }

  findByName(id){
    if(id)
      return this.nested.find(el=>el._id==id).name;
    else 
    return "";
  }

  //sub

  ngOnInit(): void {
    this.loadData();
    this.getSubSection();
  }

  edit(index){
    this.editable={...this.stocks[index]};
    this.open=true;
    this.adding=false;
  }

  loadData(){
    this.stServ.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  delete(index){
    this.editable={...this.stocks[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteStock(this.editable._id).subscribe(()=>{
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
    this.editable=new Stocks();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Stocks();
  }

  updateConf(){
    if(!this.adding)
    this.stServ.updateStock(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addStock(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }
}
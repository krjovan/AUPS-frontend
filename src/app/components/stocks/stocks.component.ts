import { Component, OnInit } from '@angular/core';
import { StocksService } from 'src/app/services/stocks.service';
import { Stocks } from '../../models/stocks';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks:Stocks[];
  constructor(private stServ:StocksService,private router:Router) { }

  ngOnInit(): void {
    this.stServ.getStocks().subscribe(stocks => {
      this.stocks = stocks.map(el=>{
        //0-50 jako lose   50-100 hop hop
        if(el.amount<el.minimumNeeded){//0-50
          el.status=((100*Number(el.amount))/Number(el.minimumNeeded))/2;
          
        }else if(el.amount==  el.minimumNeeded){
          el.status=50;
        }
        else{
          let amSet=Number(el.amount)-Number(el.minimumNeeded);
          let maxSet=Number(el.maximum)-Number(el.minimumNeeded);
          el.status=(((100*amSet)/maxSet)/2)+50;
        }
        return el;
      }).sort(function(a, b) {
        return Number(a.status) - Number(b.status);
      });
      console.log(this.stocks);
    });
  }

  showStock(el){
    console.log("prikazujes li sta",el); 
    this.router.navigateByUrl('/article/'+el._id);

  }
  /**
   *  address: "Bez imena"
      amount: 15
      articleID: null
      location: "Runjani"
      maximum: 100
      minimumNeeded: 10
      name: "Lokalno skladiste"
      
   */

}

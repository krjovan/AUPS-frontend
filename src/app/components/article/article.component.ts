import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../../services/article.service';
import { Articles } from '../../models/articles';
import { StocksService } from 'src/app/services/stocks.service';
import { Stocks } from 'src/app/models/stocks';
import { DeliversService } from 'src/app/services/delivers.service';
import { Delivers } from '../../models/delivers';

import { OrdersService } from 'src/app/services/orders.service';
import { Orders } from '../../models/orders';

import { SupplierService } from 'src/app/services/supplier.service';
import { Suppliers } from '../../models/supplier';

import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article: Articles;
  stock: Stocks;
  delivers: Delivers[];
  supplier: Suppliers[];
  todaysdate;
  open = false;
  order = { delivers: null, amount: 0, date: new Date(), cost: 0 };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artSer: ArticlesService,
    private stServ: StocksService,
    private devSer: DeliversService,
    private suppl: SupplierService,
    private ordSer: OrdersService,
    private authSer: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.todaysdate = new Date().getTime();
    window.scrollTo(0, 0);
    this.route.params.subscribe((params) => {
      let id = params['id'];
      this.stServ.getStockById(id).subscribe((stock) => {
        this.stock = stock;
        this.artSer.getArticleById(stock.articleID).subscribe((article) => {
          this.article = article;
          this.loadDelivers();
        });
      });
    });
  }
  loadDelivers() {
    this.suppl.getSuppliers().subscribe((res) => {
      this.supplier = res;
      this.devSer.getDelivers().subscribe((res) => {
        this.delivers = res.filter((el) => el.articlesId == this.article._id);
      });
    });
  }

  getCost() {
    if (this.order.delivers && this.order.amount > 0) {
      let findPrice = this.delivers.find(
        (el) => el._id == this.order.delivers
      ).price;
      return 'Cost: ' + Number(findPrice) * Number(this.order.amount) + ' rsd';
    } else return null;
  }

  getSupName(id) {
    return this.supplier.find((el) => el._id == id).name;
  }

  check() {
    return this.order.delivers && this.order.amount > 0 && this.order.date;
  }

  makeOrder() {
    if (this.check()) {
      var order = new Orders();
      order.amount = this.order.amount;
      order.deliversID = this.order.delivers;
      order.Date = this.order.date;
      order.userID = this.authSer.getUserDetails()._id;
      this.ordSer.addOrder(order).subscribe((res) => {
        this.open = true;
      });
    }
  }

  closeModal() {
    this.open = false;
    this.router.navigateByUrl('/myorder');
  }
}

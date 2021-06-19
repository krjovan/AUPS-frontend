import { Component, OnInit } from '@angular/core';

import { Articles } from 'src/app/models/articles';
import { ArticlesService } from 'src/app/services/article.service';

import { TypesService } from 'src/app/services/types.service';
import { Types } from '../../../models/types';//

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.css']
})
export class AdminArticlesComponent implements OnInit {

  array:Articles[];
  editable:Articles=new Articles();
  open=false;
  deleteOpen=false;
  adding=false;
  //sub
  nested:Types[];
  //sub
  constructor(private stServ:ArticlesService,private additional:TypesService) { }


  //sub
  getSubSection(){
    this.additional.getTypes().subscribe(array => {
      this.nested = array;
    });
  }

  findByName(id){
    return this.nested.find(el=>el._id==id).name;
  }

  //sub
  ngOnInit(): void {
    this.loadData();
    this.getSubSection();//sub
  }


  edit(index){
    this.editable={...this.array[index]};
    this.open=true;
    this.adding=false;
  }

  loadData(){
    this.stServ.getArticles().subscribe(array => {
      this.array = array;
    });
  }

  delete(index){
    this.editable={...this.array[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteArticle(this.editable._id).subscribe(()=>{
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
    this.editable=new Articles();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Articles();
  }

  updateConf(){
    console.log("sta saljemo",this.editable);
    if(!this.adding)
    this.stServ.updateArticle(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addArticle(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }

}

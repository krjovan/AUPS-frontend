import { Component, OnInit } from '@angular/core';

import { TypesService } from 'src/app/services/types.service';
import { Types } from '../../../models/types';//
@Component({
  selector: 'app-admin-articles-types',
  templateUrl: './admin-articles-types.component.html',
  styleUrls: ['./admin-articles-types.component.css']
})
export class AdminArticlesTypesComponent implements OnInit {

  array:Types[];
  editable:Types=new Types();
  open=false;
  deleteOpen=false;
  adding=false;
  constructor(private stServ:TypesService) { }


  ngOnInit(): void {
    this.loadData();
  }

  edit(index){
    this.editable={...this.array[index]};
    this.open=true;
    this.adding=false;
  }

  loadData(){
    this.stServ.getTypes().subscribe(array => {
      this.array = array;
    });
  }

  delete(index){
    this.editable={...this.array[index]};
    this.deleteOpen=true;
  }

  deleteConf(){
    this.stServ.deleteType(this.editable._id).subscribe(()=>{
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
    this.editable=new Types();
    this.open=true;
    this.adding=true;
  }

  resetEditable(){
    this.editable=new Types();
  }

  updateConf(){
    if(!this.adding)
    this.stServ.updateType(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
    else
    this.stServ.addType(this.editable).subscribe(()=>{
      this.closeModal();
      this.loadData();
    });
  }

}

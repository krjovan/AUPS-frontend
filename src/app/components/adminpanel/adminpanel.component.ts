import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {
  chosen = 0;
  constructor() { }

  ngOnInit(): void {
  }

  open(num){
    this.chosen=num;
  }

}

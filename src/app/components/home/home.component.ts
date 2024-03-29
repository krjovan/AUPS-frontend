import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
  }

  openPage(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/register');
    }else {
      this.router.navigateByUrl('/stocks');
    }
  }

}

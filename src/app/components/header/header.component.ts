import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadingUser } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   activetab = 'home';
   hide:Boolean = false;
   service:Boolean = false;
   login:any;
   type:any;
   url:any = '/dashboard'
   hideParam:boolean = false
   logged:boolean = false;
   helper = new JwtHelperService();
   decodedToken :any;

  constructor(private router:Router,
              private auth:AuthService,
              private dataService: DataService,
              private store:Store<{user:UserState}>

    ) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    if(this.type === 'superAdmin'){
      this.hideParam = true;
      this.url = '/admin'
    }
    console.log("this.hideParam");console.log(this.hideParam);
    this.login = localStorage.getItem('login');
    let token:any = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(token);
    // Other functions
    let expirationDate = this.helper.getTokenExpirationDate(token);
    let isExpired = this.helper.isTokenExpired(token);
    console.log("expirationDate", expirationDate);
    console.log("isExpired", isExpired);

    this.getUser();
   if(this.auth.isValid()){
      this.service = true;
    }else{
          this.service = false;
        }
     if(this.router.url === '/'){
      this.activetab = 'home';
     }else if( this.router.url === '/j2hb'){
      this.activetab = 'j2hb';
     }else if(this.router.url === '/boutique-j2hb'){
      this.activetab = 'boutique';
     }else if(this.router.url === '/actualite'){
      this.activetab = 'actualite';
     }else if(this.router.url === '/ministre_notes'){
      this.activetab = 'ministre_notes';
     }else if(this.router.url === '/contact'){
      this.activetab = 'contact'
     }else if(this.router.url === '/apropos') {
      this.activetab = 'apropos'
     }else{
      this.activetab = 'service'
     }
  }

  getUser(){
   
    this.auth.authStatus.subscribe( value =>{
      this.logged = value;
      if(value){
        this.login = localStorage.getItem('login');
      }
     });

  }

  logoutUser(e:any){
    e.preventDefault();
    localStorage.removeItem('user_id');
    localStorage.removeItem('autoEcole_id');
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('login');
    this.auth.changeAuthStatus(false);
  }
  show(){
    this.hide = !this.hide;
  }
}

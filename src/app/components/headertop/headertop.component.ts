import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AutoEcoleService } from 'src/app/services/auto-ecole.service';
import {  Store } from '@ngrx/store';
import * as $ from "jquery";
import { UserState } from 'src/app/state/user/user.state';
import { removeUser } from 'src/app/state/user/user.actions';
import { removeAutoEcole } from 'src/app/state/autoEcole/autoEcole.actions';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-headertop',
  templateUrl: './headertop.component.html',
  styleUrls: ['./headertop.component.css']
})
export class HeadertopComponent implements OnInit {
  public loggedIn:boolean = false;
  public click = false;
  user:any;
  admin:any;
  status:any;
  type:any;
  superAdmin:boolean = false;
  userData:any;
  constructor(private _auth : AuthService,
              private _router:Router,
              private autoEcoleService:AutoEcoleService,
              private store: Store<{user:UserState}>,
              private dataService:DataService,
              ) { }
  
  ngOnInit(): void {
    if(this._auth.isValid()){
       if(localStorage.getItem('user_id') !== null){
        this.dataService.getUserById(localStorage.getItem('user_id')).subscribe(
          data=>{
          this.user = data;},
          error => console.log(" error in header top we can not get data of current user",error.error)
        )
       }else{
        this._auth.getUser().subscribe(
          data => { this.user = data},
          error => console.log("error components login line  ",error.error)
          );
       }
    
    }
    this._auth.authStatus.subscribe( 
      value =>{ this.loggedIn = value; },
      error => console.log(" user not logged in headertop",error.error)
      );
    this.type = localStorage.getItem('type');
    this.status =  this._auth.handle(localStorage.getItem('token')); 
  
  }

    logoutUser(e:any){
      $('#MenuUser').css("display", "none");
      e.preventDefault();
      localStorage.clear();
      this._auth.changeAuthStatus(false);
      this.loggedIn = false;
       this.store.dispatch(removeUser());
       this.store.dispatch(removeAutoEcole());
       this._router.navigateByUrl('/login');
    }

    redirect_to(event:any){
      event.preventDefault();
     if(this.status){
        if(this.type === 'superAdmin'){
          this._router.navigateByUrl('/admin');
        } else{
          this._router.navigateByUrl('/dashboard');
        }
         
     }
       
      
    }
}

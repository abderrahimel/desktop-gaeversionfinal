import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-headerlogged',
  templateUrl: './headerlogged.component.html',
  styleUrls: ['./headerlogged.component.css']
})
export class HeaderloggedComponent implements OnInit {
  clicked:boolean = false;
  user:any;
  logo:any;
  login:any;
  activetab = 'boutique-j2hb';
  hide:boolean = false;
  constructor(private _auth : AuthService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.logo = localStorage.getItem('logo');
    this.login = localStorage.getItem('login');
    if(localStorage.getItem('type') === 'superAdmin'){
      this.hide = true
    }
    this.getuser();
  }
  navigation(){
    if(this.hide){
      this.router.navigateByUrl('/admin')
    }else{
      this.router.navigateByUrl('/dashboard')
    }
  }
  menu(e:any){
    this.clicked = !this.clicked;
  }
  to(rout:any){
      this.router.navigateByUrl(rout);
  }
  logoutUser(e:any){
    e.preventDefault();
    this._auth.changeAuthStatus(false);
     this._auth.logout({id: localStorage.getItem('user_id')});
     localStorage.clear()
  }
  getuser(){
    this._auth.getUser().subscribe(data => this.user = data)
    }
}
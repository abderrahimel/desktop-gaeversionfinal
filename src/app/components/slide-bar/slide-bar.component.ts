import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlidebarService } from 'src/app/services/slidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SlideBarComponent implements OnInit {

  navbarOpen = false;
  classList : any;
  nextElementSibling : any;
  hidden:any = false;
  prehidden:any = false;
  currentPage = false;
  menus  =this.slidebarservice.getMenuList();
  active = 'top';
  clicked:boolean = false;
  user:any;
  constructor(private translateService :TranslationService,
              public slidebarservice: SlidebarService,
              private _router : Router,
              private _auth : AuthService){
    // this.menus = slidebarservice.getMenuList();
    
  }

  ngOnInit(): void {
    this.translateService.applyLanguage();
    console.log("active tab *************");
    console.log(this.active);
  }



  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  getSideBarState() {
    return this.slidebarservice.getSidebarState();
  }
  
  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          for(let i=0; i<=this.menus.length; i++)
         element[i].active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.slidebarservice.hasBackgroundImage;
  }

  logout(){
    // this._auth.logout();
  }
  showHidden(e:any){
       e.preventDefault();
       this.hidden = ! this.hidden;
       console.log(this.hidden);
  }
  
  redirect_to(rout:any){
    console.log(rout);
    this._router.navigateByUrl(rout);
   }
   menu(e:any){
    this.clicked = !this.clicked;
    console.log(this.clicked)
    
  }
  logoutUser(e:any){
    e.preventDefault();
    this._auth.changeAuthStatus(false);
     this._auth.logout({id: localStorage.getItem('user_id')});
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SlidebarService } from 'src/app/services/slidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as $ from "jquery";
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';

@Component({
  selector: 'app-menu-slide',
  templateUrl: './menu-slide.component.html',
  styleUrls: ['./menu-slide.component.css']
})
export class MenuSlideComponent implements OnInit {
  navbarOpen = false;
  classList : any;
  logo:any;
  autoecole:any;
  nextElementSibling : any;
  active = 'top';
  hidden:any = false;
  currentPage = false;
  clickC:any = false;
  clickT:any = false;
  clickP:any = false;
  clickV:any = false;
  clickE:any = false;
  clickEm:any = false;
  clickCa:any = false;
  clickCo:any = false;
  clickb:any = false;
  clickM:any = false;
  clickMo: any = false;
  clickBou:any = false;
  urlLogo:any;
  menus  = this.slidebarservice.getMenuList();


  constructor(private translateService :TranslationService,
              public slidebarservice: SlidebarService,
              private _router : Router,
              private _auth : AuthService,
              private dataService: DataService,
              private store: Store<{autoEcole:AutoEcoleState}>, 
              ){

    
  }

  ngOnInit(): void {
    this.translateService.applyLanguage();
    this.dataService.getAutoEcoleById(localStorage.getItem('autoEcole_id')).subscribe((data:any)=>{
          let ecoleData = data;
          this.logo = ecoleData.image;
    })

  }

show(id:any){
  $(id).css('display', 'block');
  for(let i =1; i<8; i++){
    let idcurrent = 'j'+i.toString()
    if( idcurrent!== id){
      $(id).hide();
    }
  }
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
  showHidden(e:any, id:string){
    e.preventDefault();  
}
setRouter(event:any, rout:any){
   event.preventDefault();
   this._router.navigateByUrl(rout);
}


 redirect_to(rout:any, id){
   console.log("clicked")
  this._router.navigateByUrl(rout);
  let idc = "#" + id;
  $(document).ready(() => {  
    $(idc).css("display", "block");
  }); 
 }

}

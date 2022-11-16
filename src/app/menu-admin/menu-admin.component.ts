import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { DataService } from '../services/data.service';
import { SlidebarService } from '../services/slidebar.service';
import { TranslationService } from '../services/translation.service';
import * as $ from "jquery";
@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  navbarOpen = false;
  classList : any;
  nextElementSibling : any;
  hidden:any = false;
  currentPage = false;
  clickC:any = false;
  clickT:any = false;
  clickP:any = false;
  idurl:any;
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
              private dataService: DataService
              ){
    // this.menus = slidebarservice.getMenuList();
    
  }

  ngOnInit(): void {
    this.translateService.applyLanguage();
    let auto_id = 1;
    this.dataService.getLogo(auto_id).subscribe(data=>{
      console.log(data);
      this.urlLogo = data;
      this.urlLogo = this.urlLogo.replace('\/', '/');
      this.urlLogo = ''
      console.log(this.urlLogo);
    })
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


 redirect_to(rout:any, id:any){
  this.idurl = id;
  console.log(rout);
  this._router.navigateByUrl(rout);
  // $(id).css("background", "red");
  // if(id === '#messagerie'){
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // }else if(id === '#gestion-users'){
  //   $('#messagerie').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // }else if(id === '#blog'){
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // }else if(id === '#adminBoutique'){
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none"); 
  // }else if(id === '#abonnement'){
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // }else if(id === '#archiveAE'){
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // }else if(id === '#gestionAE'){
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#dashboard').css("background", "none");
  // } else{
  //   $('#messagerie').css("background", "none");
  //   $('#gestion-users').css("background", "none");
  //   $('#blog').css("background", "none");
  //   $('#adminBoutique').css("background", "none");
  //   $('#abonnement').css("background", "none");
  //   $('#archiveAE').css("background", "none");
  //   $('#gestionAE').css("background", "none");
  // }
 }

}

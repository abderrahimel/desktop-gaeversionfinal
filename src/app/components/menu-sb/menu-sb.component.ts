import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-sb',
  templateUrl: './menu-sb.component.html',
  styleUrls: ['./menu-sb.component.css']
})
export class MenuSBComponent implements OnInit {
  navbarOpen = false;
  classList : any;
  nextElementSibling : any;
  hidden:any = false;
  prehidden:any = false;
  idlist:any = ['#id2','#id3','#id4','#id5','#id6','#id7','#id8','#id9','#id10','#id11',];
  currentPage = false;
  active = 'top';
  logo:any;
  autoecole:any;
  clickC:any = false;
  clickT:any = false;
  clickP:any = false;
  clickV:any = false;
  clickE:any = false;
  clickEm:any = false;
  clickMo: any = false;
  clickb:any = false;
  clickCa:any = false;
  clickCo:any = false;
  clickM:any = false;
 
  clickBou:any = false;
  urlLogo:any;
  constructor(
              private _router : Router,
              ){
  }

  ngOnInit(): void {
    this.urlLogo = localStorage.getItem('logo')
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  getSideBarState() {
  }
  
 
  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
  }

  logout(){
    // this._auth.logout();
  }
  showHidden(e:any){
       e.preventDefault();
       this.hidden = ! this.hidden;
  }
   redirect_to(rout:any, id){
   this._router.navigateByUrl(rout);
   let idc = "#" + id;
   $(document).ready(() => {  
     $(idc).css("display", "block");
   }); 
  }
}

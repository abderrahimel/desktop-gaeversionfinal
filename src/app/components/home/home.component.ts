import {  Component, OnInit, ViewChild  } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { UserState } from 'src/app/state/user/user.state';
import { take, takeLast } from 'rxjs/operators';
import { getUser } from 'src/app/state/user/user.actions';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { BoutiqueState } from 'src/app/state/boutique/boutique.state';
import { loadBoutique } from 'src/app/state/boutique/boutique.actions';
import { VehiculeOccasionState } from 'src/app/state/vehiculeOccasion/vehiculeOccasion.state';
import { loadVehiculeOccasion } from 'src/app/state/vehiculeOccasion/vehiculeOccasion.actions';
import { MoniteurJobState } from 'src/app/state/moniteurJob/moniteurJob.state';
import { loadMoniteurJob } from 'src/app/state/moniteurJob/moniteurJob.actions';
import { AutoecolevendreState } from 'src/app/state/autoecolevendre/autoecolevendre.state';
import { loadautoecolevendreaction } from 'src/app/state/autoecolevendre/autoecolevendre.action';
import { AutoEcoleWithAbonnementState } from 'src/app/state/autoEcoleWithAbonnement/autoEcoleWithAbonnement.state';
import { loadautoEcoleWithAbonnement } from 'src/app/state/autoEcoleWithAbonnement/autoEcoleWithAbonnement.actions';
import { BlogState } from 'src/app/state/blog/blog.state';
import { loadblogadminaction } from 'src/app/state/blog/bnlog.actions';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  navbarOpen = false;
  user:any;
  produitBoutique:any;
  vehiculeOccasion:any;
  autoEcoleVendre:any;
  autoEcoleAbonnee:any;
  blogs:any;
  boutique:any;
  logged:boolean = false;
  moniteurJob:any
  dateVal = new Date();
  nBoutique:any;
  nvehiculeOccasion:any
  nmoniteurJob:any
  nautoEcoleVendre:any
  nautoEcoleAbonnee:any;
  nblogs:any
  hideSpinnerBoutique:any;
  boolBoutique:boolean = false;
  slideConfig = {slidesToShow: 1,
    infinite: true,
    variableWidth: true,
    outerEdgeLimit: true,
    nextArrow: '<div style=\'position: absolute; top: 35%; right: 5px; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-right"></i></div>',
    prevArrow: '<div style=\'position: absolute; top: 35%; left: 5px; z-index: 1; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-left"></i></div>',};

  constructor( private dataService: DataService,
               private store:Store<{user:UserState, boutique:BoutiqueState, vehiculeOccasion: VehiculeOccasionState, moniteurJob: MoniteurJobState, autoecolevendre: AutoecolevendreState, autoEcoleWithAbonnement: AutoEcoleWithAbonnementState, blog: BlogState}>,
               private router: Router,
               private auth:AuthService
    ) {}
  
    ngOnInit(): void {
      this.checkIfLogged();
    }
    checkIfLogged(){
      this.auth.authStatus.subscribe( value =>{
        this.logged = value;
        this.getData();
      })
    }
    getData(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.boutique.boutique.loaded){
          this.store.dispatch(loadBoutique());
        }
        if(!store.vehiculeOccasion.vehiculeOccasion.loaded && this.logged){
          this.store.dispatch(loadVehiculeOccasion());
        }
        if(!store.moniteurJob.moniteurJob.loaded && this.logged){
          this.store.dispatch(loadMoniteurJob());
        }
        if(!store.autoecolevendre.autoecolevendre.autoecolevendre.loaded && this.logged){
          this.store.dispatch(loadautoecolevendreaction());
        }
        if(!store.autoEcoleWithAbonnement.autoEcoleWithAbonnement.loaded && this.logged){
          this.store.dispatch(loadautoEcoleWithAbonnement());
        }
        if(!store.blog.blog.loaded){
          this.store.dispatch(loadblogadminaction())
        }
      })
      this.store.select(state=>state.boutique.boutique.boutique).subscribe(boutique=>{
        this.boutique = boutique;
        if(this.boutique){
          this.nBoutique = this.boutique.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nBoutique = 0
        }
      })
      this.store.select(state=>state.vehiculeOccasion.vehiculeOccasion.vehiculeOccasion).subscribe(vehiculeOccasion=>{
        this.vehiculeOccasion = vehiculeOccasion;
        if(this.vehiculeOccasion){
          this.nvehiculeOccasion = this.vehiculeOccasion.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nvehiculeOccasion = 0
        }
        console.log("vehiculeOccasion");console.log(this.vehiculeOccasion);
      })
      this.store.select(state=>state.moniteurJob.moniteurJob.moniteurJob).subscribe(moniteurJob=>{
        this.moniteurJob = moniteurJob
        if(this.moniteurJob){
          this.nmoniteurJob = this.moniteurJob.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nmoniteurJob = 0
        }
        console.log(" this.moniteurJob");console.log( this.moniteurJob);
      })
      this.store.select(state=>state.autoecolevendre.autoecolevendre.autoecolevendre.autoecolevendre).subscribe(autoecolevendre=>{
        this.autoEcoleVendre = autoecolevendre;
        if(this.autoEcoleVendre){
          this.nautoEcoleVendre = this.autoEcoleVendre.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nautoEcoleVendre = 0
        }
        console.log("this.autoEcoleVendre");
        console.log(this.autoEcoleVendre);
      })
      this.store.select(state=>state.autoEcoleWithAbonnement.autoEcoleWithAbonnement.autoEcoleWithAbonnement).subscribe(autoecoles=>{
        this.autoEcoleAbonnee = autoecoles;
        if(this.autoEcoleAbonnee){
          this.nautoEcoleAbonnee = this.autoEcoleAbonnee.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nautoEcoleAbonnee = 0
        }
        console.log("this.autoEcoleAbonnee");
        console.log(this.autoEcoleAbonnee);
      })
      this.store.select(state=>state.blog.blog.blog).subscribe(blogs=>{
        this.blogs = blogs
        if(this.blogs){
          this.nblogs = this.blogs.reduce((acc, o) => acc + Object.keys(o).length, 0);
        }else{
          this.nblogs = 0
        }
        console.log("this.blogs");
        console.log(this.blogs);
      })
    }
    getBoutique(){
      this.dataService.getBoutique().subscribe(data=>{
        this.boutique = data
      })
    }

    getVehiculeOccasion(){
      this.dataService.getVehiculeOccasion().subscribe(data=>{
        this.vehiculeOccasion = data
      })
    }

    getMoniteurJob(){
      this.dataService.getMoniteurJob().subscribe(data=>{
        this.moniteurJob = JSON.parse(data);
      })
    }
    
    getAutoecoleVendre(){
      this.dataService.getAutoecoleVendre().subscribe(data=>{
        this.autoEcoleVendre = JSON.parse(data);
      })
    }
    autoEcoleWithAbonnement(){
      this.dataService.getAbonnementAutoEcole().subscribe(data=>{
        this.autoEcoleAbonnee = data
      })
    }
    navTo(url:any){
      this.router.navigateByUrl(url);
    }
    getBlogs(){
      this.dataService.getBlogs().subscribe(data=>{
        this.blogs = JSON.parse(data)
        this.blogs.map(blog=>blog.created_at = blog?.created_at.split('T')[0])
      })
    }
    ngAfterViewInit(){
  
    }
  
    trackById(index: number, item: any) {
      return item.id
  }
  trackByIdvehicule(index: number, item: any) {
    return item.id
  }
  trackByIdMoniteur(index: number, item: any) {
    return item.id
  }
  trackByIdAutoEcoleVendre(index: number, item: any) {
    return item.id
  }
  trackByIdAutoEcoleAbonnee(index: number, item: any) {
    return item.id
  }
  addSlide() {
  }
      
  removeSlide() {
  }
      
  slickInit(e) {
  }
      
  breakpoint(e) {
  }
  
  afterChange(e) {
  }
  
  beforeChange(e) {
  }     


}
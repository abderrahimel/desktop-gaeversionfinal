import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from "@ngrx/store";
import { forkJoin, Observable, of } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { DataService } from "../services/data.service";
import { addAutoEcole } from "../state/autoEcole/autoEcole.actions";
import { AutoEcoleState } from "../state/autoEcole/autoEcole.state";
import { addUser } from "../state/user/user.actions";
import { UserState } from "../state/user/user.state";
import { VehiculeState } from "../state/vehicule/vehicule.state";


@Injectable()
export class RouteResolver implements Resolve<any> {
    user:any;
    userBoolean:boolean = false;
    autoEcole:any;
    vehicule:any; 
    moniteurT:any;
    moniteurP:any;
    constructor(private dataService: DataService, private auth: AuthService,
        private store: Store<{user:UserState, vehicule: VehiculeState, autoEcole: AutoEcoleState}>){
    }
     resolve(){  
      let userCall = this.auth.getUser();
               this.store.subscribe(store =>{
                if(!store.user.user.loaded){
                  this.auth.getUser().subscribe(data =>{
                    this.user = data;
                    let user = {
                        id: this.user.id,
                        login: this.user.login,
                        email: this.user.email,
                        name: this.user.name,
                        type: this.user.type
                      };
                      console.log(this.user);
                      // send user data to the store 
                    this.store.dispatch(addUser({payload: user}));
                    console.log(this.user.id);
                    // this.autoEcole =   this.dataService.getAutoEcoleByIdUser(this.user.id);
                    // this.vehicule =  this.dataService.getVehicules(localStorage.getItem('autoEcole_id'));
                    // this.moniteurT =  this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')); 
                    // this.moniteurP = this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id'));   
                })
                }
               })
                this.auth.getUser().subscribe(data =>{
                    this.user = data;
                    let user = {
                        id: this.user.id,
                        login: this.user.login,
                        email: this.user.email,
                        name: this.user.name,
                        type: this.user.type
                      };
                      console.log(this.user);
                      // send user data to the store 
                    this.store.dispatch(addUser({payload: user}));
                    console.log(this.user.id);
                    // this.autoEcole =   this.dataService.getAutoEcoleByIdUser(this.user.id);
                    // this.vehicule =  this.dataService.getVehicules(localStorage.getItem('autoEcole_id'));
                    // this.moniteurT =  this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')); 
                    // this.moniteurP = this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id'));   
                })
          
       
        
       
     }
}
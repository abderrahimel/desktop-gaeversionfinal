import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addAutoEcole } from '../autoEcole/autoEcole.actions';
import { take } from 'rxjs/operators';
import 'rxjs/Rx';
import { of } from 'rxjs';
import { VehiculeState } from './vehicule.state';
import { loadViheculeAction } from './vehicule.actions';

@Injectable({
  providedIn: 'root'
})
export class VehiculeResolverService implements Resolve<any> {
  userData:any;
  constructor(private store: Store<{vehicule:VehiculeState}>,
              private auth:AuthService,
              private router: Router,
              private dataService: DataService
    ) { }

  resolve():Observable<any>{
      //  this.initVehiculeData();
       return of(true);
  }

  initVehiculeData():void {
    this.store.pipe(take(1)).subscribe(store =>{
      console.log("!store.user.loaded", store.vehicule.vehicule.loaded);
      if(!store.vehicule.vehicule.loaded){
        // load data from the api to the store of 
       
        this.auth.getUser().subscribe(data => {
          this.userData = data
          let idC = {
            id: this.userData.id,
          }
          // dispatch action to load vehicule from DB
          this.store.dispatch(loadViheculeAction(idC));
        }
          );
      }
    })
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addAutoEcole } from '../autoEcole/autoEcole.actions';
import { AutoEcoleState } from '../autoEcole/autoEcole.state';
import { loadViheculeAction, loadViheculeToStore } from './vehicule.actions';
import { VehiculeState } from './vehicule.state';

@Injectable()
export class VehiculeEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{vehicule:VehiculeState, autoEcole: AutoEcoleState}>) {}
   
  loadVehicule$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadViheculeAction),
    
     exhaustMap((action)=>{
        return this.dataService.getVehicules(action.id)
        .pipe(
            map((data)=>{
                return loadViheculeToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  
}

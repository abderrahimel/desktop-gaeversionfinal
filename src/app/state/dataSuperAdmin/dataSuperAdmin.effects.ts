import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadSuperAdminData, loadSuperAdminDataToStore } from './dataSuperAdmin.actions';
import { DataSuperAdminState } from './dataSuperAdmin.state';

@Injectable()
export class SuperAdminEffects {
  depenseCategorie:any;
  dataPersonnel:any;
  dataVehicule:any;
  dataLocal:any;
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{dataSuperAdmin: DataSuperAdminState}>) {}
    loadSuperAdminData$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadSuperAdminData),
     exhaustMap((action)=>{
        return this.dataService.getDataSuper()
        .pipe( 
            map((data)=>{
                return loadSuperAdminDataToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })


}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadMoniteurAdminAction, loadMoniteurAdminpayloadtostore } from './moniteuradmi.action';
import { MoniteuradminState } from './moniteuradmin.state';

@Injectable()
export class MoniteuradminEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{moniteuradmin: MoniteuradminState}>,
    ) {}
   
    loadMoniteurAdminAction$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadMoniteurAdminAction),
    
     exhaustMap((action)=>{
        return this.dataService.getMoniteurJob()
        .pipe(
            map((data)=>{
                return loadMoniteurAdminpayloadtostore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })


}

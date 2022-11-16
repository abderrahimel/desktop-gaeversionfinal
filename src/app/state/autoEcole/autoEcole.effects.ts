import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgWizardDataService } from 'ng-wizard/lib/core/ng-wizard-data.service';
import { exhaustMap, map } from 'rxjs/operators';
import { loadAutoecole, loadAutoecoletostore } from './autoEcole.actions';
import { DataService } from 'src/app/services/data.service';
import { AutoEcoleState } from './autoEcole.state';
import { Store } from '@ngrx/store';
@Injectable()
export class AutoEcoleEffect {
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private store: Store<{autoEcole: AutoEcoleState}>
    ) {}

    loadarchivecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAutoecole),
     exhaustMap((action)=>{
        return this.dataServece
        .getAutoEcoleById(localStorage.getItem('autoEcole_id'))
        .pipe(
            map((data:any)=>{
                return loadAutoecoletostore({payload: data});
            })
        )
     })
    )
  })

}

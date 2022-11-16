import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Store } from '@ngrx/store';
import { AutoecolesApproverState } from './autoecolesApprover.state';
import { loadAutoEcolesApprover, loadAutoEcolesApprovertostore } from './autoecolesApprover.acttions';

@Injectable()
export class AutoecolesApproverEffects {
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private candidatService: CandidatService,
    private store: Store<{autoecolesApprover: AutoecolesApproverState}>
    ) {}

    loadAutoEcolesApprover$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAutoEcolesApprover),
     exhaustMap((action)=>{
        return  this.dataServece.getAutoEcoleApprover()
        .pipe(
            map((data:any)=>{
                return loadAutoEcolesApprovertostore({payload: data});
            })
        )
     })
    )
  })
}
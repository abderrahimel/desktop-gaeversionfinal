import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Store } from '@ngrx/store';
import { AutoecolesState } from './autoecoles.state';
import { loadautoecoles, loadautoecolestostoreaction } from './autoecoles.actions';

@Injectable()
export class AutoecolesEffects {
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private candidatService: CandidatService,
    private store: Store<{autoecoles: AutoecolesState}>
    ) {}

    loadautoecoles$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadautoecoles),
     exhaustMap((action)=>{
        return  this.dataServece.getAllAutoEcole()
        .pipe(
            map((data:any)=>{
                return loadautoecolestostoreaction({payload: data});
            })
        )
     })
    )
  })
}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadassurance, loadassuranceToStore } from './assurance.actions';
import { AssuranceState } from './assurance.state';


@Injectable()
export class AssuranceEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{assurance:AssuranceState}>) {}

    loadvidange$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadassurance),
     exhaustMap((action)=>{
        return this.dataService
        .getAssurance(action.idAuto)
        .pipe(
            map((data)=>{
                return loadassuranceToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
}
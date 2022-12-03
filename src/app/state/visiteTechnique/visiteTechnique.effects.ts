import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadvisiteTechnique, loadvisiteTechniqueToStore } from './visiteTechnique.actions';
import { VisiteTechniqueState } from './visiteTechnique.state';


@Injectable()
export class VisiteTechniqueEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{visiteTechnique:VisiteTechniqueState}>) {}

    loadVente$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadvisiteTechnique),
     exhaustMap((action)=>{
        return this.dataService
        .getVisiteTechnique(action.idAuto)
        .pipe(
            map((data)=>{
                return loadvisiteTechniqueToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadExamenReussiAction, loadExamenReussiToStore } from './examenreussi.actions';
import { ExamenreussiState } from './examenreussi.state';

@Injectable()
export class ExamenReussiEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService, 
    private store: Store<{examenreussi: ExamenreussiState}>,
    private router: Router
    ) {}
    loadExamenReussiAction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadExamenReussiAction),
     exhaustMap((action)=>{
        return this.dataService.getExamenReussi(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadExamenReussiToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })

}
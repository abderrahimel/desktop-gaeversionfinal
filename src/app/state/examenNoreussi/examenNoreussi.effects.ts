import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadExamenNoReussiAction, loadExamenNoReussiToStore } from './examenNoreussi.actions';
import { ExamenNoreussiState } from './examenNoreussi.state';


@Injectable()
export class ExamenNoReussiEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,  
    private store: Store<{examenNoreussi: ExamenNoreussiState}>,
    private router: Router
    ) {}
    loadExamennOReussiAction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadExamenNoReussiAction),
     exhaustMap((action)=>{
        return this.dataService.getExamenNoReussi(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadExamenNoReussiToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })

}
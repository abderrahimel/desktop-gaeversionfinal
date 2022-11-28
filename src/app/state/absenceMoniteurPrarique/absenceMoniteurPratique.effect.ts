import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadAbsenceMoniteurPratique, loadedAbsenceMoniteurPratique} from './absenceMoniteurPratique.actions';
import { AbsenceMoniteurPratiqueState } from './absenceMoniteurPratique.state';

@Injectable()
export class AbsenceMoniteurPratiqueEffects {
  constructor(
    private actions$: Actions,
    private router: Router,   // 
    private dataService: DataService,
    private store: Store<{absenceMoniteurPratique: AbsenceMoniteurPratiqueState}>) {}

    loadAbsenceMoniteurPratique$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAbsenceMoniteurPratique),
     exhaustMap((action)=>{
        return this.dataService.getAbsenceMoniteurPratique(action.idAutoEcole)
        .pipe( 
            map((data)=>{
              console.log("absence moniteur pratique");console.log(JSON.parse(data));
                return loadedAbsenceMoniteurPratique({payload: JSON.parse(data)});
            })
        )
     })
    )
  })

}
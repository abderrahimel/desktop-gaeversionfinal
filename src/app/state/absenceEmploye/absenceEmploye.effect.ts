import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addabsenceEmployeAction, deleteabsenceEmployeById, loadabsenceEmploye, loadedabsenceEmploye, updateabsenceEmployeAction } from './absenceEmploye.actions';

import { AbsenceEmployeState } from './absenceEmploye.state';

@Injectable()
export class AbsenceEmployeEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private dataService: DataService,
    private store: Store<{absenceEmploye: AbsenceEmployeState}>) {}
    loadAbsence$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadabsenceEmploye),
     exhaustMap((action)=>{
        return this.dataService.getAbsence(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadedabsenceEmploye({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  deletAbsenceById$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteabsenceEmployeById),
     exhaustMap((action)=>{
        return this.dataService.deleteAbsence(action.id)
        .pipe( 
            map((data)=>{
                return loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  addAbsence$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addabsenceEmployeAction),
     exhaustMap((action)=>{
        return this.dataService.insertAbsence(action.idAutoEcole, action.data)
        .pipe( 
            map((data)=>{
                this.router.navigateByUrl('/listes-absences');
                return loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  // updateAbsenceAction
  updateAbsenceAction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateabsenceEmployeAction),
     exhaustMap((action)=>{
        return this.dataService.updateAbsence(action.id, action.data)
        .pipe( 
            map((data)=>{
                this.router.navigateByUrl('/listes-absences');
                return loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
}



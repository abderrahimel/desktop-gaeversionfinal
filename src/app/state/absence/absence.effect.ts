import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addAbsenceAction, deleteAbsenceById, loadAbsence, loadAbsenceMoniteurPratique, loadedAbsence, loadedAbsenceMoniteurPratique, updateAbsenceAction } from './absence.actions';
import { AbsenceState } from './absence.state';

@Injectable()
export class AbsenceEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private dataService: DataService,
    private store: Store<{absence: AbsenceState}>) {}
    loadAbsence$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAbsence),
     exhaustMap((action)=>{
        return this.dataService.getAbsenceMoniteurTheorique(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadedAbsence({payload: JSON.parse(data)});
            })
        )
     })
    )
  })

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
  deletAbsenceById$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteAbsenceById),
     exhaustMap((action)=>{
        return this.dataService.deleteAbsence(action.id)
        .pipe( 
            map((data)=>{
                return loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  addAbsence$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addAbsenceAction),
     exhaustMap((action)=>{
        return this.dataService.insertAbsence(action.idAutoEcole, action.data)
        .pipe( 
            map((data)=>{
                this.router.navigateByUrl('/listes-absences');
                return loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  // updateAbsenceAction
  updateAbsenceAction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateAbsenceAction),
     exhaustMap((action)=>{
        return this.dataService.updateAbsence(action.id, action.data)
        .pipe( 
            map((data)=>{
                this.router.navigateByUrl('/listes-absences');
                return loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
}



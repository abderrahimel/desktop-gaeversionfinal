import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addMoniteurP, deleteMoniteurP, loadMoniteurP, loadMoniteurPratiqueTostore, updateMoniteurP } from './moniteurPratique.actions';
import { MoniteurPratiqueState } from './moniteurPratique.state';


@Injectable()
export class MoniteurPratiqueEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{moniteur: MoniteurPratiqueState}>) {}
   loadMoniteurP$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadMoniteurP),
     exhaustMap((action)=>{
        return this.dataService.getMoniteurP(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadMoniteurPratiqueTostore({payload: data});
            })
        )
     })
    )
  })

  addMoniteurP$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addMoniteurP),
     exhaustMap((action)=>{
        return this.dataService.addMoniteurP(action.idAuto, action.payload)
        .pipe(
            map((data)=>{
                return loadMoniteurP({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

  deleteMoniteurP$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteMoniteurP),
     exhaustMap((action)=>{
        return this.dataService.deleteMoniteurP(action.id)
        .pipe(
            map((data)=>{
                return loadMoniteurP({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

  // updateMoniteurP
  updateMoniteurP$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateMoniteurP),
     exhaustMap((action)=>{
        return this.dataService.updateMoniteurP(action.id, action.data)
        .pipe(
            map((data)=>{
                return loadMoniteurP({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

}
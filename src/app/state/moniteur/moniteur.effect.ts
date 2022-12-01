import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {  catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { setErrorMessage } from '../candidat/candidat.actions';
import {addMoniteurT, deleteMoniteurT,  loadMoniteurT, loadMoniteurToStore, updateMoniteurT } from './moniteur.actions';
import { MoniteurState } from './moniteur.state';

@Injectable()
export class MoniteurEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{moniteur: MoniteurState}>) {}

   // effect for loading moniteur theorique
   loadMoniteurT$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadMoniteurT),
     exhaustMap((action)=>{
        return this.dataService.getMoniteurT(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadMoniteurToStore({payload: data});
               
            })
        )
     })
    )
  })

  addMoniteurT$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addMoniteurT),
     exhaustMap((action)=>{
        return this.dataService.addMoniteurT(action.idAuto, action.payload)
        .pipe(
            map((data)=>{
                return loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')});
            }),
            catchError((error) => {
             
              return of(setErrorMessage({ message: error }));
            })
        )
     })
    )
  })

  // deleteMoniteurT deleteMoniteurP deleteMoniteurT deleteMoniteurP
  deleteMoniteurT$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteMoniteurT),
     exhaustMap((action)=>{
        return this.dataService.deleteMoniteurT(action.id)
        .pipe(
            map((data)=>{
                return loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

  // updateMoniteurT
  updateMoniteurT$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateMoniteurT),
     exhaustMap((action)=>{
        return this.dataService.updateMoniteurT(action.id, action.data)
        .pipe(
            map((data)=>{
                return loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })


}
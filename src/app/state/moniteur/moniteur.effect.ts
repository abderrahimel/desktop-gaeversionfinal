import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {  catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { setErrorMessage } from '../candidat/candidat.actions';
import { addMoniteurP, addMoniteurT, deleteMoniteurP, deleteMoniteurT, loadMoniteurP, loadMoniteurPtoStore, loadMoniteurT, loadMoniteurToStore, updateMoniteurP, updateMoniteurT } from './moniteur.actions';
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
  // loadMoniteurP
  // loadMoniteurP$ = createEffect(()=>{
  //   return this.actions$.pipe(ofType(loadMoniteurP),
  //    exhaustMap((action)=>{
  //       console.log("call effect loadMoniteurP$");
  //       console.log(action.idAutoEcole);
  //       return this.dataService.getMoniteursP(action.idAutoEcole)
  //       .pipe(
  //           map((data)=>{
  //             console.log("moniteur pratique from the service effect--------------------------------------------");
  //             console.log(data);
  //               return loadMoniteurPtoStore({payload: data});
  //           })
  //       )
  //    })
  //   )
  // })
  addMoniteurT$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addMoniteurT),
     exhaustMap((action)=>{
        return this.dataService.addMoniteurT(action.idAuto, action.payload)
        .pipe(
            map((data)=>{
                this.router.navigateByUrl('/listes-moniteurs');
                return loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')});
            }),
            catchError((error) => {
             
              return of(setErrorMessage({ message: error }));
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
                this.router.navigateByUrl('/listes-moniteurs');
                return loadMoniteurP({idAutoEcole: localStorage.getItem('autoEcole_id')});
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
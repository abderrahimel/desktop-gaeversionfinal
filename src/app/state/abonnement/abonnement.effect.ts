import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { StateAbonnement } from './abonnement.state';
import { loadAbonnemtAction, loadAbonnemtActiontostore } from './abonnemet.action';


@Injectable()
export class AbonementEffects {
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private store: Store<{abonement: StateAbonnement}>,
    
    ) {}

    loadAbonnemtAction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAbonnemtAction),
     exhaustMap((action)=>{
        return this.dataServece.getAbonnementAutoEcole()
        .pipe( 
            map((data)=>{
                return loadAbonnemtActiontostore({payload: data});
            })
        )
     })
    )
  })

}



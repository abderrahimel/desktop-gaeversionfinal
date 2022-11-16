import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AutoEcoleWithAbonnementState } from './autoEcoleWithAbonnement.state';
import { loadautoEcoleWithAbonnement, sendautoEcoleWithAbonnementDataTOstore } from './autoEcoleWithAbonnement.actions';

@Injectable()
export class AutoEcoleWithAbonnementEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{autoEcoleWithAbonnement: AutoEcoleWithAbonnementState}>
    ) {}
  boutique$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadautoEcoleWithAbonnement),
     exhaustMap((action)=>{
        return this.dataService
        .getAbonnementAutoEcole()
        .pipe(
            map((data:any)=>{
                return sendautoEcoleWithAbonnementDataTOstore({data: data});
            })
        )
     })
    )
  })

}
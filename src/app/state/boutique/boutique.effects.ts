import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { BoutiqueState } from './boutique.state';
import { Store } from '@ngrx/store';
import { loadBoutique, sendBoutiqueDataTOstore } from './boutique.actions';

@Injectable()
export class BoutiqueEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{boutique: BoutiqueState}>
    ) {}
  boutique$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadBoutique),
     exhaustMap((action)=>{
        return this.dataService
        .getBoutique()
        .pipe(
            map((data:any)=>{
                return sendBoutiqueDataTOstore({data: data});
            })
        )
     })
    )
  })

}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Store } from '@ngrx/store';
import { AutoecolesEnAttenteState } from './autoecolesEnAttente.state';
import { loadAutoEcolesEnAttente, loadAutoEcolesEnAttentetostore } from './autoecolesEnAttente.actions';

@Injectable()
export class AutoecolesEnAttenteEffects {
  constructor(
    private actions$: Actions,
    private dataServece: DataService,
    private candidatService: CandidatService,
    private store: Store<{autoecolesEnAttente: AutoecolesEnAttenteState}>
    ) {}

    loadAutoEcolesEnAttente$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAutoEcolesEnAttente),
     exhaustMap((action)=>{
        return  this.dataServece.getAutoEcolesEnAttente()
        .pipe(
            map((data:any)=>{
                return loadAutoEcolesEnAttentetostore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
}
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadautoecolevendreaction, loadautoecolevendretostore } from './autoecolevendre.action';
import { AutoecolevendreState } from './autoecolevendre.state';

@Injectable()
export class AutoecolevendreEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{autoecolevendre: AutoecolevendreState}>
    ) {}

    loadautoecolevendreaction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadautoecolevendreaction),
     exhaustMap(()=>{
        return this.dataService.getAutoecoleVendre()
        .pipe(
            map((data:any)=>{
                return loadautoecolevendretostore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })



}
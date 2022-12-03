import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadvidange, loadvidangeToStore } from './vidange.actions';
import { VidangeState } from './vidange.state';

@Injectable()
export class VidangeEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{vidange:VidangeState}>) {}

    loadvidange$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadvidange),
     exhaustMap((action)=>{
        return this.dataService
        .getVidange(action.idAuto)
        .pipe(
            map((data)=>{
                return loadvidangeToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
}
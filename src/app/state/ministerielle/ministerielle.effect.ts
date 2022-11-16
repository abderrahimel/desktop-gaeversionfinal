import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {  exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadministerielleaction, loadministerielleactionStore } from './ministerielle.actions';
import { MinisterielleState } from './ministerielle.sate';


@Injectable()
export class MinisterielleEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{ministerielle: MinisterielleState}>) {}

   loadministerielleaction$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadministerielleaction),
     exhaustMap((action)=>{
        return this.dataService.getNoteMinisterielle()
        .pipe(
            map((data)=>{
                return loadministerielleactionStore({payload: JSON.parse(data)});
               
            })
        )
     })
    )
  })



}
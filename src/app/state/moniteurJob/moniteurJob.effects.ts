import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MoniteurJobState } from './moniteurJob.state';
import { loadMoniteurJob, sendMoniteurJobDataTOstore } from './moniteurJob.actions';
import { JsonPipe } from '@angular/common';

@Injectable()
export class MoniteurJobEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{moniteurJob: MoniteurJobState}>   
    ) {}
    moniteurJob$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadMoniteurJob),
     exhaustMap((action)=>{
        return this.dataService
        .getMoniteurJob()
        .pipe(
            map((data:any)=>{
                return sendMoniteurJobDataTOstore({data: JSON.parse(data)});
            })
        )
     })
    )
  })

}
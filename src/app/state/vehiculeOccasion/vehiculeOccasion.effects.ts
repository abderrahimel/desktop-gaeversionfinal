import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { VehiculeOccasionState } from './vehiculeOccasion.state';
import { loadVehiculeOccasion, sendvehiculeOccasionDataTOstore } from './vehiculeOccasion.actions';

@Injectable()
export class VehiculeOccasionEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router,
    private store: Store<{vehiculeOccasion: VehiculeOccasionState}>   
    ) {}
    vehiculeOccasion$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadVehiculeOccasion),
     exhaustMap((action)=>{
        return this.dataService
        .getVehiculeOccasion()
        .pipe(
            map((data:any)=>{
                return sendvehiculeOccasionDataTOstore({data: data});
            })
        )
     })
    )
  })

}
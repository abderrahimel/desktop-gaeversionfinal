import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addAutoEcole } from '../autoEcole/autoEcole.actions';
import { AutoEcoleState } from '../autoEcole/autoEcole.state';
import { loadedPresencecourTheoriqueToStore, loadPresencecourTheorique, removePresenceById } from './presencecours.actions';
import { presencecourState } from './presencecours.state';

@Injectable()
export class PresencecourEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{presencecour: presencecourState, autoEcole: AutoEcoleState}>) {}
   
    loadPresencecourTheorique$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadPresencecourTheorique),
    
     exhaustMap((action)=>{
        return this.dataService.getPresenceCourTheorique(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadedPresencecourTheoriqueToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  // 
  removePresenceById$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(removePresenceById),
    
     exhaustMap((action)=>{
        return this.dataService.deletPresenceCourT(action.id)
        .pipe(
            map((data)=>{
                return loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
}

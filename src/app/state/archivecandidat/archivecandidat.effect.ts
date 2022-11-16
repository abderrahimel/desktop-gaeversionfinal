import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { loadarchivecandidat, loadedarchivecandidat, recuperarchivecandidat } from './archivecandidat.actions';

@Injectable()
export class ArchivecandidatEffects {
  constructor(
    private actions$: Actions,
    private candidatService: CandidatService
    ) {}

    loadarchivecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadarchivecandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .getarchivecandidat(action.idAutoEcole)
        .pipe(
            map((data:any)=>{
                return loadedarchivecandidat({payload: data});
            })
        )
     })
    )
  })
  // recuperarchivecandidat
  recuperarchivecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(recuperarchivecandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .recuperer(action.id)
        .pipe(
            map((data:any)=>{
                return loadarchivecandidat({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
}

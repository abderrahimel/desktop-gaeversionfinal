import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { activehistoriquecandidat, loadedhistoriquecandidat, loadhistoriquecandidat, removehistoriquecandidat, removehistoriquecandidatById } from './historiquecandidat.actions';
import { Store } from '@ngrx/store';
import { historiquecandidatState } from './historiquecandidat.state';

@Injectable()
export class HistoriqueCandidatEffects {
  constructor(
    private actions$: Actions,
    private candidatService: CandidatService,
    private store: Store<{historiquecandidat: historiquecandidatState}>
    ) {}

    loadhistoriquecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadhistoriquecandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .getCandidatHistorique(action.idAutoEcole)   
        .pipe(
            map((data:any)=>{
                let historiquecandidat = data.filter(candidat => candidat.actif != 1);
                return loadedhistoriquecandidat({payload: historiquecandidat});
            })
        )
     })
    )
  })

  activehistoriquecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(activehistoriquecandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .activerCandidat(action.id)
        .pipe(
            map((data:any)=>{
                
                return loadhistoriquecandidat({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
  removehistoriquecandidatById$ = createEffect(()=>{
    return this.actions$.pipe(ofType(removehistoriquecandidatById),
     exhaustMap((action)=>{
        return this.candidatService
        .deleteCandidat(action.id)
        .pipe(
            map((data:any)=>{
              return loadhistoriquecandidat({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

}
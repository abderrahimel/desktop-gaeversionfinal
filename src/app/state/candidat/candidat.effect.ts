import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { addCandidat, candidatStart, creatnewcandidat, deleteCandidatById, desactiveCandidatById, redirectedToCandidat, redirectTocandidat, setErrorMessage, updatecandidat } from './candidat.actions';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class CandidatsEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private candidatService: CandidatService,
    private router: Router
    ) {}

  candidat$ = createEffect(()=>{
    // send id auto ecole with action candidatStart
    return this.actions$.pipe(ofType(candidatStart),
     exhaustMap((action)=>{
        return this.dataService
        .getCandidat(action.idAutoEcole)
        .pipe(
            map((data:any)=>{
                let  candidatBasic = null;
                let  candidatSupplementaire = null;
                let candidatData = JSON.parse(data);
                candidatData = candidatData.filter(candidat => candidat.actif === 1 );
                candidatBasic = candidatData.filter(candidat => candidat.type_formation != "supplementaire");
                candidatSupplementaire = candidatData.filter(candidat => candidat.type_formation === "supplementaire");
                return addCandidat({candidatBasic, candidatSupplementaire});
            })
        )
     })
    )
  })
  deleteCandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteCandidatById),
     exhaustMap((action)=>{
        return this.candidatService
        .deleteCandidat(action.id)
        .pipe(
            map((data:any)=>{
                return candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
  desactiveCandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(desactiveCandidatById),
     exhaustMap((action)=>{
        return this.candidatService
        .desactiverCandidat(action.id)
        .pipe(
            map((data:any)=>{
                return candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
  //
  creatnewcandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(creatnewcandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .newcandidat(action.idautoecole, action.data)
        .pipe(
            map((data:any)=>{
              this.router.navigateByUrl('/candidat');
              return candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
      
     })
    )
  })
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(creatnewcandidat),
      exhaustMap((action) => {
        return this.candidatService.newcandidat(action.idautoecole, action.data).pipe(
          map((data) => {
            return candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')});
          }),
          catchError((error) => {
           
            return of(setErrorMessage({ message: error }));
          })
        );
      })
    );
  });
  //  

  updatecandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updatecandidat),
     exhaustMap((action)=>{
        return this.candidatService
        .updatecandidat(action.id, action.data)
        .pipe(
            map((data:any)=>{
              this.router.navigateByUrl('/candidat');
              return candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
 

}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadproduitCandidat, loadproduitCandidatToStore } from './produitCandidat.actions';
import { ProduitCandidatState } from './produitCandidat.state';

@Injectable()
export class ProduitCandidatEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{produitCandidat: ProduitCandidatState}>,
    private router:Router
    ) {}
   
    loadproduitCandidat$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadproduitCandidat),
    
     exhaustMap((action)=>{
        return this.dataService.getProduitCandidats(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadproduitCandidatToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })

}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadProduitSuperAdmin, loadProduitSuperAdmintostoreaction } from './produitSuperAdmin.actions';
import { ProduitSuperAdminState } from './produitSuperAdmin.state';

@Injectable()
export class ProduitSuperAdminEffects {
    users:any;
    users1:any = [];
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{produitSuperAdmin: ProduitSuperAdminState}>) {}
   
    loadProduitSuperAdmin$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadProduitSuperAdmin),
    
     exhaustMap((action)=>{
        return this.dataService.getAllProduit()
        .pipe(
            map((data)=>{
                return loadProduitSuperAdmintostoreaction({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  
}

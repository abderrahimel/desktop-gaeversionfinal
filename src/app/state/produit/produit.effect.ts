import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadproduitCandidat } from '../produitCandidat/produitCandidat.actions';
import { ProduitCandidatState } from '../produitCandidat/produitCandidat.state';
import { addProduit, deletProduit, loadProduit, loadProduitToStore, updateProduit } from './produit.actions';
import { ProduitState } from './produit.state';

@Injectable()
export class ProduitsEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private router:Router,
    private store: Store<{produitA: ProduitState, produitCandidat: ProduitCandidatState}>) {}
   
  loadVehicule$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadProduit),
    
     exhaustMap((action)=>{
        return this.dataService.getProduit(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadProduitToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  
  deleteProduit$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(deletProduit),
    
     exhaustMap((action)=>{
        return this.dataService.deleteProduit(action.id)
        .pipe(
            map((data)=>{
                this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
                return loadProduit({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

  addProduit$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(addProduit),
    
     exhaustMap((action)=>{
        return this.dataService.addProduit(action.idAutoEcole, action.data)
        .pipe(
            map((data)=>{
                this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
                return loadProduit({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
  updateProduit$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(updateProduit),
    
     exhaustMap((action)=>{
        return this.dataService.updateProduit(action.id, action.data)
        .pipe(
            map((data)=>{
                this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
                return loadProduit({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })
}

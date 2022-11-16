import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deleteVente, loadVente, loadVenteToStore } from './vente.actions';
import { VenteState } from './vente.state';

@Injectable()
export class VenteEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{vente:VenteState}>) {}

    loadVente$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadVente),
     exhaustMap((action)=>{
        return this.dataService
        .getVentes(action.idAuto)
        .pipe(
            map((data)=>{
                return loadVenteToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
 // deleteVente
 deleteVente$ = createEffect(()=>{
  return this.actions$.pipe(ofType(deleteVente),
   exhaustMap((action)=>{
      return this.dataService
      .deleteVente(action.id)
      .pipe(
          map((data)=>{
              return loadVente({idAuto: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})

}


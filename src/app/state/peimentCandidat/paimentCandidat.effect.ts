import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addPaiment, deletepaimentById, loadedPaiment, loadPaiment, updatePaiment } from './paimentCandidat.actions';
import { PaimentCandidatState } from './peimentCandidat.state';

@Injectable()
export class PaimentCandidatEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{paimentCandidat: PaimentCandidatState}>) {}
    paimentCandidat$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadPaiment),
     exhaustMap((action)=>{
        return this.dataService.getExamen(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadedPaiment({payload: data});
               
            })
        )
     })
    )
  })

addPaiment$ = createEffect(()=>{
  return this.actions$.pipe(ofType(addPaiment),
   exhaustMap((action)=>{
      return this.dataService.addPaiment(action.idAutoEcole, action.idCandidat, action.data)
      .pipe( 
          map((data)=>{
              return loadPaiment({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          })
      )
   })
  )
}) 
// 
updatePaiment$ = createEffect(()=>{
  return this.actions$.pipe(ofType(updatePaiment),
   exhaustMap((action)=>{
      return this.dataService.updatePaiment(action.idPaiment, action.data)
      .pipe( 
          map((data)=>{
              return loadPaiment({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          })
      )
   })
  )
})
// deletepaimentById
deletepaimentById$ = createEffect(()=>{
  return this.actions$.pipe(ofType(deletepaimentById),
   exhaustMap((action)=>{
      return this.dataService.deletepaimentCandidat(action.id)
      .pipe( 
          map((data)=>{
              return loadPaiment({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          })
      )
   })
  )
})
}


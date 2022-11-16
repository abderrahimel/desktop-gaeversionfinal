import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deleteCourPratiqueById, deleteCourTheoriqueById, loadCourPratique, loadCourPratiqueToStore, loadCourTheorique, loadCourTheoriqueToStore } from './cour.actions';
import { CourState } from './cour.state';

@Injectable()
export class CoursEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{cours: CourState}>) {}

    loadCourTheorique$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadCourTheorique),
     exhaustMap((action)=>{
        return this.dataService.getCourTheorique(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadCourTheoriqueToStore({payload: JSON.parse(data)});
               
            })
        )
     })
    )
  })
 // this.dataservice.deletCourT(id)
 deleteCourTheoriqueByid$ = createEffect(()=>{
  return this.actions$.pipe(ofType(deleteCourTheoriqueById),
   exhaustMap((action)=>{
      return this.dataService.deletCourT(action.id)
      .pipe( 
          map((data)=>{
              return loadCourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})

 deleteCourpratiqueByid$ = createEffect(()=>{
  return this.actions$.pipe(ofType(deleteCourPratiqueById),
   exhaustMap((action)=>{
      return this.dataService.deletCourP(action.id)
      .pipe( 
          map((data)=>{
              return loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
// loadCourPratiqueToStore  loadCourPratique
loadCourPratique$ = createEffect(()=>{
  return this.actions$.pipe(ofType(loadCourPratique),
   exhaustMap((action)=>{
      return this.dataService.getCourPratique(action.idAutoEcole)
      .pipe( 
          map((data)=>{
              return loadCourPratiqueToStore({payload: JSON.parse(data)});
             
          })
      )
   })
  )
})

}
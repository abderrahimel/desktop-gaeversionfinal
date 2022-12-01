import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addExamen, loadedExamenToStore, loadExamenAction, loadExamenToStore, setExamenInTheStore, updateExamen } from './examen.actions';
import { ExamenState } from './examen.state';

@Injectable()
export class ExamenEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{examen: ExamenState}>,
    private router: Router
    ) {}
    loadExamen$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadExamenAction),
     exhaustMap((action)=>{
        return this.dataService.getExamen(action.idAutoEcole)
        .pipe( 
            map((data)=>{
              console.log("examen from effect");console.log(data);
                return loadExamenToStore({payload: data});
            })
        )
     })
    )
  })
  // /listes-examens
  updateExamen$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateExamen),
     exhaustMap((action)=>{
        return this.dataService.updateExamen(action.id ,action.data)
        .pipe( 
            map((data)=>{
                this.router.navigateByUrl('/listes-examens');
                return loadExamenAction({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
// addExamen 
addExamen$ = createEffect(()=>{
  return this.actions$.pipe(ofType(addExamen),
   exhaustMap((action)=>{
      return this.dataService.addExamen(action.idAutoEcole, action.data)
      .pipe( 
          map((data)=>{
              this.router.navigateByUrl('/listes-examens');
              return loadExamenAction({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          })
      )
   })
  )
})

}


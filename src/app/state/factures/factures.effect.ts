import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addfactures, deletfactures, loadfactures, loadfacturesToStore, updatefactures } from './factures.actions';
import { FactureState } from './factures.state';

@Injectable()
export class FactureEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{factures: FactureState}>,
    private router:Router
    ) {}
   
    loadfactures$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadfactures),
    
     exhaustMap((action)=>{
        return this.dataService.getFactures(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadfacturesToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
// 
deletfactures$ = createEffect(()=>{
    
  return this.actions$.pipe(ofType(deletfactures),
  
   exhaustMap((action)=>{
      return this.dataService.deletFacture(action.id)
      .pipe(
          map((data)=>{
              return loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
//  addFacture 
addfactures$ = createEffect(()=>{
    
  return this.actions$.pipe(ofType(addfactures),
  
   exhaustMap((action)=>{
      return this.dataService.addFacture(action.idAutoEcole, action.data)
      .pipe(
          map((data)=>{
              this.router.navigateByUrl('/listes-factures');
              return loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
//  updatefactures effect
updatefactures$ = createEffect(()=>{ 
    
  return this.actions$.pipe(ofType(updatefactures),
  
   exhaustMap((action)=>{
      return this.dataService.updateFacture(action.id, action.data)
      .pipe(
          map((data)=>{
              this.router.navigateByUrl('/listes-factures');
              return loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
}

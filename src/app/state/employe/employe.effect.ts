import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addEmployeAction, deleteEmployeById, loadedEmploye, loadEmploye, redirectoRoutEmploye, updateEmployeAction } from './employe.action';
import { EmployeState } from './employe.state';

@Injectable()
export class EmployeEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private dataService: DataService,
    private store: Store<{employe: EmployeState}>) {}
    loadEmploye$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadEmploye),
     exhaustMap((action)=>{
        return this.dataService.getEmploye(action.idAutoEcole)
        .pipe( 
            map((data)=>{
              let employees = JSON.parse(data);
                return loadedEmploye({payload: employees});
            })
        )
     })
    )
  })
  deletEmployeById$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteEmployeById),
     exhaustMap((action)=>{
        return this.dataService.deleteEmployee(action.idEmploye)
        .pipe( 
            map((data)=>{
                return loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  addEmploye$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addEmployeAction), 
     exhaustMap((action)=>{
        return this.dataService.addemploye(action.idAutoEcole, action.data)
        .pipe( 
            map((data)=>{
                return loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
 updateEmployeAction$ = createEffect(()=>{
  return this.actions$.pipe(ofType(updateEmployeAction),
   exhaustMap((action)=>{
      return this.dataService.updateEmploye(action.id, action.data)
      .pipe( 
          map((data)=>{
              this.router.navigateByUrl('/listes-employees');
              return loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          })
      )
   })
  )
})
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addDepenseLocal, addDepensepersonnel, addDepensevehicule, deleteDepenselocal, deleteDepensepersonnel, deleteDepensevehicule, loadDepenselocal, loadDepenselocalToStore, loadDepensepersonnel, loadDepensepersonnelToStore, loadDepensevehicule, loadDepensevehiculeToStore, updateDepenselocal, updateDepensepersonnel, updateDepensevehicule } from './depense.actions';
import { DepenseState } from './depense.state';

@Injectable()
export class DepenseEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{depense: DepenseState}>) {}

    loadDepenselocal$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadDepenselocal),
     exhaustMap((action)=>{
        return this.dataService.getDepenceLocal(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadDepenselocalToStore({local: data});
            })
        )
     }) 
    )
  })
addDepenseLocal$ = createEffect(()=>{
  return this.actions$.pipe(ofType(addDepenseLocal),
   exhaustMap((action)=>{
      return this.dataService.addDepenselocal(action.idAutoEcole, action.data)
      .pipe( 
          map((data)=>{
              return loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   }) 
  )
})
updateDepenselocal$ = createEffect(()=>{
  return this.actions$.pipe(ofType(updateDepenselocal),
   exhaustMap((action)=>{
      return this.dataService.updateDepenselocal(action.id, action.data)
      .pipe( 
          map((data)=>{
              return loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   }) 
  )
})
  loadDepensepersonnel$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadDepensepersonnel),
     exhaustMap((action)=>{
        return this.dataService.getDepensePersonnel(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadDepensepersonnelToStore({personnel: data});
               
            }) 
        )
     })
    )
  })
 
addDepensepersonnel$ = createEffect(()=>{
  return this.actions$.pipe(ofType(addDepensepersonnel), 
   exhaustMap((action)=>{
      return this.dataService.addDepensePersonnel(action.idAutoEcole, action.data)
      .pipe( 
          map((data)=>{
              return loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          }) 
      )
   })
  )
})
updateDepensepersonnel$ = createEffect(()=>{ 
  return this.actions$.pipe(ofType(updateDepensepersonnel),
   exhaustMap((action)=>{
      return this.dataService.updateDepensePersonnel(action.id, action.data)
      .pipe( 
          map((data)=>{
              return loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')});
             
          }) 
      )
   })
  )
})
  loadDepensevehicule$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadDepensevehicule),
     exhaustMap((action)=>{
        return this.dataService.getDepenceVehicule(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                return loadDepensevehiculeToStore({vehicule: data});
               
            })
        )
     })
    )
  })
  addDepensevehicule$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addDepensevehicule), 
     exhaustMap((action)=>{
        return this.dataService.addDepensevehicule(action.idAutoEcole, action.data)
        .pipe( 
            map((data)=>{
                return loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })

  updateDepensevehicule$ = createEffect(()=>{ 
    return this.actions$.pipe(ofType(updateDepensevehicule),
     exhaustMap((action)=>{
        return this.dataService.updateDepensevehicule(action.id, action.data)
        .pipe( 
            map((data)=>{
                return loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })
  deleteDepenselocal$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteDepenselocal),
     exhaustMap((action)=>{
        return this.dataService.deleteDepenseLocal(action.id)
        .pipe( 
            map((data)=>{
                return loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  }) 
  deleteDepensevehicule$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteDepensevehicule),
     exhaustMap((action)=>{
        return this.dataService.deleteVehiculeDepence(action.id)
        .pipe( 
            map((data)=>{
                return loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })

  deleteDepensepersonnel$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deleteDepensepersonnel),
     exhaustMap((action)=>{
        return this.dataService.deletedepensep(action.id)
        .pipe( 
            map((data)=>{
                return loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')});
               
            })
        )
     })
    )
  })

}

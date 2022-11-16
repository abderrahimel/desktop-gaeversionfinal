import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addDepenseCategorie, deletDepenseCategorieById, loadCategoriedepense, loadcategoriedepenseToStore, updateDepenseCategorie } from './depenseCategorie.actions';
import { DepenseCategorieState } from './depenseCategorie.state';

@Injectable()
export class CategorieDepenseEffects {
  depenseCategorie:any;
  dataPersonnel:any;
  dataVehicule:any;
  dataLocal:any;
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{categorieDepense: DepenseCategorieState}>) {}
    loadDepenselocal$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadCategoriedepense),
     exhaustMap((action)=>{
        return this.dataService.getCategories(action.idAutoEcole) 
        .pipe( 
            map((data)=>{
                this.depenseCategorie = data; 
                this.dataPersonnel = this.depenseCategorie.filter(data => data?.type === 'personnel');
                this.dataVehicule = this.depenseCategorie.filter(data => data?.type === 'vehicule');
                this.dataLocal = this.depenseCategorie.filter(data => data?.type === 'local');
                return loadcategoriedepenseToStore({local: this.dataLocal, personnel: this.dataPersonnel, vehicule: this.dataVehicule});
            })
        )
     })
    )
  })
  deletDepenseCategorieById$ = createEffect(()=>{
    return this.actions$.pipe(ofType(deletDepenseCategorieById),
     exhaustMap((action)=>{
        return this.dataService.deleteDepenseCategorie(action.id)
        .pipe( 
            map((data)=>{
                return loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

  updateDepenseCategorie$ = createEffect(()=>{
    return this.actions$.pipe(ofType(updateDepenseCategorie),
     exhaustMap((action)=>{
        return this.dataService.updateDepenseCategorie(action.id, action.data)
        .pipe( 
            map((data)=>{
                return loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     }) 
    )
  })
  addDepenseCategorie$ = createEffect(()=>{
    return this.actions$.pipe(ofType(addDepenseCategorie),
     exhaustMap((action)=>{
        return this.dataService.addCategorie(action.idAutoEcole, action.data)
        .pipe( 
            map((data)=>{
                return loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')});
            })
        )
     })
    )
  })

}

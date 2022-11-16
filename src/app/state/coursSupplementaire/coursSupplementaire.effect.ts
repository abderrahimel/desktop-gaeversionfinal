import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadcoursSupplementaire, loadcoursSupplementaireToStore } from './coursSupplementaire.actions';
import { CoursRecetteState } from './coursSupplementaire.state';

@Injectable()
export class coursSupplementaireEffects {
  coursupplementaire:any;
  coursbasic:any;
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<{coursRecette: CoursRecetteState}>) {}
    loadcoursSupplementaire$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadcoursSupplementaire),
     exhaustMap((action)=>{
        return this.dataService.getPaiementCandidats(action.idAutoEcole)
        .pipe( 
            map((data)=>{
                this.coursupplementaire = JSON.parse(data);
                this.coursbasic = JSON.parse(data);
                this.coursupplementaire = this.coursupplementaire.filter(cs=>cs.candidat?.type_formation === 'supplementaire');
                this.coursbasic = this.coursbasic.filter(cs=>cs.candidat?.type_formation === 'basic');
                return loadcoursSupplementaireToStore({supplementaire: this.coursupplementaire, basic: this.coursbasic});
               
            })
        )
     })
    )
  })

}


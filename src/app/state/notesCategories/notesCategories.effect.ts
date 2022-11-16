import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addNote, deletnoteCategorie, loadnoteCategorie, loadnoteCategorieToStore, updateNote } from './notesCategories.actions';
import { NoteCategorieState } from './notesCategories.state';

@Injectable()
export class NoteCategorieEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{noteCategorie: NoteCategorieState}>,
    private router:Router
    ) {}
   
    loadnoteCategorie$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadnoteCategorie),
    
     exhaustMap((action)=>{
        console.log(action.idAutoEcole);
        return this.dataService.getNotes(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadnoteCategorieToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
// 
deletnoteCategorie$ = createEffect(()=>{
    
  return this.actions$.pipe(ofType(deletnoteCategorie),
  
   exhaustMap((action)=>{
      console.log(action.id);
      return this.dataService.deleteNote(action.id)
      .pipe(
          map((data)=>{
              return loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
// addNote 
addNote$ = createEffect(()=>{
    
  return this.actions$.pipe(ofType(addNote),
  
   exhaustMap((action)=>{
      console.log(action.idAutoEcole);
      return this.dataService.addNote(action.idAutoEcole, action.data)
      .pipe(
          map((data)=>{
              this.router.navigateByUrl('/listes-notes');
              return loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
// update note effect
updateNote$ = createEffect(()=>{ 
    
  return this.actions$.pipe(ofType(updateNote),
  
   exhaustMap((action)=>{
      console.log(action.id);
      return this.dataService.updateNote(action.id, action.data)
      .pipe(
          map((data)=>{
              this.router.navigateByUrl('/listes-notes');
              return loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')});
          })
      )
   })
  )
})
}

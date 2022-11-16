import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { addAutoEcole } from '../autoEcole/autoEcole.actions';
import { loadMoniteurP, loadMoniteurPtoStore, loadMoniteurT, loadMoniteurToStore } from '../moniteur/moniteur.actions';
import { loadViheculeAction, loadViheculeToStore } from '../vehicule/vehicule.actions';
import { addUser, getUser, loadAutoEcole, loadingUser, loginStart, loginSuccess } from './user.actions';
import { UserState } from './user.state';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{user:UserState}>) {}

  login$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loginStart),
     exhaustMap((action)=>{
        return this.AuthService
        .login({email:action.email, password: action.password})
        .pipe(
            map((data)=>{
              let {access_token, token_type} = JSON.parse(data)
                return loginSuccess({access_token, token_type});
            })
        )
     })
    )
  })
  loadingUser1$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadingUser),
     exhaustMap((action)=>{
        return this.AuthService
        .getUser()
        .pipe(
            map((data:any)=>{
              let userData = data;
              let user = {
                id: userData?.id,
                login: userData?.login,
                email: userData?.email,
                name: userData?.name,
                type: userData?.type
              }
               // add user to the store
               this.store.dispatch(addUser({payload: user}));
               return loadAutoEcole({id:userData?.id});
            })
        )
     })
    )
  })
  // *******************************************
  loadingUser$ = this.actions$.pipe(ofType(loadingUser),
    mergeMap((action)=>{
     return this.AuthService
        .getUser()
        .pipe(
          catchError( error =>{
            return of([]);
          })
        )
    }),
    map((data:any)=>{
      let userData = data;
      let user = {
        id: userData?.id,
        login: userData?.login,
        email: userData?.email,
        name: userData?.name,
        type: userData?.type
      }
       // add user to the store
       this.store.dispatch(addUser({payload: userData}));
       return loadAutoEcole({id:userData?.id});
    })
  );
// 






  loadAutoEcole$ = createEffect(()=>{
    return this.actions$.pipe(ofType(loadAutoEcole),
     exhaustMap((action)=>{
        return this.dataService
        .getAutoEcoleByIdUser(action.id)
        .pipe(
            map((data)=>{
              return addAutoEcole({payload: data[0]});
            })
        )
     })
    )
  })
  loadVehicule$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadViheculeAction),
     exhaustMap((action)=>{
        return this.dataService.getVehicules(action.id)
        .pipe(
            map((data)=>{
                return loadViheculeToStore({payload: JSON.parse(data)});
            })
        )
     })
    )
  })
  // effect for moniteur
  loadMoniteurP$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadMoniteurP),
     exhaustMap((action)=>{
        return this.dataService.getMoniteurP(action.idAutoEcole)
        .pipe(
            map((data)=>{
                return loadMoniteurPtoStore({payload: data});
               
            })
        )
     })
    )
  })
  // getUser
  getUser$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(getUser),
     exhaustMap((action)=>{
        return this.dataService.getUserById(action.id)
        .pipe(
            map((data)=>{
                return addUser({payload: data});
               
            })
        )
     })
    )
  })
}


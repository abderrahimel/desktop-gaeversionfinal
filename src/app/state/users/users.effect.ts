import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadusersaction, loaduserstostoreaction } from './users.actions';
import { UsersState } from './users.state';

@Injectable()
export class UsersEffects {
    users:any;
    users1:any = [];
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private AuthService: AuthService,
    private store: Store<{users: UsersState}>) {}
   
    loadusersaction$ = createEffect(()=>{
    
    return this.actions$.pipe(ofType(loadusersaction),
    
     exhaustMap((action)=>{
        return this.dataService.getUsersAutoEcole()
        .pipe(
            map((data)=>{
                this.users = data;
                console.log(data);
                return loaduserstostoreaction({payload: this.users});
            })
        )
     })
    )
  })
  
}

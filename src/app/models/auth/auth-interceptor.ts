import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth/auth.service'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth:AuthService,
              private _router:Router   

    ){

  }
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${AuthService.getToken()}`,
      },
    });
    return next.handle(req).pipe(
      catchError(errorData=>{
        if(errorData.status === 500){
          // logout the user
          this.auth.logoutUser();
          this._router.navigateByUrl("/login");
        }
        return throwError(errorData);
      })
    );
  }
} 
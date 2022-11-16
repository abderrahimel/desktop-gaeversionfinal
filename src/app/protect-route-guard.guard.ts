import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectRouteGuardGuard implements CanActivate {
  public loggedIn:boolean = false;
  constructor(private auth:AuthService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {
      
      this.auth.authStatus.subscribe( value =>{ this.loggedIn = value;});
    return this.loggedIn;
  }
  
}

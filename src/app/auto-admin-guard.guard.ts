import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoAdminGuardGuard implements CanActivate {
  superAdmin:any;
  constructor(private _auth: AuthService){

  }
  ngOnInit(){
    this._auth.IsAutoAdmin().subscribe(data=>{
        this.superAdmin = data;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this._auth.IsAutoAdmin().subscribe(data=>{
        this.superAdmin = JSON.parse(data);
    })
    return localStorage.getItem('type') === 'adminAuto';
  }
  
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuardGuard implements CanActivate {
  public superAdmin:any;
  
  constructor(private auth:AuthService){

  }
  ngOnInit(){
    this.auth.IssuperAdmin().subscribe(data=>{
        this.superAdmin = JSON.parse(data);
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     return localStorage.getItem('type') === 'superAdmin';
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  api:string = 'http://127.0.0.1:8000';
  private super = new BehaviorSubject<boolean>(this.isSuperAdmin());
  private loggedIn = new BehaviorSubject<boolean>(this.logged());
  authStatus = this.loggedIn.asObservable();
  superAdmin = this.super.asObservable();
   public user = {};
   isSuper:any;
  constructor(private http: HttpClient, private _router:Router) { }
  ngOnInit(){
    
  }
   changeAuthStatus(value:boolean){
     this.loggedIn.next(value);
     this.authStatus.subscribe( 
      value => {},
      error => console.log("error ", error.error)
      );
   }

  //Token pour l'authentification 
  handle(token:any){
    this.setToken(token);
    return this.isValid();
  }
 
  
  IssuperAdmin(){
    return this.http.get(this.api+'/check-super-admin', { responseType: 'text'});
  }
  IsAutoAdmin(){
    return this.http.get(this.api+'/check-admin-autoecole', { responseType: 'text'});
  }
  isSuperAdmin(){
    return this.isSuper;
  }
  setToken(token:any){
    localStorage.setItem('token',token);
    return token;
  }
  setType(type:any){
    localStorage.setItem('type',type);
    return type;
  }
  getLogin(){
    let data = this.getUser();
    return data
  }
  getToken(){
    let token = localStorage.getItem('token');
    return token;
  }
  getType(){
    let type = localStorage.getItem('type');
    return type;
  }
  static getToken(){
    let token = localStorage.getItem('token');
    return token;
  }
  remove(){
    return localStorage.removeItem('token');
  }
  //stocker l id de l'utilisateur authentifé

  setId(id:any){
    localStorage.setItem('user_id',id);
  }
  
  //obtenir l'id de l'utilisateur authentifié
  getId(){
    let user_id = localStorage.getItem('user_id');
    return user_id;
  }
  isValid(){
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss === this.api + "/login")? true : false;
      }
    }
    return false;
  }
  payload(token:any){
      const payload = token.split('.')[1];
      return this.decode(payload);
  }
  decode(payload:any){
    try {
      return JSON.parse(atob(payload));
    }
    catch(e) {
      console.error(`Failed to process payload: ${payload}`);
    }
  }
  //obtenir l'utilisateur logged in si tu a besoin d'un attribut mets data['nom']

  logged(){
    return this.isValid();
  }

  //logout et supprimer le token stoker
  logout(userData:any){
    
    this.http.post(this.api+`/logout`,userData).subscribe(
      data =>  {
             if(data['message']='success'){
                     this._router.navigate(['/login']);
                     localStorage.clear();
    }},
      err => console.log(err.error));
  }

  register(data:any){
      return this.http.post(this.api+'/register', data, { responseType: 'text'})
  }

  login(data:any){
     return this.http.post('http://127.0.0.1:8000/login', data, { responseType: 'text'});
  }
  getUser(){
   return   this.http.get(this.api+`/logged`);
   
  }
  getStatus(){
    return this.authStatus;
   }
   logoutUser(){
    localStorage.removeItem('user_id');
    localStorage.removeItem('autoEcole_id');
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('login');
    this.changeAuthStatus(false);
    this._router.navigateByUrl("/login")
   }
}

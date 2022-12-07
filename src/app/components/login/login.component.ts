import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { TranslateService } from "@ngx-translate/core";
import { Store } from '@ngrx/store';
import { addUser, loginStart } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'login';
  langue = 'en-FR';
  form : FormGroup;
  submitted:boolean = false;
  error:any = '';
  userData:any;
  abonnement:any = '';
  dateVal  = new Date()
  constructor(private translateService :TranslationService,
              private dataService: DataService, 
              private http :HttpClient,
              private router: Router,
              private _auth : AuthService,
              private translate: TranslateService,
              private store: Store<{user: UserState}>
              ){
                this.form = new FormGroup({
                  email:  new FormControl('', [Validators.required  ,Validators.email]),
                  password:  new FormControl('', Validators.required),
                }); 
  } 
  ngOnInit(): void {
    this.translateService.applyLanguage();
     
  }

  public selectLanguage(lang : any){
    this.langue=lang;
    this.translateService.selectLanguage(lang);
  }

   login(){
    this.abonnement = ''
     this.submitted = true;
     if(this.form.invalid){
      return ;
      }
    this._auth.login(this.form.getRawValue()).subscribe( data => {   
      
        let status =  this._auth.handle(JSON.parse(data)['access_token']);
        localStorage.setItem('type',JSON.parse(data)['type']);
        if(status){
          // the user is logged to the app
          this._auth.getUser().subscribe((currentUser:any) => {
            this.userData = currentUser?.user;
            let user = {
              id: this.userData.id,
              login: this.userData.login,
              email: this.userData.email,
              name: this.userData.name,
              type: this.userData.type  
            }
            localStorage.setItem('login', user?.login)
            // add user to the store
            this.store.dispatch(addUser({payload: user}));
            this.dataService.currentAutoEcoleid().subscribe( (data:any)=>
             {   
                localStorage.setItem('autoEcole_id', data.id);
                localStorage.setItem('logo', data.image);
                this._auth.changeAuthStatus(true);
                if(localStorage.getItem('type') === 'superAdmin'){
                  this.router.navigateByUrl('/admin');
                }else{
                  // this.router.navigateByUrl('/dashboard');
                  this.router.navigateByUrl('/installation_vehicule');
                }
              }

            )
           
          });
        
          
        }else{
          // the token invalid
          this.router.navigateByUrl('/login');
        }
    },
    error => this.handleError(error)
    );
    // dispatch this action to the store will let the Usereffect to call the service for login
    this.store.dispatch(loginStart({email:this.form.value.email, password: this.form.value.password}));
  } 
  handleError(error:any){
    if(error.status === 401){
      this.error = 'This information does not match our records.'
    }
    if(JSON.parse(error.error)?.message === 'invalid login credentials'){
      this.abonnement = 'Ces informations ne correspondent pas à nos enregistrements.'
    }else{
      this.abonnement = JSON.parse(error.error)?.message;
    }
  }
  handleResponse(data:any){
      let status =  this._auth.handle(JSON.parse(data)['access_token'])
      if(status){

        this._auth.getUser().subscribe(
          data => { this.userData = data},
          error => {}
          );
        this._auth.changeAuthStatus(true);
        this.router.navigateByUrl('/');
      }else{
        this.router.navigateByUrl('/login');
      }
  }
}
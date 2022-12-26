import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  langue = 'en-FR';
  form : FormGroup;
  submitted:boolean = false;
  error:any = '';
  userData:any;
  success:boolean = true;
  message:any;
  dateVal  = new Date()
  constructor(private translateService :TranslationService,
              private dataService: DataService, 
              private router: Router,
              private translate: TranslateService,
              ){
    this.form = new FormGroup({
      email:  new FormControl('', [Validators.required  ,Validators.email]),
      password:  new FormControl('', Validators.required ),
      password_confirmation:  new FormControl('', Validators.required ),
    }); 
  } 


  ngOnInit(): void {
    this.translateService.applyLanguage();
     
  }

  public selectLanguage(lang : any){
    this.langue=lang;
    this.translateService.selectLanguage(lang);
  }

  resetPass(){
    this.submitted =true;
      if(this.form.invalid){
        return;
      }
      if(this.form.value.password !== this.form.value.password_confirmation){
          this.error = 'les deux mots de passe ne sont pas identique ';
          return;
      }
     this.dataService.resetPass({
        email:this.form.value.email,
        password:this.form.value.password,
        password_confirmation:this.form.value.password_confirmation
      }).subscribe(
      data => {
        this.message = JSON.parse(data).message;
         this.success=JSON.parse(data).success;
         if(this.success){
          this.router.navigateByUrl('/login')
         }
        },
      error=> {
        console.log(JSON.parse(error.error));
        console.log(JSON.parse(error.error).message)
        this.message = JSON.parse(error.error).message;
        this.success=JSON.parse(error.error).success;
      }
      )
  } 
  
 
}
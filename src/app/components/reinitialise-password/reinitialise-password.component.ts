import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-reinitialise-password',
  templateUrl: './reinitialise-password.component.html',
  styleUrls: ['./reinitialise-password.component.css']
})
export class ReinitialisePasswordComponent implements OnInit {
  title = 'login';
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
    }); 
  } 


  ngOnInit(): void {
    this.translateService.applyLanguage();
     
  }

  public selectLanguage(lang : any){
    this.langue=lang;
    this.translateService.selectLanguage(lang);
  }
  setmessage(){
    this.message = null;
  }
  resetPass(){
    this.error = null
    this.submitted =true;
    if(this.form.invalid){
      return;
    }

     this.dataService.forgotPassword({email:this.form.value.email}).subscribe(
      data => {
        this.message = JSON.parse(data).message;
         this.success=JSON.parse(data).success;
         if(this.success){
          this.router.navigateByUrl('/verify/pin');
         }
        },
      error=> {
        this.message = JSON.parse(error.error).message;
        this.success=JSON.parse(error.error).success;
      }
      )
  } 
  
 
}
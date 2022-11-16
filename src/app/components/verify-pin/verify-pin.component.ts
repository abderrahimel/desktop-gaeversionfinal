import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.component.html',
  styleUrls: ['./verify-pin.component.css']
})
export class VerifyPinComponent implements OnInit {
  langue = 'en-FR';
  form : FormGroup;
  submitted:boolean = false;
  error:any = '';
  userData:any;
  success:boolean = true;
  message:any = '';
  dateVal  = new Date()
  constructor(private translateService :TranslationService,
              private dataService: DataService, 
              private router: Router,
              private translate: TranslateService,
              ){
    this.form = new FormGroup({
      email:  new FormControl('', [Validators.required  ,Validators.email]),
      pin:  new FormControl('', Validators.required ),
    }); 
  } 


  ngOnInit(): void {
    this.translateService.applyLanguage();
     
  }

  public selectLanguage(lang : any){
    this.langue=lang;
    this.translateService.selectLanguage(lang);
  }

  verifyPin(){
    this.submitted =true;
    if(this.form.invalid){
      return;
    }
     this.dataService.verifyPin({email:this.form.value.email, token:this.form.value.pin}).subscribe(
      data => {
        console.log(JSON.parse(data));
        this.message = JSON.parse(data).message;
         this.success=JSON.parse(data).success;
         if(this.success){
          this.router.navigateByUrl('/reset-password')
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
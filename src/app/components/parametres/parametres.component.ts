import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.css']
})
export class ParametresComponent implements OnInit {
  dateVal = new Date();
  base64Img_logo:any;
  submittedlogo:boolean = false;
  email_u:any = '';
  email_user:any;
  submittedEmail:boolean = false;
  submittedPassword:boolean = false;
  formlogo = new FormGroup({      
    logo: new FormControl('', Validators.required),
})
  formEmail = new FormGroup({      
    email: new FormControl('', Validators.required),
    newEmail: new FormControl('', Validators.required),
  })
  formPassword = new FormGroup({      
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password_confirmation: new FormControl('', Validators.required),
  })  
  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    let user_id = 1// id user
    this.DataService.getUserById(user_id).subscribe(data =>{
      console.log("user ");console.log(data);
      this.email_user = data;
      this.email_user = this.email_user.email;
      console.log(this.email_user);
    });
  }

  setLogo(){
    this.submittedlogo = true;
    if(this.formlogo.invalid){
      console.log("logo is required");
      return;
    }
    let id_autoEcole = 1
    console.log(this.base64Img_logo);
    this.DataService.setLogo(id_autoEcole, {
      logo: this.base64Img_logo
    }).subscribe(data =>{
      console.log("logo changed of the auto ecole");
      console.log(data);
    })
  }

  setPassword(){
    this.submittedPassword = true;
    if(this.formPassword.invalid){
      return;
    }
    this.DataService.resetPass({
      email: this.formPassword.value.email,
      password:  this.formPassword.value.password,
      password_confirmation:  this.formPassword.value.password_confirmation,
    }).subscribe(data =>{
      console.log(JSON.parse(data).message);
    })
  }

  setEmail(){
    this.submittedEmail = true;
    if(this.formEmail.invalid ){
      return;
    }

    this.DataService.setEmail({
      email: this.formEmail.value.email,
      newEmail: this.formEmail.value.newEmail
    }).subscribe(data =>{
      console.log(data);
    })
  }

  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    this.base64Img_logo = e.target.result;
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}
}

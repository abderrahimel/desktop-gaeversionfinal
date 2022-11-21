import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  submitted:any;
  public error:any = [];
  files:any;
  response:any;
  email_exist_in_data_base:any = '';
  base64Img_image_rc:any;
  base64Img_image:any;
  base64Img_image_agrement:any;
  base64Img_image_cin:any;
  loadSpinner:boolean = false;
  confirm_password:any = false;
  dateVal = new Date()
  form = new FormGroup({
    image: new FormControl('', [Validators.required,Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]),
    nom_auto_ecole: new FormControl('', [Validators.required]),
    date_ouverture: new FormControl('', Validators.required),
    n_register_de_commerce: new FormControl('', Validators.required ),
    identification_fiscale: new FormControl('', Validators.required),
    date_autorisation: new FormControl('', Validators.required),
    n_agrement: new FormControl('', [Validators.required]),
    n_patente: new FormControl('', [Validators.required]),
    image_rc: new FormControl('', [Validators.required,Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]),
    image_agrement: new FormControl('', [Validators.required,Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]),
    n_cnss: new FormControl('', Validators.required),
    ice: new FormControl('', Validators.required),
    n_compte_bancaire: new FormControl('', Validators.required),
    tva: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required ,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    ville: new FormControl('', Validators.required),
    fax: new FormControl(''),
    email:  new FormControl('', Validators.email),
    password:  new FormControl('', [Validators.required]),
    site_web: new FormControl(''),
    adresse: new FormControl(''),
    cin_responsable: new FormControl('', Validators.required),
    nom_responsable: new FormControl('', Validators.required),
    prenom_responsable: new FormControl('', Validators.required),
    tel_responsable: new FormControl('', [Validators.required ,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    image_cin: new FormControl('', [Validators.required,Validators.pattern('(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?')]),
    adresse_responsable: new FormControl(''),
  });

  constructor(private authService:AuthService,
             private router: Router,
    ) { }

  ngOnInit(): void {
   
  }

  register(){
    this.submitted = true; 
    if(this.form.invalid){
      console.log(this.form);
      console.log('formulaire invalide');
      return ;
    }

    return this.authService.register({
      image:this.base64Img_image,
      image_rc: this.base64Img_image_rc,
      image_agrement: this.base64Img_image_agrement,
      image_cin: this.base64Img_image_cin,
      nom_auto_ecole: this.form.value.nom_auto_ecole,
      date_ouverture: this.form.value.date_ouverture,
      n_register_de_commerce: this.form.value.n_register_de_commerce,
      identification_fiscale: this.form.value.identification_fiscale,
      date_autorisation: this.form.value.date_autorisation,
      n_agrement: this.form.value.n_agrement,
      n_patente: this.form.value.n_patente,
      n_cnss: this.form.value.n_cnss,
      ice: this.form.value.ice,
      n_compte_bancaire: this.form.value.n_compte_bancaire,
      tva: this.form.value.tva,
      pays: this.form.value.pays,
      telephone: this.form.value.telephone,
      ville: this.form.value.ville,
      fax: this.form.value.fax,
      email:  this.form.value.email,
      password:  this.form.value.password,
      site_web: this.form.value.site_web,
      adresse: this.form.value.adresse,
      cin_responsable: this.form.value.cin_responsable,
      nom_responsable: this.form.value.nom_responsable,
      prenom_responsable: this.form.value.prenom_responsable,
      tel_responsable: this.form.value.tel_responsable,
      adresse_responsable: this.form.value.adresse_responsable,
    })
    .subscribe( data => {
      this.loadSpinner = true;
      this.response = JSON.parse(data);
      console.log(this.response.token);
      localStorage.setItem('token', this.response.token);
      this.router.navigateByUrl('/email/verify');
    },
      error => this.handleError(error)
    )  
  }

  saveimg(event:any){
    this.files = event.target.files[0];
    
  }

  handleError(error:any){
    console.log('there is an error')
    this.error = error.error?.errors;
    console.log(error)
    if(error.status === 422){
      this.email_exist_in_data_base = "The email has already been taken.";
    }
  }
  
  fileChangeEvent(fileInput: any, keyImage:any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    if(keyImage === 'image'){
                       this.base64Img_image = imgBase64Path;
                    }else if(keyImage === 'image_agrement'){
                      this.base64Img_image_agrement = imgBase64Path;
                    }else if(keyImage === 'image_rc'){
                      this.base64Img_image_rc = imgBase64Path;
                    } else {
                      this.base64Img_image_cin = imgBase64Path;
                    }
                    
            };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
    }
}

}

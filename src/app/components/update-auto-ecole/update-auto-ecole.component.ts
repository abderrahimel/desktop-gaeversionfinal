import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadAutoecole } from 'src/app/state/autoEcole/autoEcole.actions';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-update-auto-ecole',
  templateUrl: './update-auto-ecole.component.html',
  styleUrls: ['./update-auto-ecole.component.css']
})
export class UpdateAutoEcoleComponent implements OnInit {

  submitted:any;
  public error:any = [];
  files:any;
  email_exist_in_data_base:any = '';
  base64Img_image_rc:any;
  base64Img_image:any;
  base64Img_image_agrement:any;
  base64Img_image_cin:any;
  dateVal:any = new Date();
  confirm_password:any = false;
  form = new FormGroup({
    nom_auto_ecole: new FormControl('', [Validators.required ,Validators.minLength(4)]),
    date_ouverture: new FormControl('', Validators.required),
    n_register_de_commerce: new FormControl('', Validators.required ),
    identification_fiscale: new FormControl('', Validators.required),
    date_autorisation: new FormControl('', Validators.required),
    n_agrement: new FormControl('', [Validators.required ,Validators.minLength(1)]),
    n_patente: new FormControl('', [Validators.required ,Validators.minLength(1)]),
    n_cnss: new FormControl('', Validators.required),
    ice: new FormControl('', Validators.required),
    n_compte_bancaire: new FormControl('', Validators.required),
    tva: new FormControl('', Validators.required),
    pays: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required ,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    ville: new FormControl('', Validators.required),
    fax: new FormControl(''),
    site_web: new FormControl(''),
    adresse: new FormControl(''),
    cin_responsable: new FormControl('', Validators.required),
    nom_responsable: new FormControl('', Validators.required),
    prenom_responsable: new FormControl('', Validators.required),
    tel_responsable: new FormControl('', [Validators.required ,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
    adresse_responsable: new FormControl(''),
  });
  autoecoleData:any;
  constructor(private authService:AuthService,
              private dataService: DataService,
              private store:Store<{autoEcole: AutoEcoleState}>
    ) { }
  ngOnInit(): void {
   this.getAutoecole();
  }
getAutoecole(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.autoEcole.autoEcole.loaded){
      this.store.dispatch(loadAutoecole())
    }
  })
   this.store.select(state=>state.autoEcole.autoEcole.autoEcole).subscribe(autoecole=>{
    console.log(autoecole);
    this.autoecoleData = autoecole;
    this.form.patchValue({
      nom_auto_ecole: this.autoecoleData?.nom_auto_ecole,
      date_ouverture: this.autoecoleData?.date_ouverture,
      n_register_de_commerce: this.autoecoleData?.n_register_de_commerce,
      identification_fiscale: this.autoecoleData?.identification_fiscale,
      date_autorisation: this.autoecoleData?.date_autorisation,
      n_agrement: this.autoecoleData?.n_agrement,
      n_patente:this.autoecoleData?.n_patente,
      n_cnss: this.autoecoleData?.n_cnss,
      ice: this.autoecoleData?.ice,
      n_compte_bancaire: this.autoecoleData?.n_compte_bancaire,
      tva: this.autoecoleData?.tva,
      pays: this.autoecoleData?.pays,
      telephone: this.autoecoleData?.telephone,
      ville: this.autoecoleData?.ville,
      fax: this.autoecoleData?.fax,
      site_web: this.autoecoleData?.site_web,
      adresse: this.autoecoleData?.adresse,
      cin_responsable: this.autoecoleData?.cin_responsable,
      nom_responsable: this.autoecoleData?.nom_responsable,
      prenom_responsable: this.autoecoleData?.prenom_responsable,
      tel_responsable: this.autoecoleData?.tel_responsable,
      adresse_responsable: this.autoecoleData?.adresse_responsable,
    })
   })
}
autoEcoleChanged(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'success',
    title: 'Auto ecole changed'
  })
}
setautoecole(){
    this.submitted = true;
    if(this.form.invalid){
      console.log('formulaire invalide');
      return ;
    }
    console.log(
      {
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
        site_web: this.form.value.site_web,
        adresse: this.form.value.adresse,
        cin_responsable: this.form.value.cin_responsable,
        nom_responsable: this.form.value.nom_responsable,
        prenom_responsable: this.form.value.prenom_responsable,
        tel_responsable: this.form.value.tel_responsable,
        adresse_responsable: this.form.value.adresse_responsable,
      }
    );
    return this.dataService.modifier(localStorage.getItem('autoEcole_id'),{
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
      site_web: this.form.value.site_web,
      adresse: this.form.value.adresse,
      cin_responsable: this.form.value.cin_responsable,
      nom_responsable: this.form.value.nom_responsable,
      prenom_responsable: this.form.value.prenom_responsable,
      tel_responsable: this.form.value.tel_responsable,
      adresse_responsable: this.form.value.adresse_responsable,
    })
    .subscribe( ()=>{
      this.autoEcoleChanged();
    } )  
  }

  saveimg(event:any){
    this.files = event.target.files[0];
    
  }
}
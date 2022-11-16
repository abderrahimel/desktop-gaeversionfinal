import { Component, OnInit } from '@angular/core';
import { Vehicules } from 'src/app/classes/vehicules';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { Store } from '@ngrx/store';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';

@Component({
  selector: 'app-vehicule-form',
  templateUrl: './vehicule-form.component.html',
  styleUrls: ['./vehicule-form.component.css']
})
export class VehiculeFormComponent implements OnInit {
 vhcl = new Vehicules();
 submitted:any = false;
 base64Img_cart:any;
 base64Img_image_assurance:any;
 base64Img_visite:any; 
 base64Img_vignette:any;
 id:any;
 autoecol:any;
 updateOrAdd:any;
 is_update:any;
 form:any;
 btn:boolean = true;
 setForm:any;
 vehiculeData:any;
 id_autoecole_or_vehicule:any;
 
 dateVal = new Date();
  constructor(private translateService: TranslationService, 
              private dataservice: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<{autoEcole: AutoEcoleState}>
          ) {
  }

  ngOnInit(): void {
    this.translateService.applyLanguage();
    
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.router.url);
    if(this.router.url.slice(0, -1) === '/update-vehicule/'){
      this.updateOrAdd = 'Modifier';
      this.is_update = true;
      this.id_autoecole_or_vehicule = Number(this.route.snapshot.paramMap.get('id'));
      this.form = new FormGroup({
        matricule:new FormControl('', Validators.required),
        type:new FormControl('', Validators.required),
        marque :new FormControl('', Validators.required),
        fourniseur:new FormControl('', Validators.required),
        modele:new FormControl('', Validators.required),
        categorie:new FormControl('', Validators.required),
        date_visite:new FormControl('', Validators.required),
        date_prochain_visite:new FormControl('', Validators.required),
        date_vidange:new FormControl('', Validators.required),
        date_prochain_vidange:new FormControl('', Validators.required),
        date_assurance:new FormControl('', Validators.required),
        date_expiration_assurance:new FormControl('', Validators.required),
        carte_grise:new FormControl(''),
        vignette:new FormControl(''),
        assurance:new FormControl(''),
        visite:new FormControl(''), 
      });
       //
    }else if(this.router.url === '/detail-vehicule/'+this.id){
      this.btn = false;
      this.form = new FormGroup({
        matricule:new FormControl(''),
        type:new FormControl(''),
        marque :new FormControl(''),
        fourniseur:new FormControl(''),
        modele:new FormControl(''),
        categorie:new FormControl(''),
        date_visite:new FormControl(''),
        date_prochain_visite:new FormControl(''),
        date_vidange:new FormControl(''),
        date_prochain_vidange:new FormControl(''),
        date_assurance:new FormControl(''),
        date_expiration_assurance:new FormControl(''),
        carte_grise:new FormControl(''),
        vignette:new FormControl(''),
        assurance:new FormControl(''),
        visite:new FormControl(''), 
      });
      this.dataservice.getvehiculeById(this.id).subscribe(data=>{

        this.setForm = JSON.parse(data);
        console.log(this.setForm);
        this.form.patchValue({
          matricule: this.setForm.matricule,
          type: this.setForm.type,
          marque: this.setForm.marque,
          fourniseur: this.setForm.fourniseur,
          modele: this.setForm.modele,
          categorie: this.setForm.categorie,
          date_visite: this.setForm.date_visite,
          date_prochain_visite: this.setForm.date_prochain_visite,
          date_vidange: this.setForm.date_vidange,
          date_prochain_vidange: this.setForm.date_prochain_vidange,
          date_assurance: this.setForm.date_assurance,
          date_expiration_assurance: this.setForm.date_expiration_assurance,
        });
      })

    }else{
      this.updateOrAdd = 'Ajouter';
      this.is_update = false;
      // id auto ecole
      this.id_autoecole_or_vehicule = localStorage.getItem('autoEcole_id');
      this.form = new FormGroup({
        matricule:new FormControl('', Validators.required),
        type:new FormControl('', Validators.required),
        marque :new FormControl('', Validators.required),
        fourniseur:new FormControl('', Validators.required),
        modele:new FormControl('', Validators.required),
        categorie:new FormControl('', Validators.required),
        date_visite:new FormControl('', Validators.required),
        date_prochain_visite:new FormControl('', Validators.required),
        date_vidange:new FormControl('', Validators.required),
        date_prochain_vidange:new FormControl('', Validators.required),
        date_assurance:new FormControl('', Validators.required),
        date_expiration_assurance:new FormControl('', Validators.required),
        carte_grise:new FormControl(''),
        vignette:new FormControl('', Validators.required),
        assurance:new FormControl(''),
        visite:new FormControl(''), 
      });
    }
    if(this.is_update){
      this.dataservice.getvehiculeById(this.id).subscribe(data => {
        this.vehiculeData =  JSON.parse(data);
        console.log(this.vehiculeData);
        this.form.patchValue({
        matricule: this.vehiculeData.matricule,
        type: this.vehiculeData.type,
        marque: this.vehiculeData.marque,
        fourniseur: this.vehiculeData.fourniseur,
        modele: this.vehiculeData.modele,
        categorie: this.vehiculeData.categorie,
        date_visite: this.vehiculeData.date_visite,
        date_prochain_visite: this.vehiculeData.date_prochain_visite,
        date_vidange: this.vehiculeData.date_vidange,
        date_prochain_vidange: this.vehiculeData.date_prochain_vidange,
        date_assurance: this.vehiculeData.date_assurance,
        date_expiration_assurance: this.vehiculeData.date_expiration_assurance,

      });
       });
    }
    // get the id of the auto ecole from the store
    this.store.select('autoEcole').subscribe((autoecole:any)=>{
      this.autoecol = autoecole.autoEcole
      console.log("=============================");
      console.log(this.autoecol);
      console.log(this.autoecol?.id);
      console.log("=============================");
      
    })
  }

  AddOrModifierVehicule(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid");
      return;
    }

   console.log({
    matricule: this.form.value.matricule,
    type: this.form.value.type,
    marque: this.form.value.marque,
    fourniseur: this.form.value.fourniseur,
    modele: this.form.value.modele,
    categorie: this.form.value.categorie,
    date_visite: this.form.value.date_visite,
    date_prochain_visite: this.form.value.date_prochain_visite,
    date_vidange: this.form.value.date_vidange,
    date_prochain_vidange: this.form.value.date_prochain_vidange,
    date_assurance: this.form.value.date_assurance,
    date_expiration_assurance: this.form.value.date_expiration_assurance,
    vignette:this.base64Img_vignette, 
    visite:this.base64Img_visite,
    assurance: this.base64Img_image_assurance,
    carte_grise: this.base64Img_cart
   });
    
    console.log("add or modifier ", this.id_autoecole_or_vehicule);
     this.dataservice.AddOrModifierVehicule(this.is_update, this.id_autoecole_or_vehicule, {
      matricule: this.form.value.matricule,
      type: this.form.value.type,
      marque: this.form.value.marque,
      fourniseur: this.form.value.fourniseur,
      modele: this.form.value.modele,
      categorie: this.form.value.categorie,
      date_visite: this.form.value.date_visite,
      date_prochain_visite: this.form.value.date_prochain_visite,
      date_vidange: this.form.value.date_vidange,
      date_prochain_vidange: this.form.value.date_prochain_vidange,
      date_assurance: this.form.value.date_assurance,
      date_expiration_assurance: this.form.value.date_expiration_assurance,
      vignette:this.base64Img_vignette, 
      visite:this.base64Img_visite,
      assurance: this.base64Img_image_assurance,
      carte_grise: this.base64Img_cart
     }).subscribe(data => {
       console.log("add vehicule to table ");
      console.log(data);
      this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
      this.router.navigateByUrl('/vehicule');
    },
       error => this.handlerror(error)
    ) 
   
}
handlerror(error:any){
  console.log("there is an error about send data vehicule");
  console.log(error);
}

fileChangeEvent(fileInput: any, keyImage:any) {

  if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
                  const imgBase64Path = e.target.result;
                  if(keyImage === 'cart'){
                     this.base64Img_cart = imgBase64Path;
                  }else if(keyImage === 'assurance'){
                    this.base64Img_image_assurance = imgBase64Path;
                  }else if(keyImage === 'visite'){
                    this.base64Img_visite  = imgBase64Path;
                  } else{
                    this.base64Img_vignette = imgBase64Path;
                  }
                  
          };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {
  base64Img_cart:any;
  base64Img_image_assurance:any;
  base64Img_visite:any; 
  base64Img_vignette:any;
  subbmitedVehucule:boolean = false;
  formVehicule:any;
  errorVehicule:any = null;
  constructor( private dataservice: DataService,
               private store:Store<{vehicule:VehiculeState}>,
               private router: Router,) { }

  ngOnInit(): void {
    this.initialVehicule()

  }
  
  initialVehicule(){
    this.formVehicule = new FormGroup({
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
      carte_grise:new FormControl('', Validators.required),
      vignette:new FormControl('', Validators.required),
      assurance:new FormControl('', Validators.required),
      visite:new FormControl('', Validators.required),
    });
  }
  AddVehicule(){
    console.log("add vehicule");
      this.subbmitedVehucule = true;
      if(this.formVehicule.invalid){
        console.log("form invalid");
        return;
      }
      this.dataservice.advehicule(localStorage.getItem('autoEcole_id'), {
        ...this.formVehicule.value,
        vignette:this.base64Img_vignette, 
        visite:this.base64Img_visite,
        assurance: this.base64Img_image_assurance,
        carte_grise: this.base64Img_cart
       }).subscribe(data => {
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
        console.log(JSON.parse(data));
      },
         error => console.log(error)
      ) 
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

  nextVehicule(){
     this.dataservice.numberOfVehicule(localStorage.getItem('autoEcole_id')).subscribe(count=>{
      console.log("count of vehicule",count);
      if(Number(count) === 0){
        this.errorVehicule = "Vous devez ajouter d'abord une vehicule";
      }else{
        this.router.navigateByUrl('/installation_moniteurs');
      }
     })
  }
}

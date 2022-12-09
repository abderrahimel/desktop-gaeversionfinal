import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import Swal from 'sweetalert2';
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
  disabled:boolean = true;
  subbmitedVehucule:boolean = false;
  formVehicule:any;
  errorVehicule:any = null;
  constructor( private dataservice: DataService,
               private store:Store<{vehicule:VehiculeState}>,
               private router: Router,) { }

  ngOnInit(): void {
    this.initialVehicule()
    this.initialiseNext()
  }
  initialiseNext(){
    this.dataservice.numberOfVehicule(localStorage.getItem('autoEcole_id')).subscribe(count=>{
    if(Number(count) === 0){
      this.disabled  = true;
    }else{
      this.disabled  = false;
    }
  })
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
    this.errorVehicule = null
      this.subbmitedVehucule = true;
      if(this.formVehicule.invalid){
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
        this.alertMessage("Vehicule bien enregistré!");
        this.disabled = false
      },
         error => console.log(error)
      ) 
  }
  alertMessage(message:any){
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
      title: message
    })
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
    this.addOther();
  }
  addOther(){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez ajouter une autre un véhicule ?",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui'
    }).then((result) => {
      if (!result.isConfirmed) {
        this.router.navigateByUrl('/installation_moniteurs');
      }
      return;
    })
  }
}

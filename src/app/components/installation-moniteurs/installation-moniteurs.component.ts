import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { addMoniteurP, addMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installation-moniteurs',
  templateUrl: './installation-moniteurs.component.html',
  styleUrls: ['./installation-moniteurs.component.css']
})
export class InstallationMoniteursComponent implements OnInit {
  disabled:boolean = true
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    date_naissance: new FormControl('', Validators.required),
    lieu_naissance: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', Validators.required),
    date_embauche: new FormControl('', Validators.required),
    type_moniteur: new FormControl('', Validators.required),
    capn: new FormControl('', Validators.required),
    conduire: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    observations: new FormControl(''),
    carteMoniteur: new FormControl(''),
  })
  submitted:boolean = false;
  base64Img_image:any;
  data:any;
  categorie_list:any = '';
  categories_array:any = [];
  id:any;
  is_update:any;
  action:any = 'Ajouter';
  moniteur:any;
  autoecol:any;
  errorMoniteurTheorique:any = null;
  errorMoniteurPratique:any = null;
  constructor(private store: Store<{moniteur: MoniteurState}>,
              private router:Router,
              private dataservice:DataService
    ) { }

  ngOnInit(): void {
     this.initialiseNext();
  }
  initialiseNext(){
    this.dataservice.countTheoriquePratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      if(Number(JSON.parse(data)['countT']) * Number(JSON.parse(data)['countP']) === 0){
            this.disabled = true;
      }else{
            this.disabled = false;
      }  
     })
  }
  addMoniteur(){
    this.errorMoniteurTheorique = null;
    this.errorMoniteurPratique = null;
    this.submitted = true;
    if(this.form.invalid){
        return;
      }
    const string = this.categorie_list.split(',')
    string.pop();
      let dataMoniteur =  {
        nom: this.form.value.nom,
        prenom: this.form.value.prenom,
        cin: this.form.value.cin,
        date_naissance: this.form.value.date_naissance,
        lieu_naissance: this.form.value.lieu_naissance,
        email: this.form.value.email,
        telephone: this.form.value.telephone,
        date_embauche: this.form.value.date_embauche,
        capn: this.form.value.capn,
        conduire: this.form.value.conduire,
        adresse: this.form.value.adresse,
        categorie: string.join(','),
        type: this.form.value.type_moniteur,
        observations:  this.form.value.observations,
        carteMoniteur:this.base64Img_image
      };
      if(this.form.value.type_moniteur === 'Moniteur Théorique'){
        this.dataservice.addMoniteurT(localStorage.getItem('autoEcole_id'), dataMoniteur).subscribe(data=>{
          this.alertMessage("Moniteur Théorique bien enregistré!")
          this.disabled = false;
        })
      }else{  // addMoniteurP
          this.dataservice.addMoniteurP(localStorage.getItem('autoEcole_id'), dataMoniteur).subscribe(data=>{
            this.alertMessage("Moniteur Pratique bien enregistré!")
            this.disabled = false;
          })
        }
  }

  addCategorie(e:any){
    if(!this.categorie_list.includes(e.target.value)){
      this.categorie_list += e.target.value + ',';
    }
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
  next(){
    this.dataservice.countTheoriquePratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
     console.log(JSON.parse(data));
     if(Number(JSON.parse(data)['countT']) === 0){
      //  this.errorMoniteurTheorique = "Vous devez ajouter d'abord un moniteur theorique";
       this.errorAlert("Vous devez ajouter d'abord un moniteur theorique");
       return;
     }else if(Number(JSON.parse(data)['countP']) === 0){
      // this.errorMoniteurPratique = "Vous devez ajouter d'abord un moniteur pratique";
      this.errorAlert("Vous devez ajouter d'abord un moniteur pratique");
      return;
     }else{
      this.addOther();
     }  
    })
 }
 errorAlert(error:any){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error,
  })
 }
 addOther(){
  
  Swal.fire({
    title: 'confirmation',
    text: "Vous voulez ajouter une autre un moniteur ?",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui'
  }).then((result) => {
    if (!result.isConfirmed) {
      this.router.navigateByUrl('/installation_categorie_depencePersonnel');
    }
  })
}
  fileChangeEvent(event: any) {

    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.base64Img_image = imgBase64Path;
            };
        };

        reader.readAsDataURL(event.target.files[0]);
    }
}
}

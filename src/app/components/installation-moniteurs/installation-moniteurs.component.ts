import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { addMoniteurP, addMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';

@Component({
  selector: 'app-installation-moniteurs',
  templateUrl: './installation-moniteurs.component.html',
  styleUrls: ['./installation-moniteurs.component.css']
})
export class InstallationMoniteursComponent implements OnInit {
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
    categorie: new FormControl(''),
    observations: new FormControl(''),
    carteMoniteur: new FormControl('', Validators.required),
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
  }
  addMoniteur(){
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
          console.log(data);
        })
      }else{  // addMoniteurP
          this.dataservice.addMoniteurP(localStorage.getItem('autoEcole_id'), dataMoniteur).subscribe(data=>{
            console.log(data);
          })
        }
 
  }
  addCategorie(e:any){
    if(!this.categorie_list.includes(e.target.value)){
      this.categorie_list += e.target.value + ',';
    }
  }
  next(){
    this.dataservice.countTheoriquePratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
     console.log("count of vehicule",JSON.parse(data));
     if(Number(JSON.parse(data)['countT']) === 0){
       this.errorMoniteurTheorique = "Vous devez ajouter d'abord un moniteur theorique";
     }else if(Number(JSON.parse(data)['countP']) === 0){
      this.errorMoniteurPratique = "Vous devez ajouter d'abord un moniteur pratique";
     }else{
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

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { addMoniteurP, addMoniteurT, updateMoniteurP, updateMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
@Component({
  selector: 'app-moniteur-modal',
  templateUrl: './moniteur-modal.component.html',
  styleUrls: ['./moniteur-modal.component.css']
})
export class MoniteurModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  @Input() type: any;
  base64Img_image:any = '';
  categorie_list:any = '';
  submitted:boolean = false;
  form:any;
  dataMoniteur:any;
  constructor(public activeModal: NgbActiveModal,
              private store: Store<{ autoEcole: AutoEcoleState}>
    ) {

     }

  ngOnInit(): void {
    if(this.btn === "Ajouter"){
      this.createFormNew();
    }else{
      this.createFormUpdate();
    }
    console.log(this.data);
    this.dataMoniteur = this.data;
    this.form.patchValue({
      nom: this.dataMoniteur?.nom,
      prenom: this.dataMoniteur?.prenom,
      cin: this.dataMoniteur?.cin,
      date_naissance: this.dataMoniteur?.date_naissance,
      lieu_naissance: this.dataMoniteur?.lieu_naissance,
      email: this.dataMoniteur?.email,
      telephone: this.dataMoniteur?.telephone,
      date_embauche: this.dataMoniteur?.date_embauche,
      type_moniteur: this.dataMoniteur?.type,
      capn: this.dataMoniteur?.capn,
      conduire: this.dataMoniteur?.conduire,
      adresse: this.dataMoniteur?.adresse,
      observations: this.dataMoniteur?.observations,
      carteMoniteur: this.dataMoniteur?.carteMoniteur
    });

    let categorie =  this.dataMoniteur?.categorie;
      this.categorie_list = categorie.join(',')
      this.categorie_list += ','
     console.log(this.categorie_list);
  }
  createFormNew(){
    this.form = new FormGroup({
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
  
  }
  createFormUpdate(){
    this.form = new FormGroup({
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
      carteMoniteur: new FormControl(''),
    })
  
  }
  moniteur(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid");
        return;
    }
    const string = this.categorie_list.split(',')
    string.pop();
    console.log(string.join(','));
 
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
    console.log(dataMoniteur);
    if(this.btn === 'Ajouter'){
    
      if(this.type === 'T'){
        this.store.dispatch(addMoniteurT({idAuto: localStorage.getItem('autoEcole_id'), payload: dataMoniteur}));
      }else{
        this.store.dispatch(addMoniteurP({idAuto: localStorage.getItem('autoEcole_id'), payload: dataMoniteur}));
      }
    }else{
        if(this.type === 'T'){
          this.store.dispatch(updateMoniteurT({id: this.data.id, data: dataMoniteur}));
        }else{
          this.store.dispatch(updateMoniteurP({id: this.data.id, data: dataMoniteur}));
        }
        this.activeModal.dismiss('Cross click')
    }
 
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
addCategorie(e:any){
  if(!this.categorie_list.includes(e.target.value)){
    this.categorie_list += e.target.value + ',';
  }
  console.log(this.categorie_list);
}
}

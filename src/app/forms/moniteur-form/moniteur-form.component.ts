import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { AutoEcoleState } from 'src/app/state/autoEcole/autoEcole.state';
import { addMoniteurT,} from 'src/app/state/moniteur/moniteur.actions';
import { addMoniteurP } from 'src/app/state/moniteurPratique/moniteurPratique.actions';
@Component({
  selector: 'app-moniteur-form',
  templateUrl: './moniteur-form.component.html',
  styleUrls: ['./moniteur-form.component.css']
})
export class MoniteurFormComponent implements OnInit {
  dateVal = new Date();               
  submitted:any = false;
  data:any;
  base64Img_image:any = '';
  categorie_list:any = '';
  categories_array:any = [];
  id:any;
  is_update:any;
  action:any = 'Ajouter';
  moniteur:any;
  autoecol:any;
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

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<{ autoEcole: AutoEcoleState}>
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
          this.store.dispatch(addMoniteurT({idAuto: localStorage.getItem('autoEcole_id'), payload: dataMoniteur}));
          this.router.navigateByUrl("/listes-moniteurs")
      }else{
          this.store.dispatch(addMoniteurP({idAuto: localStorage.getItem('autoEcole_id'), payload: dataMoniteur}));
          this.router.navigateByUrl("/listes-moniteurs")
        }
 
  }
  addCategorie(e:any){
    if(!this.categorie_list.includes(e.target.value)){
      this.categorie_list += e.target.value + ',';
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

}
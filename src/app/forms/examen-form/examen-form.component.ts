import { Component, OnInit } from '@angular/core';
import { CandidatService } from 'src/app/services/candidat.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { take } from 'rxjs/operators';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadMoniteurP, loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { getMoniteurP } from 'src/app/state/moniteur/moniteur.selector';
import { getCandidatBasic, getCandidatSupplementaire } from 'src/app/state/candidat/candidat.selector';
import { addExamen, updateExamen } from 'src/app/state/examen/examen.actions';

@Component({
  selector: 'app-examen-form',
  templateUrl: './examen-form.component.html',
  styleUrls: ['./examen-form.component.css']
})
export class ExamenFormComponent implements OnInit {
  dateVal = new Date();
  candidatData:any;
  categoriePermis:any;
  examenData:any;
  submitted:any = false;
  is_update:Boolean = false;
  update_ajoute:any;
  id_auto_examen:any;
  candidats:any;
  moniteurP:any;
  idAutoEcole:any;
  candidatBasic:any;
  candidatSupplementaire:any;
  form = new FormGroup({
    candidat_id: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    moniteur_pratique_id: new FormControl('', Validators.required),
    date_examen: new FormControl('', Validators.required),
    date_depot: new FormControl('', Validators.required),
  })
  constructor(private candidatService:CandidatService,
              private dataService:DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store:Store<{candidat: CandidatState, moniteur: MoniteurState}>
    ) { }

  ngOnInit(): void {
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.dataService.getCandidat(this.idAutoEcole).subscribe(data=>{
        this.candidats = JSON.parse(data);
    })
    this.store.pipe(take(1)).subscribe(store =>{
      if(!store.candidat.candidat.loaded){
        this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}))
      }
    })
   
    this.store.select(getCandidatBasic).subscribe(data =>{
      this.candidatBasic = data;
    })
    this.store.select(getCandidatSupplementaire).subscribe(data =>{
      this.candidatSupplementaire = data;
    })

    let id = Number(this.route.snapshot.paramMap.get('id'));
    if(this.router.url === '/update-examen/' + id){
      this.is_update = true;
      this.update_ajoute = "Modifier";
      this.id_auto_examen = id;
      this.dataService.getExamenById(id).subscribe(data => {
        this.examenData = data;
        this.form.patchValue({
            candidat_id: this.examenData.candidat_id,
            categorie: this.examenData.categorie,
            date_examen: this.examenData.date_examen,
            date_depot: this.examenData.date_depot,
            moniteur_pratique_id: this.examenData.candidat.moniteur_pratique_id
        })
       
      }); // /detail-examen/4
    } else if(this.router.url === '/detail-examen/' + id){
    }else{
      this.is_update = false;
      this.update_ajoute = "Ajouter";
      this.id_auto_examen = localStorage.getItem('autoEcole_id');
    }
    this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.moniteurP = data;
    })
  }
  add_Or_updateExamen(){
    this.submitted = true;
    console.log(this.form.value);
    if(this.form.invalid){
      return;
    }
    let id = Number(this.route.snapshot.paramMap.get('id'));
    let data = {
      candidat_id: this.form.value.candidat_id,
      moniteur_pratique_id: this.form.value.moniteur_pratique_id,
      categorie: this.form.value.categorie,
      date_examen: this.form.value.date_examen,
      date_depot: this.form.value.date_depot,
    };
    if(this.is_update){
        // updateExamen addExamen
        console.log("update examen *******************");
        this.store.dispatch(updateExamen({id, data}))
    }else{
      console.log("add examen *******************");
      this.store.dispatch(addExamen({idAutoEcole: this.idAutoEcole, data}))
    }
    

  }

}

import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { take } from 'rxjs/operators';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { CourState } from 'src/app/state/cours/cour.state';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
import { loadPresencecourTheorique } from 'src/app/state/presencecours/presencecours.actions';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cours-theorique-form',
  templateUrl: './cours-theorique-form.component.html',
  styleUrls: ['./cours-theorique-form.component.css']
})
export class CoursTheoriqueFormComponent implements OnInit {
  candidat_data:any;
  dateVal = new Date();
  submitted:any = false;
  list_candidats:any;
  list_candidat:any = '';
  candida:any;
  id:any;
  id_autoEcole:any;
  form:any;
  idC_auto:any;
  courById:any;
  candidat_data_b:any;
  candidat_data_s:any;
  modifierOrAjouter:any;
  presence:any = {}
  candidats:any;
  candidatBasic:any;
  candidatSupplementaire:any;
  exist_presence:any;
  is_update:boolean = false;
  moniteurTheorique_data:any;
  candidat_list:any = '';
  constructor(private translateService: TranslationService,
              private candidatData: CandidatService,
              private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private auth:AuthService,
              private store:Store<{candidat:CandidatState, moniteur: MoniteurState, cour: CourState, presencecour: presencecourState}>
    ) { }

  ngOnInit(): void {
    // create form controlle
    this.createForm();
    this.auth.authStatus.subscribe(value=>{
      if(value){
       
        this.getData1();
        this.id_autoEcole = localStorage.getItem('autoEcole_id');
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if(this.router.url === '/cours-modifier/'+this.id){
            this.modifierOrAjouter = 'Modifier';
            this.is_update = true;
            this.idC_auto = this.id;
            this.dataService.getPresenceTByCour(this.id, this.id_autoEcole).subscribe(data=>{
              this.exist_presence = JSON.parse(data).presence
                this.presence = JSON.parse(data).presence;
                this.candidats = JSON.parse(data).candidat;
            })
            this.store.select(state=>state.cour.cours.coursTheorique.coursTheorique).subscribe(courth=>{
                this.courById = courth.filter(cour => cour.id === this.id);
                this.candidat_list = this.courById.candidats;
            })
            this.dataService.getCourTById(this.id).subscribe(data =>{
              this.courById = JSON.parse(data);
              // this.candidat_list = this.courById.candidat;
              this.candidatData.getListCandidat(this.courById.candidat).subscribe(data=>{ console.log(data); this.candidat_list = data})
                 if(!this.presence){
                  let obj = {}
                  for(let i= 0; i<this.courById.candidat.length; i++){
                    let key = this.courById.candidat[i];
                    obj[this.courById.candidat[i]] = "A";
                    this.presence = obj;
                  }
                 }
                 if(this.is_update){
                    this.form.patchValue({
                      date: this.courById.date,
                      date_debut: this.courById.date_debut,
                      date_fin: this.courById.date_fin,
                      type: this.courById.type,
                      permis: this.courById.permis,
                      moniteur_theorique_id: this.courById.moniteur_theorique_id,
                      candidat: this.courById.candidat[0]
                    });
                 }
              
              if(this.courById.candidat.length != 0){
                for(let index = 0; index< this.courById.candidat.length; index++){
                  this.list_candidat += this.courById.candidat[index] + ',';
    
                }
              }
          });
        }else{
            this.modifierOrAjouter = 'Ajouter';
            this.is_update = false;
            this.idC_auto = this.id_autoEcole;
          }
        this.translateService.applyLanguage();
      }
     })
  
  }
getData1(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.moniteur.moniteur.moniteurTheorique.loaded){
      this.store.dispatch(loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
    if(!store.candidat.candidat.loaded){
      this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
     if(!store.presencecour.presencecourstheorique.loaded){
        this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}))
    }
  })
  // select candidat from the store
  this.store.select(state=>state.candidat.candidat).subscribe(state=>{
    this.candidatBasic = state.candidatBasic;
    this.candidatSupplementaire = state.candidatSupplementaire;
  })
  // select moniteur theorique from the store
  this.store.select(state=>state.moniteur.moniteur.moniteurTheorique.moniteurTheorique).subscribe(state=>{
    this.moniteurTheorique_data = state;
  })
}

  createForm(){
    this.form = new FormGroup({
      date: new FormControl('', Validators.required),
      date_debut: new FormControl('', Validators.required),
      date_fin: new FormControl('', Validators.required),
      permis: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      moniteur_theorique_id: new FormControl('', Validators.required),
      candidat: new FormControl('', Validators.required),
    })
  }
  addOrModifierCours_theorique(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.addCoursTheorique(this.is_update, this.id_autoEcole, this.idC_auto,
      {
        date: this.form.value.date,
        date_debut: this.form.value.date_debut,
        date_fin: this.form.value.date_fin,
        permis: this.form.value.permis,
        type: this.form.value.type,
        moniteur_theorique_id: this.form.value.moniteur_theorique_id,
        candidat: this.list_candidat,
        presence: this.presence
      }
      ).subscribe(data => {
        this.router.navigateByUrl('/listes-cours');
      },
        error => this.handlerror(error)
      )
}
  handlerror(error:any){
      console.log(error);
  }
  add_to_list(e:any){
   
      // add candidat to list presence
      if(!this.list_candidat.includes(e.target.value)){
         this.presence[e.target.value] = 'A';
         // get candidat that selected
         this.candidatData.getCandidatById(e.target.value).subscribe((data:any) =>{
            this.candidat_list +=  data.nom_fr + " " + data.prenom_fr + ", ";
            });
            //  add id of the candidat to list id candidats inscrit in this cours
            this.list_candidat += e.target.value + ',';

          }
      }
     
}

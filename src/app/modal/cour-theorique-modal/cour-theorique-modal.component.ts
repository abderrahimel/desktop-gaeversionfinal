import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { loadCourTheorique } from 'src/app/state/cours/cour.actions';
import { CourState } from 'src/app/state/cours/cour.state';
import { loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadPresencecourTheorique } from 'src/app/state/presencecours/presencecours.actions';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';

@Component({
  selector: 'app-cour-theorique-modal',
  templateUrl: './cour-theorique-modal.component.html',
  styleUrls: ['./cour-theorique-modal.component.css']
})
export class CourTheoriqueModalComponent implements OnInit {
  @Input() type: any;
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  form:any;
  candidat_data:any;
  list_candidats:any;
  list_candidat:any = '';
  candida:any;
  id:any;
  id_autoEcole:any;
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
  constructor(public activeModal: NgbActiveModal,
              private store:Store<{candidat:CandidatState, moniteur: MoniteurState, cour: CourState, presencecour: presencecourState}>,
              private dataService: DataService,
              private router: Router,
              private candidatData: CandidatService,
    ) { }


    ngOnInit(): void {
      this.getCandidatsBasic()
      this.getCandidatsSupplementaire()
      this.createForm();
      this.getData1();
      this.form.patchValue({
        date: this.data?.date,
        date_debut: this.data?.date_debut,
        date_fin: this.data?.date_fin,
        type: this.data?.type,
        permis: this.data?.permis,
        moniteur_theorique_id: this.data?.moniteur_theorique_id,
        candidat: this.data?.candidat[0]
      });
      if( this.data?.id !== undefined){
        this.candidat_list = this.data?.candidats;
      }

      this.id_autoEcole = localStorage.getItem('autoEcole_id');
           if(this.data !== null || this.data?.id !== undefined){
            this.dataService.getPresenceTByCour(this.data?.id, this.id_autoEcole).subscribe(data=>{
              this.exist_presence = JSON.parse(data).presence
                this.presence = JSON.parse(data).presence;
                this.candidats = JSON.parse(data).candidat;
            })
            
            this.candidatData.getListCandidat(this.data?.candidat).subscribe(data=>{this.candidat_list = data})
               if(!this.presence){
                let obj = {}
                for(let i= 0; i<this.data?.candidat.length; i++){
                  let key = this.data?.candidat[i];
                  obj[this.data?.candidat[i]] = "A";
                  this.presence = obj;
                }
               }
              
            
            if(this.data?.candidat.length != 0){
              for(let index = 0; index< this.data?.candidat.length; index++){
                this.list_candidat += this.data?.candidat[index] + ',';
              }
            }
           }
    }
    
  getCandidatsSupplementaire(){
    this.dataService.getCandidatsSupplementaire(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatSupplementaire = JSON.parse(data)   
    },
    error=>console.log(error.error)
    )
  }  
  getCandidatsBasic(){ 
    this.dataService.getCandidatsBasic(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatBasic = JSON.parse(data)  
    },
    error=>console.log(error.error)
    )
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
  addOrModifierCours_theorique(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
   
    if(this.btn === 'Ajouter'){
    this.dataService.addCourTheorique(localStorage.getItem('autoEcole_id'),{
      date: this.form.value.date,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      permis: this.form.value.permis,
      type: this.form.value.type,
      moniteur_theorique_id: this.form.value.moniteur_theorique_id,
      candidat: this.list_candidat,
      presence: this.presence
    }).subscribe(data => {
      }
      )
    }else{
      this.dataService.updateCourTheorique(this.data.id,localStorage.getItem('autoEcole_id'),  {
        date: this.form.value.date,
        date_debut: this.form.value.date_debut,
        date_fin: this.form.value.date_fin,
        permis: this.form.value.permis,
        type: this.form.value.type,
        moniteur_theorique_id: this.form.value.moniteur_theorique_id,
        candidat: this.list_candidat,
        presence: this.presence
      }).subscribe(data => {
        this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        },
          error => this.handlerror(error)
        )
    }
    this.activeModal.dismiss('Cross click');
    this.store.dispatch(loadCourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}))
   }
handlerror(error:any){
    console.log(error);
}
add_to_list(e:any){
 
    if(!this.list_candidat.includes(e.target.value)){
       this.presence[e.target.value] = 'A';
       this.candidatData.getCandidatById(e.target.value).subscribe((data:any) =>{
          this.candidat_list +=  data.nom_fr + " " + data.prenom_fr + ", ";
          });
          this.list_candidat += e.target.value + ',';
        }
    }
}


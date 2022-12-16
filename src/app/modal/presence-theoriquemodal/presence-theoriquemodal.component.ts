import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { loadCourTheorique } from 'src/app/state/cours/cour.actions';
import { CourState } from 'src/app/state/cours/cour.state';
import { loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadPresencecourTheorique } from 'src/app/state/presencecours/presencecours.actions';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
interface Object {
  [key: string]: any
}

@Component({
  selector: 'app-presence-theoriquemodal',
  templateUrl: './presence-theoriquemodal.component.html',
  styleUrls: ['./presence-theoriquemodal.component.css']
})
export class PresenceTheoriquemodalComponent implements OnInit {
  @Input() data: any;
  submitted:boolean = false;
  id:any;
  updateOrAdd:any;
  is_update:any;
  cour:any
  candidats:any = [];
  is_null:any;
  can:any;
  checked:boolean = false;
  presenceData:any;
  idMoniteur:any;
  presenceTheorique:any;
  present = {};
  object = {};
  moniteurTh:any;
  checkedorNot:any;
  id_autoecole_or_vehicule:any;
  form = new FormGroup({
    heure_debut:new FormControl('', Validators.required),
    heure_fin:new FormControl('', Validators.required),
    moniteur_theorique_id :new FormControl('', Validators.required),
    categorie:new FormControl('', Validators.required),
  });
  constructor(public activeModal: NgbActiveModal,
               private translateService: TranslationService, 
               private dataservice: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private candidatService:CandidatService,
               private store: Store<{presencecour: presencecourState, cour:CourState, moniteur:MoniteurState}>
    ) { }

    ngOnInit(): void {
      // get moniteurs;
       this.currentData();
      this.id = this.data?.presence?.id;
        this.presenceTheorique = this.data?.presence;
        if(this.presenceTheorique!= null){
         this.checkedorNot = this.presenceTheorique?.presence;
         this.present = this.presenceTheorique?.presence;
        }
               this.cour = this.data;
               this.can = this.cour?.candidat;
               
                 let moniteurr = this.data?.moniteurth;
                 this.idMoniteur = this.cour?.moniteur_theorique_id;
                 this.form.patchValue({
                   heure_debut: this.cour?.date_debut,
                   heure_fin:   this.cour?.date_fin,
                   moniteur_theorique_id : this.data?.id,
                   categorie: this.cour?.permis,
                  });
            
               let item = this.cour?.candidat;
               
               let obj = {}
               if(!this.checkedorNot){
                 for(let i= 0; i<item.length; i++){
                   let key = item[i];
                   obj[item[i]] = "A";
                   this.checkedorNot = obj;
                 }
               }
               if(this.presenceTheorique != null){
                 this.present = this.checkedorNot;
               }
               
               for(let i= 0; i<item.length; i++){
                 this.candidatService.getCandidatById(item[i]).subscribe(data=>{
                   let candidat = data;
                   this.candidats.push([item[i], data['nom_fr'] + " " + data['prenom_fr'], ])
                  
                 })
             }
             
 
             this.checkedorNot = this.data?.presence[0].presence;
             this.present = this.data?.presence[0].presence;
    }
    currentData()
    {
      this.store.pipe(take(1)).subscribe(store=>{
       if(!store.moniteur.moniteur.moniteurTheorique.loaded){
         this.store.dispatch(loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')}));
       }
      })
      // select moniteur theorique
      this.store.select(state=>state.moniteur.moniteur.moniteurTheorique.moniteurTheorique).subscribe(mth=>{
       this.moniteurTh = mth;
      })
    
    }
    AjoutePresence(){
      this.submitted = true;
      if(this.form.invalid){
        return;
      } 
      let id = this.cour.id;
     this.dataservice.ModifierPresenceCourTheorique(this.data?.presence[0]?.id,{
       presence: this.present,
       candidat: this.can
     }).subscribe(data=>{
      this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
     },
     error => this.handlerror(error)
     )
     this.store.dispatch(loadCourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    this.activeModal.dismiss('Cross click');
  }
  handlerror(error:any){
    console.log(error);
  }
  checkBoxValue(event:any, id:any){

    let checked = event.target.checked;
    if(checked){
      // this.present[id] = "P";
      this.object[id] = "P";
    }else{
    //  this.present[id] = "A";
     this.object[id] = "A";
    }
    if(!this.can.includes(id)){
     this.can.push(id);
   }


  let newobj = {...this.present};  
  newobj[id] = this.object[id]
  this.present = newobj;
  }

}
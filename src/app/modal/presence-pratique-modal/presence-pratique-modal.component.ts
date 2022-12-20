import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { loadCourPratique, loadCourTheorique } from 'src/app/state/cours/cour.actions';
import { CourState } from 'src/app/state/cours/cour.state';
import { loadMoniteurP, loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadPresencecourPratique } from 'src/app/state/presencecours/presencecours.actions';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';

@Component({
  selector: 'app-presence-pratique-modal',
  templateUrl: './presence-pratique-modal.component.html',
  styleUrls: ['./presence-pratique-modal.component.css']
})
export class PresencePratiqueModalComponent implements OnInit {
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
  presencepratique:any;
  present = {};
  object = {};
  moniteurp:any;
  checkedorNot:any;
  id_autoecole_or_vehicule:any;
  form = new FormGroup({
    heure_debut:new FormControl('', Validators.required),
    heure_fin:new FormControl('', Validators.required),
    moniteur_pratique_id :new FormControl('', Validators.required),
    categorie:new FormControl('', Validators.required),
  });
  constructor(public activeModal: NgbActiveModal,
               private translateService: TranslationService, 
               private dataservice: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private candidatService:CandidatService,
               private store: Store<{presencecour: presencecourState, cour:CourState}>
    ) { }

    ngOnInit(): void {
      // get moniteurs;
      console.log("presence pratique");console.log(this.data);
       this.currentData();
      this.id = this.data?.presence[0]?.id;
        this.presencepratique = this.data?.presence;
        if(this.presencepratique!= null){
         this.checkedorNot = this.presencepratique?.presence;
         this.present = this.data?.presence?.presence;
        }
               this.cour = this.data;
               this.can = this.cour?.candidat;
                 let moniteurr = this.data?.moniteurth;
                 this.idMoniteur = this.cour?.moniteur_theorique_id;
                 this.form.patchValue({
                   heure_debut: this.cour?.date_debut,
                   heure_fin:   this.cour?.date_fin,
                   moniteur_pratique_id : this.data?.moniteur_pratique_id,
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
               if(this.presencepratique != null){
                 this.present = this.checkedorNot;
               }
               
               for(let i= 0; i<item.length; i++){
                 this.candidatService.getCandidatById(item[i]).subscribe(data=>{
                   let candidat = data;
                   this.candidats.push([item[i], data['nom_fr'] + " " + data['prenom_fr'], ])
                  
                 })
             }
             
             this.checkedorNot = this.data?.presence[0]?.presence;
             this.present = this.data?.presence[0]?.presence;
    }
    currentData()
    {
         this.dataservice.getMoniteursP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
          this.moniteurp = data;
         })
    }

    AjoutePresence(){
      this.submitted = true;
      if(this.form.invalid){
        return;
      } 
     
     let modifier;
     let id;
     if(this.presencepratique?.id!= null){
       modifier = true;
        id = this.presencepratique?.id;
     }else{
       modifier = false;
       id = this.cour?.id;
     }
     this.dataservice.ModifierPresenceCourPratique(this.data?.presence[0]?.id,{
      presence: this.present,
      candidat:this.can
    }).subscribe(data=>{
      this.store.dispatch(loadPresencecourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    },
    error => this.handlerror(error)
    )
    this.store.dispatch(loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
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
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadAbsence, loadAbsenceMoniteurPratique } from 'src/app/state/absence/absence.actions';
import { AbsenceState } from 'src/app/state/absence/absence.state';
import { AbsenceMoniteurPratiqueState } from 'src/app/state/absenceMoniteurPrarique/absenceMoniteurPratique.state';

@Component({
  selector: 'app-add-absence-moniteur',
  templateUrl: './add-absence-moniteur.component.html',
  styleUrls: ['./add-absence-moniteur.component.css']
})
export class AddAbsenceMoniteurComponent implements OnInit {
  @Input() type: any;
  submitted:boolean = false;
  dataemployee:any;
  datamoniteurT:any; 
  title:any;
  datamoniteurP:any;
  loadMoniteurs:any;
  isMTheorique:any;
  form = new FormGroup({
    moniteur_id: new FormControl('', Validators.required),
    type_absence: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    remarque: new FormControl('', Validators.required),
  })
  constructor( public activeModal: NgbActiveModal,
                private dataService:DataService,
                private store:Store<{absence:AbsenceState, absenceMoniteurPratique: AbsenceMoniteurPratiqueState}>
    ) { }

  ngOnInit(): void {
    if(this.type === 'T'){
      this.title = 'Theorique'
      this.isMTheorique = true;
      this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.loadMoniteurs = data;
      })
    }else{
      this.title = 'Pratique'
      this.isMTheorique = false;
      this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.loadMoniteurs = data;
    });
    }
  
  
  }

  AddAbsence(){
    console.log(this.form.value);
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data;
   if(this.isMTheorique){
     // add absence for moniteur theorique
     console.log("add absence for moniteur theorique");
    data = {  type_absence: this.form.value.type_absence,
              date_debut: this.form.value.date_debut,
              date_fin: this.form.value.date_fin,
              remarque: this.form.value.remarque,
              moniteur_theorique_id:this.form.value.moniteur_id};
    this.dataService.addAbsenceMoniteurTheorique(localStorage.getItem('autoEcole_id'), data).subscribe(data=>
      {
        console.log(data)
        this.store.dispatch(loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      });
   }else{
    // add absence for moniteur pratique
    console.log("add absence for moniteur pratique");
    data = {  type_absence: this.form.value.type_absence,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      remarque: this.form.value.remarque,
      moniteur_pratique_id:this.form.value.moniteur_id};
    this.dataService.addAbsenceMoniteurPratique(localStorage.getItem('autoEcole_id'), data).subscribe(data=>
      {
      console.log(data)
      this.store.dispatch(loadAbsenceMoniteurPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));  
    }
      );
   }
   this.activeModal.dismiss('Cross click');
  }
  

}



/*
      'moniteur_theorique_id'=>'required',
            'type_absence'=>'required',
            'date_debut'=>'required',
            'date_fin'=>'required',
            'remarque'=>'required',



*/ 
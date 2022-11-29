import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addAbsenceAction, loadAbsence, loadAbsenceMoniteurPratique, setloadedAbsenceMoniteurTheorique, updateAbsenceAction } from 'src/app/state/absence/absence.actions';
import { AbsenceState } from 'src/app/state/absence/absence.state';
import { AbsenceMoniteurPratiqueState } from 'src/app/state/absenceMoniteurPrarique/absenceMoniteurPratique.state';
import { loadEmploye } from 'src/app/state/employe/employe.action';

@Component({
  selector: 'app-update-moniteur-absence-modal',
  templateUrl: './update-moniteur-absence-modal.component.html',
  styleUrls: ['./update-moniteur-absence-modal.component.css']
})
export class UpdateMoniteurAbsenceModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  dataemployee:any;
  type:any;
  isMoniteurTheorique:any;
  form = new FormGroup({
    moniteur: new FormControl(''),
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

    console.log(this.data?.moniteur?.type);
    if(this.data?.moniteur?.type === 'Moniteur Théorique'){
      // update moniteur theorique
      this.type = "Theorique"
      this.isMoniteurTheorique = true;
    }else{
      // update moniteur pratique
      this.type = "Pratique"
      this.isMoniteurTheorique = false;
    }
    this.form.patchValue({ 
      moniteur: this.data?.moniteur?.nom + " " + this.data?.moniteur?.prenom,
      type_absence: this.data?.type_absence,
      date_debut: this.data?.date_debut,
      date_fin: this.data?.date_fin,
      remarque: this.data?.remarque,
    })

  
  }
  updateAbsence(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    let data  = {
      type_absence: this.form.value.type_absence,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      remarque: this.form.value.remarque,
    };
   if(this.isMoniteurTheorique){
       // update moniteur theorique
       this.dataService.updateAbsenceMoniteurTheorique(this.data?.id, data).subscribe(data=>{
        this.store.dispatch(setloadedAbsenceMoniteurTheorique());
        this.store.dispatch(loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        
       })
   }else{
      // update moniteur pratique
      this.dataService.updateAbsenceMoniteurPratique(this.data?.id, data).subscribe(data=>{
        this.store.dispatch(loadAbsenceMoniteurPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadAbsenceMoniteurPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
       })
   }
   this.activeModal.dismiss('Cross click');
  }
}

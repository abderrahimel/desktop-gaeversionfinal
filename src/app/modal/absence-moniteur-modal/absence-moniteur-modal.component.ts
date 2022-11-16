import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addAbsenceAction, loadAbsence, updateAbsenceAction } from 'src/app/state/absence/absence.actions';
import { addabsenceEmployeAction, loadabsenceEmploye } from 'src/app/state/absenceEmploye/absenceEmploye.actions';
import { AbsenceEmployeState } from 'src/app/state/absenceEmploye/absenceEmploye.state';
import { loadEmploye } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';

@Component({
  selector: 'app-absence-moniteur-modal',
  templateUrl: './absence-moniteur-modal.component.html',
  styleUrls: ['./absence-moniteur-modal.component.css']
})
export class AbsenceMoniteurModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  dataemployee:any;
  form = new FormGroup({
    employe_id: new FormControl('', Validators.required),
    type_absence: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    remarque: new FormControl(''),
  })
  constructor( public activeModal: NgbActiveModal,
                private store: Store<{employe: EmployeState, absenceEmploye: AbsenceEmployeState}>,
                private dataService:DataService
    ) { }

  ngOnInit(): void {
    this.form.patchValue({ 
      employe_id: this.data?.employe_id,
      type_absence: this.data?.type_absence,
      date_debut: this.data?.date_debut,
      date_fin: this.data?.date_fin,
      remarque: this.data?.remarque,
    })
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.employe.employe.loaded){
        this.store.dispatch(loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    });
    // select employes from the store
    this.dataService.getEmploye(localStorage.getItem('autoEcole_id')).subscribe(employes =>{
      this.dataemployee = JSON.parse(employes);
    })
  }
  AddAbsence(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data  = {
      employe_id: this.form.value.employe_id,
      type_absence: this.form.value.type_absence,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      remarque: this.form.value.remarque,
    };
   if(this.btn === 'Ajouter'){
       // dispatch action action add absence
       this.store.dispatch(addabsenceEmployeAction({idAutoEcole: localStorage.getItem('autoEcole_id'), data}));
   }else{
      // dispatch action update absence updateAbsenceAction 
      this.store.dispatch(updateAbsenceAction({id: this.data.id, data}));
   }
   this.store.dispatch(loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
   this.activeModal.dismiss('Cross click');
  }
}

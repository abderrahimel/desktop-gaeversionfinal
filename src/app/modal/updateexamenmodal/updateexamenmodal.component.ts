import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { loadExamenAction, setloadingToFalse } from 'src/app/state/examen/examen.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';

@Component({
  selector: 'app-updateexamenmodal',
  templateUrl: './updateexamenmodal.component.html',
  styleUrls: ['./updateexamenmodal.component.css']
})

export class UpdateexamenmodalComponent implements OnInit {
  @Input() data: any;
  @Input() btn: any;
  submitted:boolean = false;
  candidats:any;
  moniteurP:any;
  form = new FormGroup({
    candidat_id: new FormControl('', Validators.required), 
    categorie: new FormControl('', Validators.required),
    moniteur_pratique_id: new FormControl('', Validators.required),
    date_examen: new FormControl('', Validators.required),
    date_depot: new FormControl('', Validators.required),
  })

  constructor(public activeModal: NgbActiveModal,
              private store:Store<{candidat: CandidatState, moniteur: MoniteurState}>,
              private dataService:DataService,
    ) { }

  ngOnInit(): void {
    this.dataService.getCandidat(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidats = JSON.parse(data);
   
      })
      this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.moniteurP = data;
      })
    this.form.patchValue({
      candidat_id: this.data?.candidat_id,
      categorie: this.data?.categorie,
      date_examen: this.data?.date_examen,
      date_depot: this.data?.date_depot,
      moniteur_pratique_id: this.data?.candidat?.moniteur_pratique_id
  })
 
  }
  updateExamen(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data = {
      candidat_id: this.form.value.candidat_id,
      moniteur_pratique_id: this.form.value.moniteur_pratique_id,
      categorie: this.form.value.categorie,
      date_examen: this.form.value.date_examen,
      date_depot: this.form.value.date_depot,
    };
    if(this.btn === 'Modifier'){
      this.dataService.updateExamen(this.data?.id ,data).subscribe();
    }else{
      this.dataService.addExamen(localStorage.getItem('autoEcole_id'), data).subscribe(data=>{})
    }
    this.store.dispatch(loadExamenAction({idAutoEcole: localStorage.getItem('autoEcole_id')}))
     this.activeModal.dismiss('Cross click');
  }
}

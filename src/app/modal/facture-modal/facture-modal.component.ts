import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { addfactures, updatefactures } from 'src/app/state/factures/factures.actions';
import { FactureState } from 'src/app/state/factures/factures.state';
@Component({
  selector: 'app-facture-modal',
  templateUrl: './facture-modal.component.html',
  styleUrls: ['./facture-modal.component.css']
})
export class FactureModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  candidats:any;
  submitted:boolean = false;
  form = new FormGroup({  
    date: new FormControl('', Validators.required),
    candidat_id: new FormControl('', Validators.required),
    tva: new FormControl('', Validators.required),
    montant_ttc: new FormControl('', Validators.required),
    montant_ht: new FormControl('', Validators.required),
    remarque: new FormControl('', Validators.required),
  })
  constructor(public activeModal: NgbActiveModal,
              private dataService: DataService,
              private store:Store<{candidat: CandidatState, facture: FactureState}>,
              ) { }

  ngOnInit(): void {
    this.dataService.getCandidat(localStorage.getItem('autoEcole_id')).subscribe(data=>{
           this.candidats = JSON.parse(data)
    })
    this.form.patchValue({
      date: this.data?.date,
      candidat_id: this.data?.candidat_id,
      tva: this.data?.tva,
      montant_ttc: this.data?.montant_ttc,
      montant_ht: this.data?.montant_ht,
      remarque: this.data?.remarque,
    });
  }
  add_orUpdatefacture(){
    this.submitted = true; 
    if(this.form.invalid){
      return;
    }
    let data =  {
      date: this.form.value.date,
      candidat_id: this.form.value.candidat_id,
      tva: this.form.value.tva,
      montant_ttc: this.form.value.montant_ttc,
      montant_ht: this.form.value.montant_ht,
      remarque: this.form.value.remarque,
    }
    if(this.btn === 'Ajouter'){ // addfactures updatefactures
      // dispatch action to add facture
      this.store.dispatch(addfactures({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
    }else{
      // dispatch action to update facture
      this.store.dispatch(updatefactures({id: this.data.id, data: data}));
    }
    this.activeModal.dismiss('Cross click');
  }
  
}

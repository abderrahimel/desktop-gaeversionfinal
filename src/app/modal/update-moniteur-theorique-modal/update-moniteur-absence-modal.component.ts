import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addAbsenceAction, updateAbsenceAction } from 'src/app/state/absence/absence.actions';
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
  isMoniteurTheorique:any;
  form = new FormGroup({
    moniteur: new FormControl('', Validators.required),
    type_absence: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    remarque: new FormControl(''),
  })
  constructor( public activeModal: NgbActiveModal,
                private dataService:DataService
    ) { }

  ngOnInit(): void {
    console.log(this.data?.moniteur?.type);
    if(this.data?.moniteur?.type === 'Moniteur Théorique'){
      // update moniteur theorique
      console.log("update moniteur theorique");
      this.isMoniteurTheorique = true;
    }else{
      // update moniteur pratique
      console.log("update moniteur pratique");
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
        console.log(JSON.parse(data));
       })
   }else{
      // update moniteur pratique
      this.dataService.updateAbsenceMoniteurPratique(this.data?.id, data).subscribe(data=>{
        console.log(JSON.parse(data));
       })
   }
   this.activeModal.dismiss('Cross click');
  }
}

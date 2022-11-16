import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-absence-moniteur',
  templateUrl: './add-absence-moniteur.component.html',
  styleUrls: ['./add-absence-moniteur.component.css']
})
export class AddAbsenceMoniteurComponent implements OnInit {

  submitted:boolean = false;
  dataemployee:any;
  datamoniteurT:any; 
  datamoniteurP:any;
  loadMoniteurs:any;
  isMTheorique:any;
  form = new FormGroup({
    type_moniteur: new FormControl('', Validators.required),
    moniteur_id: new FormControl('', Validators.required),
    type_absence: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    type: new FormControl(''),
    remarque: new FormControl(''),
  })
  constructor( public activeModal: NgbActiveModal,
                private dataService:DataService
    ) { }

  ngOnInit(): void {
    this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.datamoniteurT = data;
    })
    this.dataService.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.datamoniteurP = data;
    });
  }
  loadMoniteur(e:any){
    if(e.target.value === 'moniteur theorique'){
      this.loadMoniteurs = this.datamoniteurT;
      this.isMTheorique = true;
    }else{
      this.loadMoniteurs = this.datamoniteurP;
      this.isMTheorique = false;
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
    data = {  type_absence: this.form.value.type_absence,
              date_debut: this.form.value.date_debut,
              date_fin: this.form.value.date_fin,
              remarque: this.form.value.remarque,
              moniteur_theorique_id:this.form.value.moniteur_id};
    this.dataService.addAbsenceMoniteurTheorique(localStorage.getItem('autoEcole_id'), data).subscribe();
   }else{
    // add absence for moniteur pratique
    data = {  type_absence: this.form.value.type_absence,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
      remarque: this.form.value.remarque,
      moniteur_pratique_id:this.form.value.moniteur_id};
    this.dataService.addAbsenceMoniteurPratique(localStorage.getItem('autoEcole_id'), data).subscribe();
   }
   this.activeModal.dismiss('Cross click');
  }
  

}

import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AjaxTimeoutError } from 'rxjs-compat';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { addAbsenceAction, updateAbsenceAction } from 'src/app/state/absence/absence.actions';
import { loadEmploye } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceformComponent implements OnInit {
  dateVal = new Date();               
  submitted:any = false;
  id:any;
  dataemployee:any;
  idAutoEcole:any;
  is_update:any;
  absence:any;
  action:any;
  form = new FormGroup({
    employe_id: new FormControl('', Validators.required),
    type_absence: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    remarque: new FormControl(''),
  })
  constructor(private dataService: DataService,
              private router: Router,
              private route:ActivatedRoute,
              private store: Store<{employe: EmployeState}>
    ) { }

  ngOnInit(): void {
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.id =  Number(this.route.snapshot.paramMap.get('id'));
    if(this.router.url === '/update-absence/' + this.id){
        this.action = 'Modifier';
        this.is_update = true;
        this.dataService.getAbsenceById(this.id).subscribe(absence=>{
          this.absence =JSON.parse(absence);
          this.form.patchValue({
            employe_id: this.absence.employe_id,
            type_absence: this.absence.type_absence,
            date_debut: this.absence.date_debut,
            date_fin: this.absence.date_fin,
            remarque: this.absence.remarque,
          })
        })
    }else{
      this.action = 'Ajouter';
      this.is_update = false;
    }

   
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.employe.employe.loaded){
        this.store.dispatch(loadEmploye({idAutoEcole: this.idAutoEcole}));
      }
    });
    // select employes from the store
    this.store.select(state=>state.employe.employe.employe).subscribe(employes =>{
      this.dataemployee = employes;
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
   if(this.is_update){
       // dispatch action update absence updateAbsenceAction 
       this.store.dispatch(updateAbsenceAction({id: this.id, data}));
   }else{
     // dispatch action action add absence
     this.store.dispatch(addAbsenceAction({idAutoEcole: this.idAutoEcole, data}));
   }
  }
}
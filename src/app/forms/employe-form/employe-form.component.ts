import { Component, OnInit } from '@angular/core';
import { EmployeClass } from 'src/app/classes/employe-class';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { addEmployeAction, updateEmployeAction } from 'src/app/state/employe/employe.action';
import { Store } from '@ngrx/store';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.css']
})
export class EmployeFormComponent implements OnInit {
  employe = new EmployeClass();
  dateVal = new Date();       
  id:any;        
  add_type:boolean = false;
  setForm:any;
  action:any = 'Ajouter';
  moniteur:any;
  is_update:any;
  submitted:any = false;
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    date_naissance: new FormControl('', Validators.required),
    lieu_naissance: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    date_embauche: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    capn: new FormControl('', Validators.required),
    conduire: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    observations: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private store:Store<{employe:EmployeState}>,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }
  addemploye(){
    this.submitted = true;
    console.log(this.form);
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    let idAutoEcole = localStorage.getItem('autoEcole_id');
    let data =  {
      nom: this.form.value.nom,
      prenom: this.form.value.prenom,
      cin: this.form.value.cin,
      date_naissance: this.form.value.date_naissance,
      lieu_naissance: this.form.value.lieu_naissance,
      email: this.form.value.email,
      telephone: this.form.value.telephone,
      date_embauche: this.form.value.date_embauche,
      type: this.form.value.type,
      capn: this.form.value.capn,
      conduire: this.form.value.conduire,
      adresse: this.form.value.adresse,
      observations: this.form.value.observations,
    };
      // dispatch action add
      this.store.dispatch(addEmployeAction({idAutoEcole, data}))
      this.toastr.success('employee bien enregistrer');
  }
  otherType(){
    console.log("other type");
    this.add_type = ! this.add_type;
    if(this.add_type){
      $('#type2').css("display", "none");
      $('#authertype').css("display", "block");
    }else{
      $('#type2').css("display", "block");
      $('#authertype').css("display", "none");
    }
  }
}

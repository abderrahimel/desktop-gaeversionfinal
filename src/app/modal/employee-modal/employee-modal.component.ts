import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { addEmployeAction, updateEmployeAction } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';
import * as $ from "jquery";
@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  id:any;        
  setForm:any;
  add_type:boolean = false;
  moniteur:any;
  is_update:any;
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
    capn: new FormControl(''),
    conduire: new FormControl(''),
    adresse: new FormControl('', Validators.required),
    observations: new FormControl(''),
  })
  constructor(public activeModal: NgbActiveModal,
              private dataService: DataService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private store:Store<{employe:EmployeState}>
    ) { }

  ngOnInit(): void {

    if(this.btn === 'Modifier'){
       this.moniteur = this.data;
       this.form.patchValue({
              nom: this.data?.nom,
              prenom: this.data.prenom,
              cin: this.data?.cin,
              date_naissance: this.data?.date_naissance,
              lieu_naissance: this.data?.lieu_naissance,
              email: this.data?.email,
              telephone: this.data?.telephone,
              date_embauche: this.data?.date_embauche,
              type: this.data?.type,
              capn: this.data?.capn,
              conduire: this.data?.conduire,
              adresse: this.data?.adresse,
              observations: this.data?.observations,
            })
    }
  }
  employe(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
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
      
      if(this.btn === 'Modifier'){
        // dispatch action update
        this.store.dispatch(updateEmployeAction({id:this.data?.id, data}))
      }else{
        //  add employe 
        this.store.dispatch(addEmployeAction({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
      }
      // location.reload();
      this.activeModal.dismiss('Cross click');
  }
  otherType(){
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
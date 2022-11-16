import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { loadCategoriedepense } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { addDepensepersonnel, updateDepensepersonnel } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { loadEmploye } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
@Component({
  selector: 'app-depensepersonnelmodal',
  templateUrl: './depensepersonnelmodal.component.html',
  styleUrls: ['./depensepersonnelmodal.component.css']
})
export class DepensepersonnelmodalComponent implements OnInit {
  @Input() data: any;
  @Input() btn: any;
  show:boolean = true;
  categories:any;
  employees:any;
  submitted:boolean = false;
  form = new FormGroup({  
    id_categorie: new FormControl('', Validators.required), 
    id_employe: new FormControl('', Validators.required),
    date : new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    remarque: new FormControl('', Validators.required)

  });
  constructor(public activeModal: NgbActiveModal,
               private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}>,
              private dataService: DataService
    ) { }

  ngOnInit(): void {
    this.loadData();
    if(this.btn === 'detail'){
      this.show = false;
    }
    this.form.patchValue({
      id_categorie: this.data?.categorie_depence_id,
      id_employe: this.data?.employe_id,
      date: this.data?.date,
      montant: this.data?.montant,
      remarque: this.data?.remarques,
     });
  }
  loadData(){
    this.store.pipe(take(1)).subscribe(store=>{
      // check each state of the store for available data for this components
      if(!store.categorieDepense.depenseCategorie.loaded){
        this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
     

    })
    this.store.select(state=>state.categorieDepense.depenseCategorie.categoriePersonnel).subscribe(dpersonel=>{
      this.categories = dpersonel;
    })
    this.dataService.getEmploye(localStorage.getItem('autoEcole_id')).subscribe(employees=>{
      this.employees = JSON.parse(employees)
     });
  }

  depensepersonnel(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }

    let data = {
      id_categorie: this.form.value.id_categorie,
      date: this.form.value.date,
      montant: this.form.value.montant,
      remarque: this.form.value.remarque,
      id_employe: this.form.value.id_employe,
      id_vehicule: this.form.value.id_vehicule,
    }
    if(this.btn == 'Modifier'){
      // dispatch action update depense personnel 
      this.store.dispatch(updateDepensepersonnel({id: this.data.id, data}))
    }else{
      // dispatch action add depense personnel
      this.store.dispatch(addDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))

    }
    this.loadData();
    this.activeModal.dismiss('Cross click')
  } 

}

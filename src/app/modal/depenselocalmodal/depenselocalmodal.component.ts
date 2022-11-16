import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { addDepenseLocal, loadDepenselocal, updateDepenselocal } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';

@Component({
  selector: 'app-depenselocalmodal',
  templateUrl: './depenselocalmodal.component.html',
  styleUrls: ['./depenselocalmodal.component.css']
})
export class DepenselocalmodalComponent implements OnInit {
  @Input() data: any;
  @Input() btn: any;
  @Input() depenseLocal: any;
  categories:any;
  submitted:boolean = false;
  show:boolean = true;
  form = new FormGroup({   
    id_categorie: new FormControl('', Validators.required), 
    date: new FormControl('', Validators.required), 
    montant: new FormControl('', Validators.required), 
    remarque: new FormControl('', Validators.required)

  });
  constructor(public activeModal: NgbActiveModal,
               private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}> 
    ) { }

  ngOnInit(): void {
    console.log("this.depenseLocal");console.log(this.depenseLocal);
     this.loadData();
    console.log(this.data);
    if(this.btn === 'detail'){
      this.show = false;
    }
    if(this.btn === 'Ajouter'){
      this.form.patchValue({
        id_categorie: ""
      })
    }
    this.form.patchValue({
      id_categorie: this.data?.categorie_depence_id,
      date: this.data?.date,
      montant: this.data?.montant,
      remarque: this.data?.remarques,
     });
  }
  loadData(){
      this.categories = this.depenseLocal;
    
  }
  Depenselocal(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data = {
      id_categorie: this.form.value.id_categorie,
      date: this.form.value.date,
      montant: this.form.value.montant,
      remarque: this.form.value.remarque,
    }
    if(this.btn === 'Modifier'){
       // dispatch action update depense local
       this.store.dispatch(updateDepenselocal({id: this.data.id, data}))
    }else{
         // dispatch action add depense local
         this.store.dispatch(addDepenseLocal({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))
    }
    this.loadData();
    this.activeModal.dismiss('Cross click');
  } 

}

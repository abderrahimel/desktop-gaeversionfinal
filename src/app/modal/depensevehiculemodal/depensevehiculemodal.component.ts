import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { addDepensevehicule, loadDepensevehicule, updateDepensevehicule } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';

@Component({
  selector: 'app-depensevehiculemodal',
  templateUrl: './depensevehiculemodal.component.html',
  styleUrls: ['./depensevehiculemodal.component.css']
})
export class DepensevehiculemodalComponent implements OnInit {
  @Input() data: any;
  @Input() btn: any;
  show:boolean = true;
  submitted:boolean = false
  categories:any;
  vehicules:any;
  form = new FormGroup({   
    id_categorie: new FormControl('', Validators.required),
    id_vehicule: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    remarque: new FormControl('', Validators.required)

  });
  constructor(public activeModal: NgbActiveModal,
    private dataService:DataService,
               private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}> 
    ) { }

  ngOnInit(): void {
    this.dataService.getCategorieDepenseVehicule(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.categories =JSON.parse(data)
    })
    this.loadData()
    if(this.btn === 'detail'){
      this.show = false;
    }
    this.form.patchValue({
      id_categorie: this.data?.categorie_depence_id,
      id_vehicule: this.data?.vehicule_id,
      date: this.data?.date,
      montant: this.data?.montant,
      remarque: this.data?.remarques,
     });
  }
  loadData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.depense.depense.vehicule.loaded){
        this.store.dispatch(loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.vehicule.vehicule.loaded){
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
      }
    })
    // this.store.select(state=>state.categorieDepense.depenseCategorie.categorieVehicule).subscribe(dvehicule=>{
    //   this.categories = dvehicule;
    // })
    this.store.select(state=>state.vehicule.vehicule.vehicule).subscribe(vehicules=>{
      this.vehicules = vehicules;
     })
  }
  Depensevehicule(){
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
    if(this.btn === 'Modifier'){
        // dispatch action update depense vehicule
        this.store.dispatch(updateDepensevehicule({id: this.data.id, data}))
    }else{
         // dispatch action add depense vehicule
         this.store.dispatch(addDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))
      }
      this.loadData();
      this.activeModal.dismiss('Cross click');
    }
  } 


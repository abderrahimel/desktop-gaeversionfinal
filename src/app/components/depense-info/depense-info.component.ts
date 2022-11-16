import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { DataService } from 'src/app/services/data.service';
import { addDepenseCategorie, deletDepenseCategorieById, loadCategoriedepense, updateDepenseCategorie } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { loadDepenselocal, loadDepensepersonnel, loadDepensevehicule } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { loadEmploye } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depense-info',
  templateUrl: './depense-info.component.html',
  styleUrls: ['./depense-info.component.css']
})
export class DepenseInfoComponent implements OnInit {
  formModal: any;
  dateVal = new Date();
  dataLoad:any;
  type:any;
  dataPersonnel:any;
  dataVehicule:any;
  dataDepenseCategorie:any;
  dataLocal:any;
  is_add:any;
  submitted: boolean = false;
  depenseLocal:any = [];
  depenseVehicule:any;
  data1personnel:any;
  idDepenseCategorie:any;
  id:any;
   action:any = 'Valider';
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService,
              private router:Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}> 
    ) { }
  
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }
  getData(){ 
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.depense.depense.local.loaded){
        this.store.dispatch(loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.depense.depense.personnel.loaded){
        this.store.dispatch(loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.depense.depense.vehicule.loaded){
        this.store.dispatch(loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    // select depense local
   this.store.select(state=>state.depense.depense.local.local).subscribe(dlocal=>{
    this.depenseLocal = dlocal; 
    if(this.depenseLocal){
      this.depenseLocal = this.depenseLocal.filter((local:any)=>  Number(local?.date?.split('-')[1]) === this.id);
    }
   }) 
  //  select depense vehicule
   this.store.select(state=>state.depense.depense.vehicule.vehicule).subscribe(dvehicule=>{
    this.depenseVehicule = dvehicule;
    if(this.depenseVehicule){
      this.depenseVehicule = this.depenseVehicule.filter((vehicule:any)=>  Number(vehicule?.date?.split('-')[1]) === this.id);
    }
   })
   // select depense personnel
   this.store.select(state=>state.depense.depense.personnel.personnel).subscribe(dpersonnel=>{
    this.data1personnel = dpersonnel;
    if(this.data1personnel){
      this.data1personnel = this.data1personnel.filter((personnel:any)=>  Number(personnel?.date?.split('-')[1]) === this.id);
    }
   });

 

}


 
 
   
}

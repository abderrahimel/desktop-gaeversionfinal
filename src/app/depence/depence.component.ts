import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { DataService } from '../services/data.service';
import * as $ from "jquery";
import { FormControl, FormGroup } from '@angular/forms';
import { DepenseCategorieState } from '../state/depenseCategorie/depenseCategorie.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { loadCategoriedepense } from '../state/depenseCategorie/depenseCategorie.actions';
import { DepenseState } from '../state/depenses/depense.state';
import { addDepenseLocal, addDepensepersonnel, addDepensevehicule, deleteDepenselocal, deleteDepensepersonnel, deleteDepensevehicule, loadDepenselocal, loadDepensepersonnel, loadDepensevehicule, updateDepenselocal, updateDepensepersonnel, updateDepensevehicule } from '../state/depenses/depense.actions';
import { EmployeState } from '../state/employe/employe.state';
import { loadEmploye } from '../state/employe/employe.action';
import { VehiculeState } from '../state/vehicule/vehicule.state';
import { loadViheculeAction } from '../state/vehicule/vehicule.actions';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepensevehiculemodalComponent } from '../modal/depensevehiculemodal/depensevehiculemodal.component';
import { DepensepersonnelmodalComponent } from '../modal/depensepersonnelmodal/depensepersonnelmodal.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalImprimerDepenseComponent } from '../modal/modal-imprimer-depense/modal-imprimer-depense.component';
@Component({
  selector: 'app-depence',
  templateUrl: './depence.component.html',
  styleUrls: ['./depence.component.css']
})
export class DepenceComponent implements OnInit { 
  displayedColumns: string[] = [ 'date',  'categorie', 'designation', 'montant'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;
  dataSource = new MatTableDataSource();
  depense_data:any;
  depenses:any = [];
  dataLoad:any;
  employees:any;
  vehicules:any;
  categories:any;
  id_local:any;
  data1:any;
  temp_employe:any
  data1personnel:any = [];
  var:any;
  data2:any;
  idDepenseLocal:any;
  idDepensePersonnel:any;
  idDepenseVehicule:any;
  depenseLocal:any = [];
  is_update:any;
  action:any;
  id_depensePersonnel:any;
  data3:any;
  idemp:any;
  dataDetail:any;
  depensP:any;
  modifier:any;
  setTypeFunction:any = '';
  btn:any;
  vh:any;
  is_add: boolean = true;
  dataPersonnel:any;
  personnel:boolean = false;
  vehicule:boolean = false;
  local:boolean = false;
  depenseCategorie:any;
  dataVehicule:any;
  data_v:any = [];
  dataLocal:any;
  submitted:boolean = false;
  form = new FormGroup({  
    id_categorie: new FormControl(''),
    id_employe: new FormControl(''),
    id_vehicule: new FormControl(''),
    date: new FormControl(''),
    montant: new FormControl(''),
    remarque: new FormControl('')

  });
  constructor(private translate: TranslateService,
              private dataService: DataService,
              private modalService: NgbModal,
              private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}> 
    ) {}

  ngOnInit(): void {
    // this.getData();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){ 
        this.store.pipe(take(1)).subscribe(store=>{
          // check each state of the store for available data for this components
          if(!store.categorieDepense.depenseCategorie.loaded){
            this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }

          if(!store.depense.depense.local.loaded){
            this.store.dispatch(loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }
          if(!store.depense.depense.personnel.loaded){
            this.store.dispatch(loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }
          if(!store.depense.depense.vehicule.loaded){
            this.store.dispatch(loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }
          if(!store.employe.employe.loaded){
            this.store.dispatch(loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }
          if(!store.vehicule.vehicule.loaded){
            this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
          }
        })
        // select depense local
       this.store.select(state=>state.depense.depense.local.local).subscribe(dlocal=>{
        this.depenseLocal = dlocal;
        
       }) 
      //  select depense vehicule
       this.store.select(state=>state.depense.depense.vehicule.vehicule).subscribe(dvehicule=>{
        this.data_v = dvehicule;
       })
       // select depense personnel
       this.store.select(state=>state.depense.depense.personnel.personnel).subscribe(dpersonnel=>{
        this.data1personnel = dpersonnel;
       });
       // select employees from the store
       this.store.select(state=>state.employe.employe.employe).subscribe(employees=>{
        this.employees = employees
       });
       // select vehicules from the store
       this.store.select(state=>state.vehicule.vehicule.vehicule).subscribe(vehicules=>{
        this.vehicules = vehicules;
       })

  }


  showForm(hidden:any, p:any){
    this.is_add = true;
    this.form.patchValue({
      id_categorie: "",
      id_employe: "",
      id_vehicule: "",
      date: null,
      montant: null,
      remarque: null,
     });
    if(hidden){
      $('#hidden').css('display', 'none');
    }else{
      $('#hidden').css('display', 'block');
    }
    this.action = 'Ajouter';
    this.is_update = false;
    this.btn = p;
    if(p === 'p'){
      this.personnel = true;
      this.local = false;
      this.vehicule = false;
      // select from the store categorie depense personnel
      this.store.select(state=>state.categorieDepense.depenseCategorie.categoriePersonnel).subscribe(dpersonel=>{
        this.categories = dpersonel;
      })
    }
    if(p === 'v'){
      this.vehicule = true;
      this.personnel = false;
      this.local = false;
      // select from the store categorie depense vehicule
      this.store.select(state=>state.categorieDepense.depenseCategorie.categorieVehicule).subscribe(dvehicule=>{
        this.categories = dvehicule;
      })
    }
    if(p === 'l'){
      this.local = true;
      this.vehicule = false;
      this.personnel = false;
      // select from the store categorie depense local
      this.store.select(state=>state.categorieDepense.depenseCategorie.categorieLocal).subscribe(dlocal=>{
        this.categories = dlocal;
      })

    }
  }
changestyle(name:any){
    if(name === '.dg'){
      $('.dg').css('border', '1px solid red');
      $('.dp').css('border', '1px solid rgb(189, 186, 186)');
      $('.dv').css('border', '1px solid rgb(189, 186, 186)');
      $('.dl').css('border', '1px solid rgb(189, 186, 186)');
      $('.dg').css('color', 'red');
      $('.dp').css('color', 'rgb(189, 186, 186)');
      $('.dv').css('color', 'rgb(189, 186, 186)');
      $('.dl').css('color', 'rgb(189, 186, 186)');
    }else if(name === '.dp'){
      $('.dg').css('border', '1px solid rgb(189, 186, 186)');
      $('.dp').css('border', '1px solid red');
      $('.dv').css('border', '1px solid rgb(189, 186, 186)');
      $('.dl').css('border', '1px solid rgb(189, 186, 186)');
      $('.dg').css('color', 'rgb(189, 186, 186)');
      $('.dp').css('color', 'red');
      $('.dv').css('color', 'rgb(189, 186, 186)');
      $('.dl').css('color', 'rgb(189, 186, 186)');
    }else if(name === '.dv'){
      $('.dg').css('border', '1px solid rgb(189, 186, 186)');
      $('.dp').css('border', '1px solid rgb(189, 186, 186)');
      $('.dv').css('border', '1px solid red');
      $('.dl').css('border', '1px solid rgb(189, 186, 186)');
      $('.dg').css('color', 'rgb(189, 186, 186)');
      $('.dp').css('color', 'rgb(189, 186, 186)');
      $('.dv').css('color', 'red');
      $('.dl').css('color', 'rgb(189, 186, 186)');
    }else {
      $('.dg').css('border', '1px solid rgb(189, 186, 186)');
      $('.dp').css('border', '1px solid rgb(189, 186, 186)');
      $('.dv').css('border', '1px solid rgb(189, 186, 186)');
      $('.dl').css('border', '1px solid red');
      $('.dg').css('color', 'rgb(189, 186, 186)');
      $('.dp').css('color', 'rgb(189, 186, 186)');
      $('.dv').css('color', 'rgb(189, 186, 186)');
      $('.dl').css('color', 'red');
    }
  }
  addOrUpdateDepenseCategorie(){
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
    if(this.is_update){
       // dispatch action for update each depense
       if(this.personnel){ 
          // dispatch action update depense personnel 
          this.store.dispatch(updateDepensepersonnel({id: this.idDepensePersonnel, data}))
      }
       if(this.local){
       // dispatch action update depense local
       this.store.dispatch(updateDepenselocal({id: this.idDepenseLocal, data}))
      }
       if(this.vehicule){
        // dispatch action update depense vehicule
        this.store.dispatch(updateDepensevehicule({id: this.idDepenseVehicule, data}))
      }
    }else{
       // dispatch action for add each depense 
       if(this.personnel){ // actions addDepenseLocal addDepensepersonnel  addDepensevehicule
        // dispatch action add depense personnel
        this.store.dispatch(addDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))
      }
       if(this.local){
         // dispatch action add depense local
         this.store.dispatch(addDepenseLocal({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))
      }
       if(this.vehicule){
         // dispatch action add depense vehicule
         this.store.dispatch(addDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id'), data}))
      }
    }


    this.getData();
    $('#hidden').css('display', 'none');
  } 

  deletedepense(id:any, type:any){

    if(type === 'p'){
      Swal.fire({
        title: 'confirmation',
        text: "Vous voulez vraiment confirmer la suppression !",
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui, supprimer'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteDepensepersonnel({id: id}));
        }
      })
      
    }else if(type === 'l'){
      Swal.fire({
        title: 'confirmation',
        text: "Vous voulez vraiment confirmer la suppression !",
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui, supprimer'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteDepenselocal({id: id}));
        }
      })
      
    }else{
      Swal.fire({
        title: 'confirmation',
        text: "Vous voulez vraiment confirmer la suppression !",
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui, supprimer'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteDepensevehicule({id: id}));
        }
      })
    }
    this.getData();  
  }


  update(id:any, type:any){
    this.store.select(state=>state.categorieDepense.depenseCategorie.categoriePersonnel).subscribe(cpersonnel=>{
      this.categories = cpersonnel;
    });
    this.modifier = 'mp';
    this.is_add = true;
    this.idDepensePersonnel = id
    this.id_depensePersonnel = id;
       console.log(id);
       if(type === 'p'){
        this.personnel = true;
        this.local = false;
        this.vehicule = false;
      }
      if(type === 'v'){
        this.vehicule = true;
        this.personnel = false;
        this.local = false;
      }
      if(type === 'l'){
        this.local = true;
        this.vehicule = false;
        this.personnel = false;
      }
       this.dataService.getDepence(id).subscribe(data=>{
         this.form.patchValue({
          id_categorie: JSON.parse(data).categorie_depence_id,
          id_employe: JSON.parse(data).employe_id,
          date: JSON.parse(data).date,
          montant: JSON.parse(data).montant,
          remarque: JSON.parse(data).remarques,
         });
         this.action = 'Modifier';
         this.is_update = true;
         $('#hidden').css('display', 'block');
       })
  }
  updatev(id:any){
    this.is_update = true;
    this.action = 'Modifier';
    this.idDepenseVehicule = id;
    this.modifier = 'mv';
    this.is_add = true;
    this.vehicule = true;
    this.personnel = false;
    this.local = false;
    this.categories = this.dataVehicule;
    console.log(this.vehicule);
    this.store.select(state=>state.categorieDepense.depenseCategorie.categorieVehicule).subscribe(cv=>{
      this.categories = cv;
    })
    $('#hidden').css('display', 'block');
    this.dataService.depenceVehicule(id).subscribe(data =>{
      this.vh = data;
      this.form.patchValue({
        id_categorie: this.vh.categorie_depence_id,
        id_vehicule: this.vh.vehicule_id,
        date: this.vh.date,
        montant: this.vh.montant,
        remarque: this.vh.remarques,
       });
    })
    
  }

  setInput(id:any, type:any){
    // select categories local
    this.store.select(state=>state.categorieDepense.depenseCategorie.categoriePersonnel).subscribe(cpersonnel=>{
      this.categories = cpersonnel;
    });
    this.is_add = false;
    if(type === 'p'){
      this.personnel = true;
      this.local = false;
      this.vehicule = false;
    }
    if(type === 'v'){
      this.vehicule = true;
      this.personnel = false;
      this.local = false;
    }
    if(type === 'l'){
      this.local = true;
      this.vehicule = false;
      this.personnel = false;
    }
    this.dataService.getDepence(id).subscribe(data=>{
      this.form.patchValue({
       id_categorie: JSON.parse(data).categorie_depence_id,
       id_employe: JSON.parse(data).employe_id,
       date: JSON.parse(data).date,
       montant: JSON.parse(data).montant,
       remarque: JSON.parse(data).remarques,
      });
      $('#hidden').css('display', 'block');
    })
  }

  setInputv(id:any){
    this.is_add = false;
    this.vehicule = true;
    this.personnel = false;
    this.local = false;
    this.categories = this.dataVehicule;
    this.store.select(state=>state.categorieDepense.depenseCategorie.categorieVehicule).subscribe(cv=>{
      this.categories = cv;
    })
    console.log(this.vehicule);
    $('#hidden').css('display', 'block');
    this.dataService.depenceVehicule(id).subscribe(data =>{
      this.vh = data;
      this.form.patchValue({
        id_categorie: this.vh.categorie_depence_id,
        id_vehicule: this.vh.vehicule_id,
        date: this.vh.date,
        montant: this.vh.montant,
        remarque: this.vh.remarques,
       });
    })
  }
  detail(id:any){
      this.is_add = false;
      this.local = true;
      this.vehicule = false;
      this.personnel = false;
      this.categories = this.dataLocal;
      console.log(this.local);
      // select categories local
      this.store.select(state=>state.categorieDepense.depenseCategorie.categorieLocal).subscribe(dlocal=>{
        this.categories = dlocal;console.log("depense local");
        console.log(dlocal);
      });
      $('#hidden').css('display', 'block');
      this.dataService.getDepenseLocal(id).subscribe(data =>{
        this.dataDetail = data;
        console.log("999999999999");
        console.log(this.dataDetail);
        this.form.patchValue({
          id_categorie: this.dataDetail.categorie_depence_id,
          id_vehicule: this.dataDetail.vehicule_id,
          date: this.dataDetail.date,
          montant: this.dataDetail.montant,
          remarque: this.dataDetail.remarques,
         });
      })
     
  }
  updateL(id:any){
    this.is_update = true;
    this.idDepenseLocal = id;
    this.modifier ="ml";
    this.setTypeFunction = 'l';
    this.id_local =  id;
    console.log("id: ", id);
    this.is_add = true;
    this.local = true;
      this.vehicule = false;
      this.personnel = false;
      this.categories = this.dataLocal;
      this.action = "Modifier";
      console.log(this.local);
      $('#hidden').css('display', 'block');
      // select categories local
      this.store.select(state=>state.categorieDepense.depenseCategorie.categorieLocal).subscribe(dlocal=>{
        this.categories = dlocal;
      });
      
      this.dataService.getDepenseLocal(id).subscribe(data =>{
        this.dataDetail = data;
        this.form.patchValue({
          id_categorie: this.dataDetail.categorie_depence_id,
          date: this.dataDetail.date,
          montant: this.dataDetail.montant,
          remarque: this.dataDetail.remarques,
         });
      });
      
  }

 
  openvehicule(data:any, btn:any) {
    const modalRef = this.modalService.open(DepensevehiculemodalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.btn = btn;
  }
  openpersonnel(data:any, btn:any) {
    const modalRef = this.modalService.open(DepensepersonnelmodalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.btn = btn;
  }

  modalImprimer(){
    const modalRef = this.modalService.open(ModalImprimerDepenseComponent);
    // DATA FOR DEPENSE LOCAL
    modalRef.componentInstance.data = this.depenseLocal;
    modalRef.componentInstance.data1 = this.depenseLocal;
    modalRef.componentInstance.data2 = this.depenseLocal;
  }
}

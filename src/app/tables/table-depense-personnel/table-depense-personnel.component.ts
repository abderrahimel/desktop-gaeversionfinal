import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { DepensepersonnelmodalComponent } from 'src/app/modal/depensepersonnelmodal/depensepersonnelmodal.component';
import { ModalImprimerLocalComponent } from 'src/app/modal/modal-imprimer-local/modal-imprimer-local.component';
import { ModalImprimerPersonnelComponent } from 'src/app/modal/modal-imprimer-personnel/modal-imprimer-personnel.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { loadCategoriedepense } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { deleteDepenselocal, deleteDepensepersonnel, deleteDepensevehicule, loadDepenselocal, loadDepensepersonnel, loadDepensevehicule } from 'src/app/state/depenses/depense.actions';
import { DepenseState } from 'src/app/state/depenses/depense.state';
import { loadEmploye } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-depense-personnel',
  templateUrl: './table-depense-personnel.component.html',
  styleUrls: ['./table-depense-personnel.component.css']
})
export class TableDepensePersonnelComponent implements OnInit {
  displayedColumns: string[] = ['employe', 'categorie', 'date', 'montant', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  active = 1;
  data:any[]=[];
  message= '';
  candidat_data:any;
  dateVal = new Date();
  current_candidat:any;
  candidat_data_s:any;
  candidatsB:any;  
  candidatS:any;
  id_candidat:any;
  hidden:any = true;
  depenseLocal:any;
  dataLoad:any
  constructor(private candidatData: CandidatService,
              private _auth:AuthService,
              private router: Router,
              private modalService: NgbModal,
              private dataservice: DataService,
              private store:Store< {categorieDepense: DepenseCategorieState, depense: DepenseState, employe: EmployeState, vehicule: VehiculeState}>) { }

  ngOnInit(): void {
    // this.getDataDP()
    this.getData()
  }
  getDataDP(){ 
    this.dataservice.getDepensePersonnel(localStorage.getItem('autoEcole_id')).subscribe(dlocal=>{
      this.depenseLocal = dlocal;
      console.log(this.depenseLocal);
      this.dataSource = new MatTableDataSource(this.depenseLocal)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.depenseLocal.reduce((acc, o) => acc + Object.keys(o).length, 0)
   }) 
}
getData(){ 
  this.store.pipe(take(1)).subscribe(store=>{
    // check each state of the store for available data for this components
    // if(!store.categorieDepense.depenseCategorie.loaded){
    //   this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    // }

    // if(!store.depense.depense.local.loaded){
    //   this.store.dispatch(loadDepenselocal({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    // }
    if(!store.depense.depense.personnel.loaded){
      this.store.dispatch(loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
    // if(!store.depense.depense.vehicule.loaded){
    //   this.store.dispatch(loadDepensevehicule({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    // }
    // if(!store.employe.employe.loaded){
    //   this.store.dispatch(loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    // }
    // if(!store.vehicule.vehicule.loaded){
    //   this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
    // }
    this.store.select(state=>state.depense.depense.personnel.personnel).subscribe(dpersonnel=>{
      this.depenseLocal = dpersonnel;
      this.dataSource = new MatTableDataSource(this.depenseLocal)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.depenseLocal){
        this.n = this.depenseLocal.reduce((acc, o) => acc + Object.keys(o).length, 0)
      }
     });
  })
  // select depense local
//  this.store.select(state=>state.depense.depense.local.local).subscribe(dlocal=>{
//   this.depenseLocal = dlocal;
  
//  }) 
//  select depense vehicule
//  this.store.select(state=>state.depense.depense.vehicule.vehicule).subscribe(dvehicule=>{
//   this.data_v = dvehicule;
//  })
 // select depense personnel

//  // select employees from the store
//  this.store.select(state=>state.employe.employe.employe).subscribe(employees=>{
//   this.employees = employees
//  });
//  // select vehicules from the store
//  this.store.select(state=>state.vehicule.vehicule.vehicule).subscribe(vehicules=>{
//   this.vehicules = vehicules;
//  })

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
          this.store.dispatch(loadDepensepersonnel({idAutoEcole: localStorage.getItem('autoEcole_id')}));
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
    // this.getData();  
  }

  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  openpersonnel(data:any, btn:any) {
    const modalRef = this.modalService.open(DepensepersonnelmodalComponent);
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.btn = btn;
  }
  modalImprimer(){
    const modalRef = this.modalService.open(ModalImprimerPersonnelComponent);
    modalRef.componentInstance.data = this.depenseLocal;
  }

}

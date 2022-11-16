import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TranslationService } from 'src/app/services/translation.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { VehiculeState } from 'src/app/state/vehicule/vehicule.state';
import { take } from 'rxjs/operators';
import { loadViheculeAction } from 'src/app/state/vehicule/vehicule.actions';
import { Observable } from 'rxjs';
import { getVehicules } from 'src/app/state/vehicule/vehicule.selector';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehiculeModalComponent } from 'src/app/modal/vehicule-modal/vehicule-modal.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VehiculeDetailModelComponent } from 'src/app/modal/vehicule-detail-model/vehicule-detail-model.component';

@Component({
  selector: 'app-vehicule',
  templateUrl: './vehicule.component.html',
  styleUrls: ['./vehicule.component.css']
})
export class VehiculeComponent implements OnInit { // matricule  type  marque modele
  displayedColumns: string[] = ['matricule', 'type', 'marque', 'modele', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  vehiculesData:any;
  vehiculesData$:Observable<any>;
  dateVal = new Date();
  constructor(private translateService:TranslationService,
              private dataService: DataService, 
              private log: AuthService,
              private store:Store<{vehicule: VehiculeState}>,
              private modalService: NgbModal,
              ) { 
                this.vehiculesData$ = this.store.select(getVehicules);
              }

  ngOnInit(): void {
  //  this.getVehicules();
   this.getData();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.vehicule.vehicule.loaded){
        this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
      }
    })
    this.store.select(state=>state.vehicule.vehicule.vehicule).subscribe(vehicule =>{
      this.vehiculesData = vehicule
      this.dataSource = new MatTableDataSource(this.vehiculesData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.vehiculesData){
        this.n = this.vehiculesData.reduce((acc, o) => acc + Object.keys(o).length, 0);
      }
    })
  }
  getVehicules(){
    this.dataService.getVehicules(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.vehiculesData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.vehiculesData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.vehiculesData.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  deleteVehicule(id:any){
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
        this.dataService.deleteVehicule(id).subscribe(data =>{
          this.store.dispatch(loadViheculeAction({id: localStorage.getItem('autoEcole_id')}));
        })  
      }
    })
       
  }
  open( btn:any, data:any) {
    const modalRef = this.modalService.open(VehiculeDetailModelComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
  open1(btn:any, data:any){
    // 
    const modalRef = this.modalService.open(VehiculeModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}

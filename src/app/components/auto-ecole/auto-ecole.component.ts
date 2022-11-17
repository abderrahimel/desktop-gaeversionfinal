import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DetailautoecolemodalComponent } from 'src/app/modal/detailautoecolemodal/detailautoecolemodal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadautoecoles } from 'src/app/state/autoecoles/autoecoles.actions';
import { AutoecolesState } from 'src/app/state/autoecoles/autoecoles.state';
import { loadSuperAdminData } from 'src/app/state/dataSuperAdmin/dataSuperAdmin.actions';
import { DataSuperAdminState } from 'src/app/state/dataSuperAdmin/dataSuperAdmin.state';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auto-ecole',
  templateUrl: './auto-ecole.component.html',
  styleUrls: ['./auto-ecole.component.css']
})
export class AutoEcoleComponent implements OnInit { 
  @ViewChild('Imprimer') Imprimer;
  displayedColumns: string[] = ['nom_auto_ecole', 'nom_responsable', 'etat', 'telephone', 'tel_responsable', 'pays', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  tables:any = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataLoad:any;

 constructor(private dataService: DataService,
              private   modalService: NgbModal,
              private store: Store<{autoecoles: AutoecolesState,dataSuperAdmin: DataSuperAdminState}>,
              private auth:AuthService
  ) { }

 ngOnInit(): void {
  this.auth.authStatus.subscribe(value=>{
    if(value){
      this.getAutoEcoles();
    }
  })
     }
 getAllAutoEcole(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.autoecoles.autoecoles.loaded){
      this.store.dispatch(loadautoecoles());
    }
  })
  this.store.select(state=>state.autoecoles.autoecoles.autoecoles).subscribe(autoecoles=>{
    this.dataLoad = autoecoles;
  })
 }
 getAutoEcoles(){
  this.dataService.getAllAutoEcole().subscribe(data=>{
    this.dataLoad = data;
    this.dataSource = new MatTableDataSource(this.dataLoad)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
 }
 
 applyFilter(event:any){
  let value = event.target.value
  this.dataSource.filter = value.trim().toLowerCase()
}
 deletAutoEcole(id:any){
   Swal.fire({
    title: 'confirmation',
    text: "Vous voulez vraiment confirmer la suppression!",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui, supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.deletAutoEcole(id).subscribe(data =>{
        this.store.dispatch(loadautoecoles());
        this.store.dispatch(loadSuperAdminData());
      })
    }
  })
   

 }
 approver(id:any){
   Swal.fire({
    title: 'confirmation',
    text: "Vous voulez vraiment approuver cet auto-école",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui , approuver'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.approver(id).subscribe(data=>{
        this.store.dispatch(loadautoecoles());
        this.store.dispatch(loadSuperAdminData());
       })
    }
  })
 
 }

 desapprover(id:any){
  Swal.fire({
    title: 'confirmation',
    text: "voulez vraiment désapprouver cet auto-école?",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui , désapprouver'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.desapprover(id).subscribe(data=>{
        this.store.dispatch(loadautoecoles());
        this.store.dispatch(loadSuperAdminData());
       })
    }
  })

}
open(data:any, btn:any){
  const modalRef = this.modalService.open(DetailautoecolemodalComponent);
  modalRef.componentInstance.btn = btn;
  modalRef.componentInstance.data = data;
}

}

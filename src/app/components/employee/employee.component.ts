import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deleteEmployeById, loadEmploye, setloadingToFalse } from 'src/app/state/employe/employe.action';
import { EmployeState } from 'src/app/state/employe/employe.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeModalComponent } from 'src/app/modal/employee-modal/employee-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit { 
  displayedColumns: string[] = ['cin', 'employee', 'telephone', 'type', 'date_embauche', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data:any[]=[];
  dateVal = new Date();
  dataemployee:any;
  constructor(private dataService: DataService,
              private store:Store<{employe: EmployeState}>,
              private modalService: NgbModal,

    ){}

  ngOnInit(): void {
    // this.getEmployees();
    this.reloadData();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
 reloadData(){
    let ecole_id = localStorage.getItem('autoEcole_id');
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.employe.employe.loaded){
        console.log("the state of the employe in the store is empty, load data to store");
        this.store.dispatch(loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      // select the employe from the store
    this.store.select(state=>state.employe.employe.employe).subscribe(employes =>{
      this.dataemployee = employes;
      this.dataSource = new MatTableDataSource(this.dataemployee)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.dataemployee){
        this.n = this.dataemployee.reduce((acc, o) => acc + Object.keys(o).length, 0);
      }
    })
    })
    
 }
 getEmployees(){
  this.dataService.getEmploye(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.dataemployee = JSON.parse(data);
    console.log(this.dataemployee);
    this.dataSource = new MatTableDataSource(this.dataemployee)

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.n = this.dataemployee.reduce((acc, o) => acc + Object.keys(o).length, 0)
  })
 }
  deletEmploye(id:any){
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
        this.store.dispatch(deleteEmployeById({idEmploye: id}));
        this.store.dispatch(loadEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(EmployeeModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
    this.store.dispatch(setloadingToFalse())
  }
}
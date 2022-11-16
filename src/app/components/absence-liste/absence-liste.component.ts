import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deleteAbsenceById, loadAbsence } from 'src/app/state/absence/absence.actions';
import { AbsenceState } from 'src/app/state/absence/absence.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbsenceMoniteurModalComponent } from 'src/app/modal/absence-moniteur-modal/absence-moniteur-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbsenceEmployeState } from 'src/app/state/absenceEmploye/absenceEmploye.state';
import { deleteabsenceEmployeById, loadabsenceEmploye, setLoadingToFalse } from 'src/app/state/absenceEmploye/absenceEmploye.actions';
@Component({
  selector: 'app-absence-liste',
  templateUrl: './absence-liste.component.html',
  styleUrls: ['./absence-liste.component.css']
})
export class AbsenceListeComponent implements OnInit { // 
    // 
  displayedColumns: string[] = ['employe', 'type_absence', 'date_debut', 'date_fin','actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  absenceData:any = [];
  constructor(private dataService:DataService,
              private store:Store<{absenceEmploye: AbsenceEmployeState}>,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    // this.getAbsenceEmpl();
    this.loadAbsence();
  }

  loadAbsence(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.absenceEmploye.absenceEmploye.loaded){
        this.store.dispatch(loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.absenceEmploye.absenceEmploye.absenceEmploye).subscribe(absenceEmploye=>{
        this.absenceData = absenceEmploye;
        this.dataSource = new MatTableDataSource(this.absenceData)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.absenceData){
          this.n = this.absenceData.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
    })
    
  }
  getAbsenceEmpl(){
    this.dataService.getAbsence(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.absenceData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.absenceData)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.absenceData.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  deleteAbsence(id:any){
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
        this.store.dispatch(deleteabsenceEmployeById({id: id}));
        this.store.dispatch(loadabsenceEmploye({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })

  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(AbsenceMoniteurModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
    this.store.dispatch(setLoadingToFalse());
  }
}

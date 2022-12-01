import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AbsenceMoniteurModalComponent } from 'src/app/modal/absence-moniteur-modal/absence-moniteur-modal.component';
import { AddAbsenceMoniteurComponent } from 'src/app/modal/add-absence-moniteur/add-absence-moniteur.component';
import { UpdateMoniteurAbsenceModalComponent } from 'src/app/modal/update-moniteur-theorique-modal/update-moniteur-absence-modal.component';
import { DataService } from 'src/app/services/data.service';
import { deleteAbsenceById, loadAbsence, loadAbsenceMoniteurPratique, loadedAbsence } from 'src/app/state/absence/absence.actions';
import { AbsenceState } from 'src/app/state/absence/absence.state';
import { AbsenceMoniteurPratiqueState } from 'src/app/state/absenceMoniteurPrarique/absenceMoniteurPratique.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-absence-moniteur',
  templateUrl: './absence-moniteur.component.html',
  styleUrls: ['./absence-moniteur.component.css']
})
export class AbsenceMoniteurComponent implements OnInit { // 
  displayedColumns: string[] = ['moniteur', 'type_absence', 'date_debut', 'date_fin', 'actions']; 
  displayedColumns1: string[] = ['moniteur', 'type_absence', 'date_debut', 'date_fin', 'actions']; 
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortsecond') empTbSortsecond = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator;
  dataSource = new MatTableDataSource();    
  dataSource1 = new MatTableDataSource();    
  dateVal = new Date();
  absencetheorique:any; 
  absencepratique:any ;
  constructor(private dataService:DataService,
              private store:Store<{absence:AbsenceState, absenceMoniteurPratique: AbsenceMoniteurPratiqueState}>,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getData()
    this.getAbsencesMoniteurPratique();
  }
  applyFilter(event:any){
    let value = event.target.value
    if(value){
      this.dataSource.filter = value.trim().toLowerCase()
    }
  }
  applyFilter1(event:any){
    let value = event.target.value
    if(value){
      this.dataSource1.filter = value.trim().toLowerCase()
    }
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.absence.absence.loaded){
        this.store.dispatch(loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.absence.absence.absence).subscribe(absence=>{
        this.absencetheorique = absence
        if(this.absencetheorique){
          this.dataSource = new MatTableDataSource(this.absencetheorique)
          this.dataSource.paginator = this.paginatorFirst;
          this.dataSource.sort = this.empTbSort;
        }
      })
    })   
  }


  getAbsencesMoniteurPratique(){ // loadAbsenceMoniteurPratique
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.absenceMoniteurPratique.absenceMoniteurPratique.loaded){
        this.store.dispatch(loadAbsenceMoniteurPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.absenceMoniteurPratique.absenceMoniteurPratique.absenceMoniteurPratique).subscribe(absence=>{
        this.absencepratique = absence;
        if(this.absencepratique){
          this.dataSource1 = new MatTableDataSource(this.absencepratique);
          this.dataSource1.paginator = this.paginatorSecond;
          this.dataSource1.sort = this.empTbSortsecond;
        }
        
      })
    })
  }
  loadAbsence(){
    //  load data of absence moniteur theorique
      this.dataService.getAbsenceMoniteurTheorique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.absencetheorique = JSON.parse(data);

      }); 
    //  load data of absence moniteur pratique
      this.dataService.getAbsenceMoniteurPratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.absencepratique = JSON.parse(data)
      });
  }
  deleteAbsence(data:any){
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
        
        if(data?.moniteur?.type === 'Moniteur Théorique'){
          // delet absence theorique
          this.dataService.deleteAbsenceTheorique(data?.id).subscribe(
            data=>{},
            error =>{}
            )
        }else{
          // delet absence pratique
          
          this.dataService.deleteAbsencePratique(data?.id).subscribe(
            data=>{},
            error =>{})
        }
        this.store.dispatch(loadAbsence({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })

  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(UpdateMoniteurAbsenceModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
  open1(type:any) {
    const modalRef = this.modalService.open(AddAbsenceMoniteurComponent);
    modalRef.componentInstance.type = type;
  }
}

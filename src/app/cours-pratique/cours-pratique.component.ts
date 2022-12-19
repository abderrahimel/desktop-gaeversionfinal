import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StateObservable, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CoursTheoriques } from '../classes/cours-theoriques';
import { CandidatService } from '../services/candidat.service';
import { CandidatState } from '../state/candidat/candidat.state';
import { deleteCourPratiqueById, loadCourPratique } from '../state/cours/cour.actions';
import { CourState } from '../state/cours/cour.state';
import { MoniteurState } from '../state/moniteur/moniteur.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourPratiqueModalComponent } from '../modal/cour-pratique-modal/cour-pratique-modal.component';
import { PresencePratiqueModalComponent } from '../modal/presence-pratique-modal/presence-pratique-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { candidatStart } from '../state/candidat/candidat.actions';
import { presencecourState } from '../state/presencecours/presencecours.state';
import { loadPresencecourPratique } from '../state/presencecours/presencecours.actions';
declare var $;

@Component({
  selector: 'app-cours-pratique',
  templateUrl: './cours-pratique.component.html',
  styleUrls: ['./cours-pratique.component.css']
})
export class CoursPratiqueComponent implements OnInit { // 
  displayedColumns: string[] = ['date', 'heure', 'type', 'permis', 'moniteurp', 'vehicule','candidats', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  dateVal = new Date();
  pratique_data:any;
  dataTable:any;
  cours_pratique_data:any;
  cours_pratique:any;
  datamoniteurP:any;
  cours:any = [];
  candidatB:any;
  candidatsB:any;
  candidatS:any;
  var:any = '';
  moniteurP:any;
  candidat_data:any;
  constructor(private dataservice:DataService,
              private candidatData: CandidatService,
              private router: Router,
              private store:Store<{candidat:CandidatState, cour:CourState, moniteur:MoniteurState, presencecour:presencecourState}>,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
      // this.getCoursPtratique();
      this.loadCouPratique();
      this.currentData();
  }

loadCouPratique(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.cour.cours.coursPratique.loaded){
      this.store.dispatch(loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
    }
  })
  this.store.select(state=>state.cour.cours.coursPratique.coursPratique).subscribe(cp=>{
      this.cours_pratique = cp;
      this.dataSource = new MatTableDataSource(this.cours_pratique)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.cours_pratique){
        this.n = this.cours_pratique.reduce((acc, o) => acc + Object.keys(o).length, 0)
      }
  })
}  
currentData()
{
  this.store.pipe(take(1)).subscribe(store=>{
   if(!store.candidat.candidat.loaded){
     this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
   }
  })
 
  // select candidat from the store 
  this.store.select(state=>state.candidat.candidat).subscribe(candidats=>{
      this.candidatsB = candidats.candidatBasic;
      this.candidatS =  candidats.candidatSupplementaire;
  })
  this.dataservice.getMoniteurP(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.datamoniteurP = data;
});
}

getCoursPtratique(){
  this.dataservice.getCourPratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.cours_pratique = JSON.parse( data);
      this.dataSource = new MatTableDataSource(this.cours_pratique)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.cours_pratique.reduce((acc, o) => acc + Object.keys(o).length, 0)
  })
}
applyFilter(event:any){
  let value = event.target.value
  this.dataSource.filter = value.trim().toLowerCase()
}
  deleteCouP(id:any){
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
        this.store.dispatch(deleteCourPratiqueById({id: id}));
        this.store.dispatch(loadCourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        this.store.dispatch(loadPresencecourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(CourPratiqueModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
open1( data:any) {
    const modalRef = this.modalService.open(PresencePratiqueModalComponent);
    modalRef.componentInstance.data = data;
  }
}
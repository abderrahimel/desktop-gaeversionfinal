import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { CourState } from 'src/app/state/cours/cour.state';
import { take} from 'rxjs/operators';
import { deleteCourTheoriqueById, loadCourTheorique } from 'src/app/state/cours/cour.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourTheoriqueModalComponent } from 'src/app/modal/cour-theorique-modal/cour-theorique-modal.component';
import { PresenceTheoriquemodalComponent } from 'src/app/modal/presence-theoriquemodal/presence-theoriquemodal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
import { loadPresencecourTheorique } from 'src/app/state/presencecours/presencecours.actions';
import * as _ from 'lodash';
@Component({
  selector: 'app-plan-theorique',
  templateUrl: './plan-theorique.component.html',
  styleUrls: ['./plan-theorique.component.css']
})
export class PlanTheoriqueComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heure', 'type', 'permis', 'moniteurp','candidats', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  cours_theorique_data:any;
  cours_theorique:any = [];
  cours:any = [];
  candidat:any;
  list_candidat:any = [];
  tail:any;
  candidat_data:any;
  list:any = [];
  var:any = '';
  strings:any;
  candidatsB:any; 
  candidatS:any;
  datamoniteurT:any;
  moniteurTh:any;
  submitted:any = false;
  id_auto_ecole:any;
  data_cour:any = []
  form = new FormGroup({
    date: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
    permis: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    moniteur_theorique_id: new FormControl('', Validators.required),
    candidat: new FormControl('', Validators.required),
  })
  list_moniteur_theorique:any = [];
  
  constructor(private dataservice:DataService,
              private candidatData: CandidatService,
              private router: Router,
              private store: Store<{cour: CourState, moniteur:MoniteurState, candidat: CandidatState, presencecour:presencecourState}>,
              private modalService: NgbModal,
              private dataService:DataService
    ) { }

  ngOnInit(): void { 
    this.id_auto_ecole = localStorage.getItem('autoEcole_id');
    this.getMoniteursT();
    this.currentData(); 
    // this.getCoursTheorique(); 
  }
  getMoniteursT(){
    this.dataService.getMoniteurT(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.datamoniteurT = data;
    })
  }
  currentData()
   {
     this.store.pipe(take(1)).subscribe(store=>{
      if(!store.cour.cours.coursTheorique.loaded){
        this.store.dispatch(loadCourTheorique({idAutoEcole: this.id_auto_ecole}))
      }
      if(!store.moniteur.moniteur.moniteurTheorique.loaded){
        this.store.dispatch(loadMoniteurT({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.candidat.candidat.loaded){
        this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
     })
     // select cour from the store 
     this.store.select(state=>state.cour.cours.coursTheorique.coursTheorique).subscribe(court=>{
      this.cours_theorique = court;console.log(court);
      this.dataSource = new MatTableDataSource(this.cours_theorique)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.cours_theorique){
        this.n = this.cours_theorique.reduce((acc, o) => acc + Object.keys(o).length, 0)
      }
     })
     // select moniteur theorique
     this.store.select(state=>state.moniteur.moniteur.moniteurTheorique.moniteurTheorique).subscribe(mth=>{
      this.moniteurTh = mth;
     })
     // select candidat from the store 
     this.store.select(state=>state.candidat.candidat).subscribe(candidats=>{
         this.candidatsB = candidats.candidatBasic;
         this.candidatS =  candidats.candidatSupplementaire;
     })
   }
getCoursTheorique(){
     this.dataservice.getCourTheorique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.cours_theorique = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.cours_theorique)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.cours_theorique.reduce((acc, o) => acc + Object.keys(o).length, 0)
  })
}
   applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
   // filter cours by categorie
  onChange(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.cours_theorique);
    }else{
        let filterData = _.filter(this.cours_theorique, (item)=>{
          return item.permis.toLowerCase() == e.target.value.toLowerCase()
        })

        this.dataSource = new MatTableDataSource(filterData);

    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filter cours by candidat
  onChangeCandidat(e:any){
    // let array1 = [3, 1, 2, 4, 6, 5];
    // console.log(array1.includes(Number(e.target.value)));
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.cours_theorique);
    }else{
        let filterData = _.filter(this.cours_theorique, (item)=>{
          return item.candidat.includes(Number(e.target.value));
        })
        this.dataSource = new MatTableDataSource(filterData);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filter cours by moniteur
  onChangeMoniteur(e:any){
    // id moniteur
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.cours_theorique);
    }else{
        let filterData = _.filter(this.cours_theorique, (item)=>{
          return item.moniteur_theorique_id == e.target.value
        })
        this.dataSource = new MatTableDataSource(filterData);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
   candidatList(list:any){
     this.candidatData.getListCandidat(list).subscribe(data=>{
       this.list = data;
    });
    
  }

  deleteCourTheorique(id:any, event:any){
    Swal.fire({
      title: 'confirmation',
      text:  "Vous voulez vraiment confirmer la suppression !",
      icon:  'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(deleteCourTheoriqueById({id: id}));
        this.cours_theorique = [];
        this.store.dispatch(loadCourTheorique({idAutoEcole: this.id_auto_ecole}));
        this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
      
  }
  open( btn:any, data:any) {
    const modalRef = this.modalService.open(CourTheoriqueModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
  open1(data:any) {
    const modalRef = this.modalService.open(PresenceTheoriquemodalComponent);
    modalRef.componentInstance.data = data;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { CourState } from 'src/app/state/cours/cour.state';
import { loadMoniteurT } from 'src/app/state/moniteur/moniteur.actions';
import { MoniteurState } from 'src/app/state/moniteur/moniteur.state';
import { loadPresencecourTheorique, removePresenceById } from 'src/app/state/presencecours/presencecours.actions';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {
  displayedColumns: string[] = ['date', 'heure', 'type', 'categorie', 'moniteur', 'candidats', 'actions'];
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  paiement_data:any;   
  idCandidat:any;
  totalPaiment:any = 0;
  restPaiment:any;
  paiment:any;
  candidatsB:any; 
  candidatS:any;
  moniteur:any;
  moniteurTheorique:any;
  candidats:any;
  fromCandidats:any = [];
  fromMoniteurs:any = [];
  presence:any ;
  presenceT:any;
  presenceData:any ;
  dataPaimentCandidat:any;
  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router:Router,
              private candidatService: CandidatService,
              private store:Store<{cour:CourState, candidat:CandidatState, moniteur:MoniteurState, presencecour:presencecourState}>
    ) { }

  ngOnInit(): void {
     this.getData();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  currentData(){
    this.idCandidat = Number(this.route.snapshot.paramMap.get('id'));
    let auto_ecole_id = localStorage.getItem('autoEcole_id');
    this.getData();
    if(this.router.url === '/listes-presencesC'){
      this.paiment = true;
    }else{
      this.paiment = false;
    }
  
  }
 
  getData(){
       this.store.pipe(take(1)).subscribe(store=>{   
        if(!store.presencecour.presencecourstheorique.loaded){
          this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
        if(!store.candidat.candidat.loaded){
          this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
       })
       this.store.select(state=>state.presencecour.presencecourstheorique.presencecourstheorique).subscribe(ptheorique=>{
        this.presence = ptheorique;
        this.dataSource = new MatTableDataSource(this.presence)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       })
        // select candidat from the store 
     this.store.select(state=>state.candidat.candidat).subscribe(candidats=>{
      this.candidatsB = candidats.candidatBasic;
      this.candidatS =  candidats.candidatSupplementaire;
  })
  }

  getpresences(){
    this.dataService.getPresenceCourTheorique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.presence = JSON.parse(data);
      this.presence.map(p=>{
        for(let i=0; i<p.candidats.split(',').length;i++){
          if(!this.fromCandidats.includes(p.candidats.split(',')[i])){
            this.fromCandidats.push(p.candidats.split(',')[i]);
          }
        }
        // moniteurs 
        if(!this.fromMoniteurs.includes(p.moniteur) && p?.moniteur != undefined && p?.moniteur != null){
          this.fromMoniteurs.push(p.moniteur)
        }
      })
      this.dataSource = new MatTableDataSource(this.presence)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deletepresence(id:any){
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
        this.store.dispatch(removePresenceById({id: id}));
        this.store.dispatch(loadPresencecourTheorique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    
    
  }
}

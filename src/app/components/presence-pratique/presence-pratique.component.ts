import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { loadPresencecourPratique } from 'src/app/state/presencecours/presencecours.actions';
import { presencecourState } from 'src/app/state/presencecours/presencecours.state';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { CandidatState } from 'src/app/state/candidat/candidat.state';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { MoniteurPratiqueState } from 'src/app/state/moniteurPratique/moniteurPratique.state';
import { loadMoniteurP } from 'src/app/state/moniteur/moniteur.actions';

@Component({
  selector: 'app-presence-pratique',
  templateUrl: './presence-pratique.component.html',
  styleUrls: ['./presence-pratique.component.css']
})
export class PresencePratiqueComponent implements OnInit { // 
  displayedColumns: string[] = ['date', 'heure', 'categorie', 'moniteur', 'matricule', 'candidats', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  paiement_data:any;   
  idCandidat:any;
  totalPaiment:any = 0;
  restPaiment:any;
  moniteursPratique:any;
  paiment:any;
  candidatsB:any;
  candidatS:any;
  moniteur:any;
  presence:any = [];
  presenceP:any;
  fromMoniteur:any = []
  fromCandidat:any = []
  presenceData:any ;
  dataPaimentCandidat:any;
  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router:Router,
              private candidatService: CandidatService,
              private store:Store<{presencecour:presencecourState,candidat:CandidatState,moniteurPratique: MoniteurPratiqueState}>
    ) { }

  ngOnInit(): void {
   this.getpresences();
   this.getMoniteurPratique();
  }

  getpresences(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.presencecour.presencecourspratique.loaded){
        this.store.dispatch(loadPresencecourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.candidat.candidat.loaded){
        this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.presencecour.presencecourspratique.presencecourspratique).subscribe(cpratique=>{
        this.presenceP = cpratique;
        if(this.presenceP){
          this.presenceP.map(p=>{
            for(let i=0; i<p.candidats.split(',').length;i++){
              if(!this.fromCandidat.includes(p.candidats.split(',')[i])){
                this.fromCandidat.push(p.candidats.split(',')[i]);
              }
            }
            // moniteurs 
            if(!this.fromMoniteur.includes(p.moniteur) && p?.moniteur != undefined && p?.moniteur != null){
              this.fromMoniteur.push(p.moniteur)
            }
          })
          this.dataSource = new MatTableDataSource(this.presenceP)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.n = this.presenceP.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
       // select candidat from the store 
     this.store.select(state=>state.candidat.candidat).subscribe(candidats=>{
      this.candidatsB = candidats.candidatBasic;
      this.candidatS =  candidats.candidatSupplementaire;})
    })

  }
  getMoniteurPratique(){
     // load moniteurs theorique
     this.store.pipe(take(1)).subscribe(store=>{
      //load moniteurs pratique
      if(!store.moniteurPratique.moniteurPratique.loaded){
        this.store.dispatch(loadMoniteurP({idAutoEcole:localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.moniteurPratique.moniteurPratique.moniteurPratique).subscribe(moniteurs=>{
          this.moniteursPratique = moniteurs;
      })
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  // filter by categorie
  onChange(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.presenceP);
    }else{
        let filterData = _.filter(this.presenceP, (item)=>{
          return item.categorie.toLowerCase() == e.target.value.toLowerCase()
        })
  
        this.dataSource = new MatTableDataSource(filterData);
  
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    // filter  by candidat
    onChangeCandidat(e:any){
      if(e.target.value === ''){
        this.dataSource = new MatTableDataSource(this.presenceP);
      }else{
          let filterData = _.filter(this.presenceP, (item)=>{
            return item.candidat.includes(Number(e.target.value));
          })
          this.dataSource = new MatTableDataSource(filterData);
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    // filter  by moniteur
  onChangeMoniteur(e:any){
    // id moniteur
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.presenceP);
    }else{
        let filterData = _.filter(this.presenceP, (item)=>{
          return Number(item.moniteur_pratique_id) === Number(e.target.value);
        })
        this.dataSource = new MatTableDataSource(filterData);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  // filter  by date
  onchangeInput3(e:any){
    if(e.target.value === ''){
        this.dataSource = new MatTableDataSource(this.presenceP);
    }else{
        let filterData = _.filter(this.presenceP, (item)=>{
          return item.date.toLowerCase() == e.target.value.toLowerCase()
        })
        this.dataSource = new MatTableDataSource(filterData);
    }
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
        this.dataService.deletPresenceCourP(id).subscribe(data => {
          this.presence = [];
          this.getpresences()
        }, error => this.handleError(error));
      }
    })
    
  }

  handleError(error:any){
    console.log(error);
  }
}

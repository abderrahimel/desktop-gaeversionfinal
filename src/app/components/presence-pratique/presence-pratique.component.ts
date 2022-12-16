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
  paiment:any;
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
              private store:Store<{presencecour:presencecourState}>
    ) { }

  ngOnInit(): void {
   this.getpresences()
  }

  getpresences(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.presencecour.presencecourspratique.loaded){
        this.store.dispatch(loadPresencecourPratique({idAutoEcole: localStorage.getItem('autoEcole_id')}));
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
    })
    // this.dataService.getPresenceCourPratique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    //   this.presenceP = data;
    //   this.presenceP.map(p=>{
    //     for(let i=0; i<p.candidats.split(',').length;i++){
    //       if(!this.fromCandidat.includes(p.candidats.split(',')[i])){
    //         this.fromCandidat.push(p.candidats.split(',')[i]);
    //       }
    //     }
    //     // moniteurs 
    //     if(!this.fromMoniteur.includes(p.moniteur) && p?.moniteur != undefined && p?.moniteur != null){
    //       this.fromMoniteur.push(p.moniteur)
    //     }
    //   })
    //   this.dataSource = new MatTableDataSource(this.presenceP)
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.n = this.presenceP.reduce((acc, o) => acc + Object.keys(o).length, 0)
    // })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
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
          console.log("presence cours pratique deleted");
          console.log(data);
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import { activehistoriquecandidat, loadhistoriquecandidat, removehistoriquecandidatById } from 'src/app/state/historiquecandidat/historiquecandidat.actions';
import { historiquecandidatState } from 'src/app/state/historiquecandidat/historiquecandidat.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit { // cin numero_contrat  nom_fr date_inscription categorie
  displayedColumns: string[] = ['cin', 'numero_contrat', 'nom', 'date_inscription', 'categorie','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataLoad:any;
  candidat_data_historique:any;
  constructor(private candidatData: CandidatService,
                      private candidatService:CandidatService,
                      private router: Router,
                      private store:Store<{historiquecandidat: historiquecandidatState}>
    ) { }
  ngOnInit(): void {
    // this.currentData();
    this.getHistoriqueCandidat();
  }
  currentData(){
    let id_autoEcole = localStorage.getItem('autoEcole_id');
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.historiquecandidat.historiquecandidat.loaded){
        this.store.dispatch(loadhistoriquecandidat({idAutoEcole: id_autoEcole}));
      }
    });
    this.store.select(state=>state.historiquecandidat.historiquecandidat.historiquecandidat).subscribe(hc=>{
      this.candidat_data_historique = hc;
    })
  }
  handlerror(error:any){
      console.log(error);
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getHistoriqueCandidat(){
    this.candidatService.getCandidatHistorique(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataLoad = data.filter(candidat => candidat.actif != 1);
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })   
  }
  activerCandidat(id:any, e:any){
    e.preventDefault();
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer activation!",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui , activer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(activehistoriquecandidat({id: id}));
        this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.getHistoriqueCandidat();
    })
  }
  deleteCandidat(id:any, e:any){
    e.preventDefault();
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
        this.store.dispatch(removehistoriquecandidatById({id: id}));
      }
      this.getHistoriqueCandidat();
    })
    
  }
}

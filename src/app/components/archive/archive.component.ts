import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CandidatService } from 'src/app/services/candidat.service';
import { loadarchivecandidat, recuperarchivecandidat } from 'src/app/state/archivecandidat/archivecandidat.actions';
import { archivecandidatState } from 'src/app/state/archivecandidat/archivecandidat.state';
import { candidatStart } from 'src/app/state/candidat/candidat.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'numero_contrat', 'nom', 'date_inscription', 'categorie','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  candidat_data_archive:any;
  constructor(private candidatData: CandidatService,
              private router: Router,
              private store: Store<{archivecandidat: archivecandidatState}>,
              private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.currentData();
      }
     })

  }
  currentData(){
    let idAutoEcole = localStorage.getItem('autoEcole_id');
    this.store.pipe(take(1)).subscribe(store =>{
        if(!store.archivecandidat.archivecandidat.loaded){
          this.store.dispatch(loadarchivecandidat({idAutoEcole: idAutoEcole}));
        }
     });
     this.store.select(state=>state.archivecandidat.archivecandidat.archivecandidat).subscribe(archiveCandidat=>{
          this.candidat_data_archive = archiveCandidat;
          this.dataSource = new MatTableDataSource(this.candidat_data_archive)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
     });
   
  }
  applyFilter(event:any){
    let value = event.target.value
    if(value){
      this.dataSource.filter = value.trim().toLowerCase()
    }
  }
  getArchiveCandidat(){
    this.candidatData.getarchivecandidat(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidat_data_archive = data;
      this.dataSource = new MatTableDataSource(this.candidat_data_archive)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })   
  }
  recuperer(id:any, e:any){
      Swal.fire({
        title: 'confirmation',
        text: "Vous voulez vraiment recupérer cet candidat!",
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, recupérer'
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(recuperarchivecandidat({id: id}));
          this.store.dispatch(candidatStart({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
        this.currentData();
      })
  }
}

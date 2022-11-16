import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { loadcoursSupplementaire } from 'src/app/state/coursSupplementaire/coursSupplementaire.actions';
import { CoursRecetteState } from 'src/app/state/coursSupplementaire/coursSupplementaire.state';
import { loadproduitCandidat } from 'src/app/state/produitCandidat/produitCandidat.actions';
import { ProduitCandidatState } from 'src/app/state/produitCandidat/produitCandidat.state';

@Component({
  selector: 'app-table-recette-generale',
  templateUrl: './table-recette-generale.component.html',
  styleUrls: ['./table-recette-generale.component.css']
})
export class TableRecetteGeneraleComponent implements OnInit {
  displayedColumns: string[] = ['categorie', 'moyen', 'note_generale','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadData:any;
  supplementaire:any;
  permis:any;
  constructor(private dataService: DataService,
    private store:Store<{produitCandidat: ProduitCandidatState, coursRecette: CoursRecetteState}>) { }

  ngOnInit(): void {
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.produitCandidat.produitCandidat.loaded){
        this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.coursRecette.coursRecette.loaded){
        this.store.dispatch(loadcoursSupplementaire({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    });
    this.store.select(state=>state.produitCandidat.produitCandidat.produitCandidat).subscribe(produitCandidat=>{
      this.loadData = produitCandidat;
    });
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.supplementaire = coursRecette.coursSupplementaire;
      
      this.permis = coursRecette.permis
    });

  }
}

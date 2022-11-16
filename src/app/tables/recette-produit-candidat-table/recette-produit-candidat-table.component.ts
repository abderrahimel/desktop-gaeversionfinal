import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { CoursRecetteState } from 'src/app/state/coursSupplementaire/coursSupplementaire.state';
import { loadproduitCandidat } from 'src/app/state/produitCandidat/produitCandidat.actions';
import { ProduitCandidatState } from 'src/app/state/produitCandidat/produitCandidat.state';

@Component({
  selector: 'app-recette-produit-candidat-table',
  templateUrl: './recette-produit-candidat-table.component.html',
  styleUrls: ['./recette-produit-candidat-table.component.css']
})
export class RecetteProduitCandidatTableComponent implements OnInit {
  displayedColumns: string[] = ['produit', 'quantite', 'candidat', 'categorie', 'prixTotale', 'date'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadData:any;
  idAutoEcole:any;
  dataNote:any;
  collectionSize = 20;
  page = 1;
  pageSize = 4; 
  constructor( private dataService:DataService,
              private store:Store<{produitCandidat: ProduitCandidatState, coursRecette: CoursRecetteState}>) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    // dispatch action loadproduitCandidat
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.produitCandidat.produitCandidat.loaded){
        this.store.dispatch(loadproduitCandidat({idAutoEcole: this.idAutoEcole}));
      }
      this.store.select(state=>state.produitCandidat.produitCandidat.produitCandidat).subscribe(produitCandidat=>{
        this.loadData = produitCandidat;
        this.dataSource = new MatTableDataSource(this.loadData)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.loadData){
          this.n = this.loadData.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      });
    });
 
  

  }
  getProduitData(){
    this.dataService.getProduitCandidats(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.loadData = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.loadData)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.loadData.reduce((acc, o) => { if(o){
        acc + Object.keys(o).length
      }} , 0)
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }

}

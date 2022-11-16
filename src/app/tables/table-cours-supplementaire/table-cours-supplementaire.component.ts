import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-table-cours-supplementaire',
  templateUrl: './table-cours-supplementaire.component.html',
  styleUrls: ['./table-cours-supplementaire.component.css']
})
export class TableCoursSupplementaireComponent implements OnInit,AfterViewInit { //  cour nbr_heure_pratique  candidat  categorie date montant
  displayedColumns: string[] = ['cour', 'nbr_heure_pratique', 'candidat', 'categorie', 'date', 'montant'];    
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
    this.getData();
  }
  ngAfterViewInit(): void{
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.supplementaire = coursRecette.coursSupplementaire;
      console.log(this.supplementaire);
      this.dataSource = new MatTableDataSource(this.supplementaire)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.supplementaire.reduce((acc, o) => acc + Object.keys(o).length, 0)
      this.permis = coursRecette.permis
    });
  }

  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    // dispatch action loadproduitCandidat
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.produitCandidat.produitCandidat.loaded){
        this.store.dispatch(loadproduitCandidat({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      if(!store.coursRecette.coursRecette.loaded){
        this.store.dispatch(loadcoursSupplementaire({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.coursRecette.coursRecette.coursSupplementaire).subscribe(coursSupplementaire=>{
        this.loadData = coursSupplementaire;
        console.log("cours suplementaire ");console.log(this.loadData);
      });
    });
   

  }
}

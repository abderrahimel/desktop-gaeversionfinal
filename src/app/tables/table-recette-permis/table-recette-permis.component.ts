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
  selector: 'app-table-recette-permis',
  templateUrl: './table-recette-permis.component.html',
  styleUrls: ['./table-recette-permis.component.css']
})
export class TableRecettePermisComponent implements OnInit,AfterViewInit { 
  displayedColumns: string[] = ['cin', 'candidat', 'categorie', 'date', 'type_p', 'montant'];    
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
         
  }
            
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }           
  getData(){
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.permis = coursRecette.permis;
      this.dataSource = new MatTableDataSource(this.permis)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.permis){
        this.n = this.permis.reduce((acc, o) => acc + Object.keys(o).length, 0)
      }
    });      
    
  }            
            }
            
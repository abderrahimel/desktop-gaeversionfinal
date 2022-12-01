import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

import { loadcoursSupplementaire } from 'src/app/state/coursSupplementaire/coursSupplementaire.actions';
import { CoursRecetteState } from 'src/app/state/coursSupplementaire/coursSupplementaire.state';
import { loadproduitCandidat } from 'src/app/state/produitCandidat/produitCandidat.actions';
import { ProduitCandidatState } from 'src/app/state/produitCandidat/produitCandidat.state';

@Component({
  selector: 'app-recette-info',
  templateUrl: './recette-info.component.html',
  styleUrls: ['./recette-info.component.css']
})
export class RecetteInfoComponent implements OnInit {
  displayedColumns: string[] = ['cin', 'nom','date','type_p' ,'montant' ];    
  displayedColumns2: string[] = ['cours','nombreHeurePratique', 'candidats', 'categorie', 'date', 'montant' ]  
  displayedColumns3: string[] = ['produit','quantite', 'candidat', 'prix', 'date' ];  
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  dataSource3!: MatTableDataSource<any>;
  @ViewChild('empTbSortfirst') empTbSortfirst = new MatSort();
  @ViewChild('paginatorfirst') paginatorfirst!: MatPaginator;    
  @ViewChild('empTbSortsecond') empTbSortsecond = new MatSort();
  @ViewChild('paginatorSecond') paginatorSecond!: MatPaginator;    
  @ViewChild('empTbSorthird') empTbSorthird = new MatSort();
  @ViewChild('paginatorthird') paginatorthird!: MatPaginator;
  depenseLocal:any;
  dataGeneral:any;
  data_v:any;
  listIdC:any = [];
  permis:any = [];
  supplementaire:any = [];
  dataPermis:any;
  idAutoEcole:any;
  dataCoursSupplementaire:any;
  dataProduitCandidat:any;
  dataVentes:any = [];
  loadData:any = [];
  ventes:any;
  id:any;
  constructor(private dataService: DataService,
    private route:ActivatedRoute,
              private store:Store<{produitCandidat: ProduitCandidatState, coursRecette: CoursRecetteState}>
    ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getData();
  }
  getData(){
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    // dispatch action loadproduitCandidat
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.produitCandidat.produitCandidat.loaded){
        this.store.dispatch(loadproduitCandidat({idAutoEcole: this.idAutoEcole}));
      }
      if(!store.coursRecette.coursRecette.loaded){
        this.store.dispatch(loadcoursSupplementaire({idAutoEcole: this.idAutoEcole}));
      }
    });
    this.store.select(state=>state.produitCandidat.produitCandidat.produitCandidat).subscribe(produitCandidat=>{
      this.loadData = produitCandidat;
      if(this.loadData){
        this.loadData = this.loadData.filter((cousupp:any)=>Number(cousupp?.date?.split('-')[1]) === this.id);
        console.log("produit candidat");console.log(this.loadData);  
        this.dataSource3 = new MatTableDataSource(this.loadData);
        this.dataSource3.paginator = this.paginatorthird;
        this.dataSource3.sort = this.empTbSorthird;
      }
    });
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.supplementaire = coursRecette.coursSupplementaire;
      if(this.supplementaire){
        console.log("all cours supplementaire");console.log(this.supplementaire);
        this.supplementaire = this.supplementaire.filter((cousupp:any)=>Number(cousupp?.date?.split('-')[1]) === this.id);
        console.log("cours supplementaire");console.log(this.supplementaire);
        this.dataSource2 = new MatTableDataSource(this.supplementaire);
        this.dataSource2.paginator = this.paginatorSecond;
        this.dataSource2.sort = this.empTbSortsecond;
      }
     
      this.permis = coursRecette.permis;
      console.log("permis");console.log(this.permis);
      this.dataSource = new MatTableDataSource(this.permis)
      this.dataSource.paginator = this.paginatorfirst;
      this.dataSource.sort = this.empTbSortfirst;
      
    });

  }
  stylebtn(name:any){
    if(name === '.dg'){
      $('.dg').css('background', 'black');
      $('.dp').css('background', 'white');
      $('.dv').css('background', 'white');
      $('.dg').css('color', 'white');
      $('.dp').css('color', 'black');
      $('.dv').css('color', 'black');
    }else if(name === '.dp'){
      $('.dg').css('background', 'white');
      $('.dp').css('background', 'black');
      $('.dv').css('background', 'white');
      $('.dg').css('color', 'black');
      $('.dp').css('color', 'white');
      $('.dv').css('color', 'black');
    }else{
      $('.dg').css('background', 'white');
      $('.dp').css('background', 'white');
      $('.dv').css('background', 'black');
      $('.dg').css('color', 'black');
      $('.dp').css('color', 'black');
      $('.dv').css('color', 'white');
    }
  }
  
  applyFilter(event:any){
    let value = event.target.value
    if(this.dataSource != null){
      this.dataSource.filter = value.trim().toLowerCase()
    }
  }
  applyFilter2(event:any){
    let value = event.target.value
    if(this.dataSource2 != null){
      this.dataSource2.filter = value.trim().toLowerCase()
    }
  }
  applyFilter3(event:any){
    let value = event.target.value
    if(this.dataSource3 != null){
      this.dataSource3.filter = value.trim().toLowerCase()
    }
  }
}

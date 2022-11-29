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
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
export class RecetteComponent implements OnInit {
  displayedColumns: string[] = ['date',  'candidat',  'type_formation',  'categorie',  'montant', 'nbr_heure_pratique'];
  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;   
  dataSource = new MatTableDataSource([]);
  dateVal = new Date();
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
  constructor(private dataService: DataService,
              private store:Store<{produitCandidat: ProduitCandidatState, coursRecette: CoursRecetteState}>
    ) { }

  ngOnInit(): void {
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
    });
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.supplementaire = coursRecette.coursSupplementaire;
      
      this.permis = coursRecette.permis
      // this.dataSource.data = this.loadData.concat(this.supplementaire)
      // this.dataSource.data = this.dataSource.data.concat(this.supplementaire)
      // this.dataSource.paginator = this.paginatorFirst;
      // this.dataSource.sort = this.empTbSort;
    });

  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
changestyle(name:any){      
    if(name === '.rpc'){
      $('.rpc').css('background', 'black');
      $('.rcs').css('background', 'white');
      $('.rg').css('background', 'white');
      $('.rp').css('background', 'white');
      $('.rpc').css('color', 'white');
      $('.rcs').css('color', 'black');
      $('.rg').css('color', 'black');
      $('.rp').css('color', 'black');
    }else if(name === '.rcs'){
      $('.rpc').css('background', 'white');
      $('.rcs').css('background', 'black');
      $('.rg').css('background', 'white');
      $('.rp').css('background', 'white');
      $('.rpc').css('color', 'black');
      $('.rcs').css('color', 'white');
      $('.rg').css('color', 'black');
      $('.rp').css('color', 'black');
    }else if(name === '.rg'){
      $('.rpc').css('background', 'white');
      $('.rcs').css('background', 'white');
      $('.rg').css('background', 'black');
      $('.rp').css('background', 'white');
      $('.rpc').css('color', 'black');
      $('.rcs').css('color', 'black');
      $('.rg').css('color', 'white');
      $('.rp').css('color', 'black');
    }else {
      $('.rpc').css('background', 'white');
      $('.rcs').css('background', 'white');
      $('.rg').css('background', 'white');
      $('.rp').css('background', 'black');
      $('.rpc').css('color', 'black');
      $('.rcs').css('color', 'black');
      $('.rg').css('color', 'black');
      $('.rp').css('color', 'white');
    }
  }
}

import { Component, OnInit } from '@angular/core';
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
      }
      console.log("produit candidat*****************************");console.log(this.loadData);
    });
    this.store.select(state=>state.coursRecette.coursRecette).subscribe(coursRecette=>{
      this.supplementaire = coursRecette.coursSupplementaire;
      if(this.supplementaire){
        this.supplementaire = this.supplementaire.filter((cousupp:any)=>Number(cousupp?.date?.split('-')[1]) === this.id);
      }
      console.log("cours supplementaire****************************");
      console.log(this.supplementaire);
     
      this.permis = coursRecette.permis;
      
    });

  }

}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AnyFn } from '@ngrx/store/src/selector';
import { take } from 'rxjs/operators';
import { CandidatService } from 'src/app/services/candidat.service';
import { DataService } from 'src/app/services/data.service';
import { loadVente } from 'src/app/state/vente/vente.actions';
import { VenteState } from 'src/app/state/vente/vente.state';

@Component({
  selector: 'app-form-vente',
  templateUrl: './form-vente.component.html',
  styleUrls: ['./form-vente.component.css']
})

export class FormVenteComponent implements OnInit {
  form = new FormGroup({ 
    candidat_id: new FormControl('', Validators.required),
    produit_id: new FormControl('', Validators.required),
    prixUnitaire: new FormControl('', Validators.required),
    prixTotale: new FormControl('', Validators.required),
    quantiteDisponible: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  })
  submitted:boolean = false;
  data:any[] = [];
  dateVal = new Date();
  dataCandidat:any;
  action:any;
  is_add:boolean = false;
  produits:any;
  dataofIdV:any;
  id_auto_v:any;
  dataemployee:any;
  constructor(private dataService: DataService,
              private candidatData: CandidatService,
              private router: Router,
              private route:ActivatedRoute,
              private store:Store<{vente: VenteState}>
    ){}

  ngOnInit(): void {
    this.getData();
    let idVente = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.router.url);
    if(this.router.url === '/vente-form/'+idVente){
      this.id_auto_v = idVente;
      this.action = 'Modifier'
      console.log('---------------------------');
      this.is_add = true;
      // get the vente of this id
      this.dataService.getVenteById(idVente).subscribe(data=>{
        console.log("ventes");
        console.log(JSON.parse(data));
        this.dataofIdV = JSON.parse(data)
        console.log(this.dataofIdV);

        this.form.patchValue({
          candidat_id: this.dataofIdV.candidat_id,
          produit_id:  this.dataofIdV.produit_id,
          prixUnitaire:  this.dataofIdV.prixUnitaire,
          prixTotale:  this.dataofIdV.prixTotale,
          quantiteDisponible:  this.dataofIdV.quantiteDisponible,
          quantite:  this.dataofIdV.quantite,
          date:  this.dataofIdV.date,
      });
      }) 
    }else{
      this.action = 'Ajouter';
      this.is_add = false;
      // id auto ecole
      this.id_auto_v = localStorage.getItem('autoEcole_id');
    }
     
     
    // get the employee of the auto ecole
    let ecole_id = localStorage.getItem('autoEcole_id');
    this.candidatData.getCandidat(ecole_id).subscribe(data=>{
      console.log("candidat");
      console.log(data);
      this.dataCandidat = data;
    })
    this.dataService.getProduit(localStorage.getItem('autoEcole_id')).subscribe(produits=>{
      console.log(JSON.parse(produits));
      this.produits = JSON.parse(produits);
    })
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.vente.vente.loaded){
        this.store.dispatch(loadVente({idAuto: localStorage.getItem('autoEcole_id')}));
      }
    })
    // this.store.select(state=>state.vente.vente.vente).subscribe(ventes=>{
    //   let id = Number(this.route.snapshot.paramMap.get('id'));
    //   console.log("vente with id =", id);
    //   let vente = ventes.filter(vente=>vente.id === id);
    //   console.log(vente);
    // })
  }
  addVente(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    console.log('form is valid');
    console.log(this.form.value);
    console.log('id auto or vente', this.id_auto_v, this.is_add);



  }

}

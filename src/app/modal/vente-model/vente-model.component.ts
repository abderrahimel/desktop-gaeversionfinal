import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadVente, setloadedVente } from 'src/app/state/vente/vente.actions';
import { VenteState } from 'src/app/state/vente/vente.state';
@Component({
  selector: 'app-vente-model',
  templateUrl: './vente-model.component.html',
  styleUrls: ['./vente-model.component.css']
})
export class VenteModelComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  candidats:any;
  produits:any;
  submitted:boolean = false;
  candidatSupplementaire:any;
  candidatBasic:any;
  form = new FormGroup({ 
    candidat_id: new FormControl('', Validators.required),
    produit_id: new FormControl('', Validators.required),
    prixUnitaire: new FormControl('', Validators.required),
    prixTotale: new FormControl('', Validators.required),
    quantiteDisponible: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  })
  constructor( public activeModal: NgbActiveModal,
               private dataService:DataService,
               private router: Router,
               private store:Store<{vente: VenteState}>
    ) { }

  ngOnInit(): void {
    this.getCandidatsSupplementaire();
     this.getCandidatsBasic()
    this.dataService.getProduit(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.produits  = JSON.parse(data)
    })
    
    this.form.patchValue({
      candidat_id: this.data?.candidat_id,
      produit_id:  this.data?.produit_id,
      prixUnitaire:  this.data?.prixUnitaire,
      prixTotale:  this.data?.prixTotale,
      quantiteDisponible:  this.data?.quantiteDisponible,
      quantite:  this.data?.quantite,
      date:  this.data?.date,
  });
  }
  getCandidatsSupplementaire(){
    this.dataService.getCandidatsSupplementaire(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatSupplementaire = JSON.parse(data)   
    },
    error=>{}
    )
  }  
  getCandidatsBasic(){ 
    this.dataService.getCandidatsBasic(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.candidatBasic = JSON.parse(data)  
    },
    error=>{}
    )
  }   
  addVente(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    if(this.btn === 'Ajouter'){
      this.dataService.addVente(localStorage.getItem('autoEcole_id'), { 
        candidat_id: this.form.value.candidat_id,
        prixUnitaire: this.form.value.prixUnitaire,
        prixTotale: this.form.value.prixTotale,
        produit_id: this.form.value.produit_id,
        quantiteDisponible: this.form.value.quantiteDisponible,
        quantite: this.form.value.quantite,
        date: this.form.value.date,
      }).subscribe(data =>{
        this.store.dispatch(setloadedVente());
        this.store.dispatch(loadVente({idAuto: localStorage.getItem('autoEcole_id')}));
        this.router.navigateByUrl('/vente');
      })
    }else{
      this.dataService.updateVente(this.data.id, { 
        candidat_id: this.form.value.candidat_id,
        prixUnitaire: this.form.value.prixUnitaire,
        prixTotale: this.form.value.prixTotale,
        produit_id: this.form.value.produit_id,
        quantiteDisponible: this.form.value.quantiteDisponible,
        quantite: this.form.value.quantite,
        date: this.form.value.date,
        }).subscribe(data =>{
          this.store.dispatch(setloadedVente());
          this.store.dispatch(loadVente({idAuto: localStorage.getItem('autoEcole_id')}));
          this.store.dispatch(loadVente({idAuto: localStorage.getItem('autoEcole_id')}));
        })
    }
    
   this.activeModal.dismiss('Cross click')

  }
}

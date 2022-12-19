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
  idProduit:any;
  produits:any;
  errorQuantity:boolean = false;
  submitted:boolean = false;
  candidatSupplementaire:any;
  quantityDisponible:any;
  selectboolean:boolean = true;
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
    if(this.btn === 'Ajouter'){
      this.selectboolean = true;
     
    }else{
      this.form.patchValue({
        candidat_id: this.data?.candidat_id,
        produit_id:  this.data?.produit?.libelle,
        prixUnitaire:  this.data?.prixUnitaire,
        prixTotale:  this.data?.prixTotale,
        quantiteDisponible:  this.data?.quantiteDisponible,
        quantite:  this.data?.quantite,
        date:  this.data?.date,
       });
      this.selectboolean = false;
    }
    this.getCandidatsSupplementaire();
     this.getCandidatsBasic()
    this.dataService.getProduit(localStorage.getItem('autoEcole_id')).subscribe(data=>{
        this.produits  = JSON.parse(data)
    })
   
  }
  setquantitePrix(e:any){
    console.log(e.target.value);
    if(e.target.value){
      this.dataService.getProduitById(e.target.value).subscribe(data=>{
        console.log(JSON.parse(data));
        this.form.patchValue({
          prixUnitaire:  JSON.parse(data)['prix'],
          quantiteDisponible:  JSON.parse(data)['quantite'],
        });
      });
    }
  }

  checkQuantity(e:any){
    console.log(e.target.value);
    if(Number(e.target.value) >Number(this.form.value.quantiteDisponible)){
      this.errorQuantity = true;
    }else{
      this.errorQuantity = false;
      if(this.form.value.prixUnitaire){
        let prixTotal = Number(e.target.value) * Number(this.form.value.prixUnitaire);
        this.form.patchValue({
          prixTotale: prixTotal
        })
      }
      
    }
    console.log(this.errorQuantity);
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
    // Quantité doit être inférieur au quantité disponible
    if(this.errorQuantity){
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
      })
    }else{
        this.dataService.updateVente(this.data.id, { 
          candidat_id: this.form.value.candidat_id,
          prixUnitaire: this.form.value.prixUnitaire,
          prixTotale: this.form.value.prixTotale,
          produit_id: this.data?.produit_id,
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

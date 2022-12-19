import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { addProduit, updateProduit } from 'src/app/state/produit/produit.actions';
import { ProduitState } from 'src/app/state/produit/produit.state';

@Component({
  selector: 'app-produit-modal',
  templateUrl: './produit-modal.component.html',
  styleUrls: ['./produit-modal.component.css']
})
export class ProduitModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  form = new FormGroup({
    fournisseur: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  constructor( public activeModal: NgbActiveModal,
                private store: Store<{produitA: ProduitState}>,
                
    ) { }
  ngOnInit(): void {
    this.form.patchValue({
      fournisseur: this.data?.fournisseur,
      telephone: this.data?.telephone,
      libelle: this.data?.libelle,
      prix: this.data?.prix,
      quantite: this.data?.quantite,
      description: this.data?.description,
    });
  }
  addProduit(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("invalid form");
      return;
    }
    let data = {
      fournisseur: this.form.value.fournisseur,
      telephone: this.form.value.telephone,
      libelle: this.form.value.libelle,
      prix: this.form.value.prix,
      quantite: this.form.value.quantite,
      description: this.form.value.description,
    };
    if(this.btn === 'Ajouter'){
       // dispatch action add
       this.store.dispatch(addProduit({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}))
       this.activeModal.dismiss('Cross click');
    }else{
      // dispatch action update addProduit updateProduit
      this.store.dispatch(updateProduit({id: this.data.id, data: data}));
      this.activeModal.dismiss('Cross click');
    }
    
  }
}

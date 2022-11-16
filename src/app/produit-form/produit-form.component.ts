import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { addProduit, loadProduit, updateProduit } from '../state/produit/produit.actions';
import { ProduitState } from '../state/produit/produit.state';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.css']
})
export class ProduitFormComponent implements OnInit {

  form = new FormGroup({
    fournisseur: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    libelle: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    quantite: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  submitted:boolean = false;
  data:any[] = [];
  dateVal = new Date();
  dataemployee:any;
  action:any = '';
  idAutoEcole:any;
  idProduit:any;
  actionBoolean:any;;
  id_autoecole_produit:any;
  productDataById:any;
  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<{produitA: ProduitState}>
    ){}

  ngOnInit(): void {
    this.idProduit = Number(this.route.snapshot.paramMap.get('id'));  
    this.idAutoEcole = localStorage.getItem('autoEcole_id');
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.produitA.produit.loaded){
        this.store.dispatch(loadProduit({idAutoEcole: this.idAutoEcole}));
      }
    })
   
    if(this.router.url === '/produit_form/' + this.idProduit){
      console.log("yes");
        this.action = 'Update';
        this.actionBoolean = true;
       
        this.dataService.getProductById(this.idProduit).subscribe(data =>{
          console.log("product ", this.idProduit);
          console.log(data);
          this.productDataById = JSON.parse(data);                                                                                                                               
   
        
        this.form.patchValue({
          fournisseur: this.productDataById.fournisseur,
          telephone: this.productDataById.telephone,
          libelle: this.productDataById.libelle,
          prix: this.productDataById.prix,
          quantite: this.productDataById.quantite,
          description: this.productDataById.description,
        });
        })
        
    }else{
        this.action = 'sauvegarder';
        this.actionBoolean = false;
    } 
  }

  addProduit(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
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
    let idProduit = Number(this.route.snapshot.paramMap.get('id')); 
    if(this.actionBoolean){
      // dispatch action update addProduit updateProduit
        this.store.dispatch(updateProduit({id: idProduit, data: data}));
    }else{
      // dispatch action add
      this.store.dispatch(addProduit({idAutoEcole: this.idAutoEcole, data: data}))
    }
   
    // this.dataService.add_UpdateProduit(this.actionBoolean, this.id_autoecole_produit, {
    //   fournisseur: this.form.value.fournisseur,
    //   telephone: this.form.value.telephone,
    //   libelle: this.form.value.libelle,
    //   prix: this.form.value.prix,
    //   quantite: this.form.value.quantite,
    //   description: this.form.value.description,
    // }).subscribe(data =>{
    //   console.log("added produit to database");
    //   console.log(data);
    //   this.router.navigateByUrl('/produit');
    // })


  }

}

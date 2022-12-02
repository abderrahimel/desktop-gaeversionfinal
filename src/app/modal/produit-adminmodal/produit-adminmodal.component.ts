import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadProduitSuperAdmin } from 'src/app/state/produitSuperAdmin/produitSuperAdmin.actions';
import { ProduitSuperAdminState } from 'src/app/state/produitSuperAdmin/produitSuperAdmin.state';

@Component({
  selector: 'app-produit-adminmodal',
  templateUrl: './produit-adminmodal.component.html',
  styleUrls: ['./produit-adminmodal.component.css']
})
export class ProduitAdminmodalComponent implements OnInit {
  @Input() data: any;
  @Input() btn: any;
  hidd:boolean = false;
  submitted:boolean = false;
  show_prix:boolean = false;

  base64Img_image:any;
  form = new FormGroup({          
    titre: new FormControl('', Validators.required),
    categorie: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    marque: new FormControl(''),
    prixPromotion: new FormControl(''),
    model: new FormControl(''),
    carburant: new FormControl(''),
    kilometrage: new FormControl(''),
    image: new FormControl(''),
    description: new FormControl(''),
  });
  constructor(public activeModal: NgbActiveModal,
              private dataServece: DataService,
              private store: Store<{produitSuperAdmin: ProduitSuperAdminState}>    
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.data?.nomCategorie === 'vehicule occasion'){
      this.hidd = true;
    }
      this.form.patchValue({
        titre: this.data?.titre,
        categorie: this.data?.nomCategorie,
        prix: this.data?.prix,
        marque: this.data?.marque,
        prixPromotion: this.data?.prixPromotion,
        model: this.data?.modele,
        carburant: this.data?.carburant,
        kilometrage: this.data?.kilometrage,
        description: this.data?.description,
        promotion1: this.data?.promotion1,
        promotion2: this.data?.promotion2,
      })
   
  }

  boolShow(event:any){
    if(this.form.value.categorie === 'vehicule occasion'){
      this.hidd = true;
    }else{
      this.hidd = false;
    }
  }
  showPrix(event:any){
    if(event.target.value === 'oui'){
      this.show_prix = true;
    }else{
      this.show_prix = false;
    }
  }
  check(){
  }
  newProduit(){
    this.submitted = true;
       if(this.form.invalid){
         return;
       }
       this.dataServece.newProduit({
        titre: this.form.value.titre,
        categorie: this.form.value.categorie,
        prix: this.form.value.prix,
        marque: this.form.value.marque,
        model: this.form.value.model,
        carburant: this.form.value.carburant,
        kilometrage: this.form.value.kilometrage,
        prixPromotion: this.form.value.prixPromotion,
        description: this.form.value.description,
        image:this.base64Img_image,
       }).subscribe(data=>{
          this.store.dispatch(loadProduitSuperAdmin());
       })
       this.activeModal.dismiss('Cross click');
       
  }
  fileChangeEvent(event: any) {
   if (event.target.files && event.target.files[0]) {
       const reader = new FileReader();
       reader.onload = (e: any) => {
           const image = new Image();
           image.src = e.target.result;
           image.onload = rs => {
                   this.base64Img_image = e.target.result;
                   
                   
           };
       };
 
       reader.readAsDataURL(event.target.files[0]);
   }
 }
}

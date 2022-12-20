import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from "jquery";
import { ProduitAdminmodalComponent } from 'src/app/modal/produit-adminmodal/produit-adminmodal.component';
import { DetailboutiquemodalComponent } from 'src/app/modal/detailboutiquemodal/detailboutiquemodal.component';
import { Store } from '@ngrx/store';
import { ProduitSuperAdminState } from 'src/app/state/produitSuperAdmin/produitSuperAdmin.state';
import { take } from 'rxjs/operators';
import { loadProduitSuperAdmin } from 'src/app/state/produitSuperAdmin/produitSuperAdmin.actions';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-admin-boutique',
  templateUrl: './admin-boutique.component.html',
  styleUrls: ['./admin-boutique.component.css']
})
export class AdminBoutiqueComponent implements OnInit,AfterViewInit { 
  displayedColumns: string[] = ['image', 'titre', 'prix', 'promotion', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;  
  dataLoad:any;
  hidding:boolean = false;
  hiddingNewProduit:boolean = false;
  dateVal = new Date();
  base64Img_image:any;
  prix:any;
  description:any;
  titre:any;
  withPrixPromotion:boolean = false;
  submitted:boolean = false;
  id:any;
  hidd:boolean = false;
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
    promotion1: new FormControl(''),
    promotion2: new FormControl(''),
    
  });
  constructor(private   dataService: DataService,
              private   modalService: NgbModal,
              private auth:AuthService,
              private store: Store<{produitSuperAdmin: ProduitSuperAdminState}>
    ) { }
    
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getAllProduits();
      }
    })
  }
  ngAfterViewInit() {
   }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
}
 getAllProduits(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.produitSuperAdmin.produitSuperAdmin.loaded){
      this.store.dispatch(loadProduitSuperAdmin());
    }
  })
  this.store.select(state=>state.produitSuperAdmin.produitSuperAdmin.produitSuperAdmin).subscribe(produitSuperAdmin=>{
    this.dataLoad = produitSuperAdmin;
    this.dataSource = new MatTableDataSource(this.dataLoad)
    this.dataSource.paginator = this.paginatorFirst;
    this.dataSource.sort = this.empTbSort;
  })

 }
//  getProduits(){
//   this.dataService.getAllProduit().subscribe(data=>{
//     this.dataLoad = JSON.parse(data);
//     this.dataSource = new MatTableDataSource(this.dataLoad)
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//     // this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
//   })
//  }
 boolShow(event:any){
   if(event === 'vehicule occasion'){
     this.hidd = true;
   }else{
     this.hidd = false;
   }
 }
 show(bool:any, id:any){
   this.hidding = bool;
   if(id != -1){
      this.id = id;
   }
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
   checked(event:any, type:any){
}
newProduit(){
  this.submitted = true;
     if(this.form.invalid){
       return;
     }
     this.dataService.newProduit({
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
       this.hiddingNewProduit = false;
       // reload the data of produits 
       this.store.dispatch(loadProduitSuperAdmin());
     })
}
hiddingNewP(bool:any){
  this.hiddingNewProduit = bool;
  this.form.patchValue({
    titre: null,
    categorie: null,
    prix: null,
    marque: null,
    model: null,
    carburant: null,
    kilometrage: null,
    prixPromotion: null,
    description: null,
   });

}
deleteProduitAdmin(id:any){
  Swal.fire({
    title: 'confirmation',
    text: "Vous voulez vraiment confirmer la suppression !",
    icon: 'error',
    showCancelButton: true,
    cancelButtonText: 'annuler',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'oui, supprimer'
  }).then((result) => {
    if (result.isConfirmed) {
      this.dataService.deleteProduitAdmin(id).subscribe(data=>{
        this.store.dispatch(loadProduitSuperAdmin());
      })
    }
  })
}
open(btn:any, data:any) {
  const modalRef = this.modalService.open(ProduitAdminmodalComponent);
  modalRef.componentInstance.btn = btn;
  modalRef.componentInstance.data = data;
  // this.store.dispatch(loadProduitSuperAdmin());
}
opentail(data:any) {
  const modalRef = this.modalService.open(DetailboutiquemodalComponent);
  modalRef.componentInstance.data = data;
}

}


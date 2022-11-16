import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbonnementmodalComponent } from 'src/app/modal/abonnementmodal/abonnementmodal.component';
import { StateAbonnement } from 'src/app/state/abonnement/abonnement.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { loadAbonnemtAction } from 'src/app/state/abonnement/abonnemet.action';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-abonnement-auto-ecole',
  templateUrl: './abonnement-auto-ecole.component.html',
  styleUrls: ['./abonnement-auto-ecole.component.css']
})
export class AbonnementAutoEcoleComponent implements OnInit,AfterViewInit {  
  displayedColumns: string[] = ['nom_auto_ecole', 'date_debut', 'date_fin', 'prix','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  hiddingNewAbonnement:boolean = false;
  dateVal = new Date();
  autoEcoleApprouver:any;
  withPrixPromotion:boolean = false;
  submitted:boolean = false;
  id:any;
  idAbonnement:any;
  hidd:boolean = false;
  form = new FormGroup({           
    prix: new FormControl('', Validators.required),
    date_debut: new FormControl('', Validators.required),
    date_fin: new FormControl('', Validators.required),
  
  });
  constructor(private   dataServece: DataService,
              private   modalService: NgbModal,
              private   store: Store<{abonement: StateAbonnement}>,
              private auth:AuthService
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getAbonnement();
      }
    })

  }
  ngAfterViewInit() {
   }
   applyFilter(event:any){
    let value = event.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }
 getAllAbonnement(){
  this.store.pipe(take(1)).subscribe(store=>{
    if(!store.abonement.abonnement.loaded){
      this.store.dispatch(loadAbonnemtAction());
    }
  })
    this.store.select(state=>state.abonement.abonnement.abonnement).subscribe(abonnement=>{
      this.autoEcoleApprouver = abonnement;
    })
 }
 getAbonnement(){
  this.dataServece.getAbonnementAutoEcole().subscribe(data=>{
    this.dataLoad = data;
    this.dataSource = new MatTableDataSource(this.dataLoad)

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
  })
 }
 show(bool:any, data:any){
  this.form.patchValue({
      prix: data.prix,
      date_debut: data.date_debut,
      date_fin: data.date_fin,
  })
  this.idAbonnement = data.id
   this.id = data.id
   this.hiddingNewAbonnement = bool;
 }
 boolShow(event:any){
   if(event === 'vehicule occasion'){
     this.hidd = true;
   }else{
     this.hidd = false;
   }
 }
 
   checked(event:any, type:any){
}

abonnement(){
  this.submitted = true;
     if(this.form.invalid){
       return;
     }

     this.dataServece.updateabonnement(this.idAbonnement, {
      prix: this.form.value.prix,
      date_debut: this.form.value.date_debut,
      date_fin: this.form.value.date_fin,
     }).subscribe(data=>{
       this.hiddingNewAbonnement = false;
       // reload the data of produits 
       this.getAllAbonnement();
     })
}
hiddingNewP(bool:any){
  this.hiddingNewAbonnement = bool;
  this.form.patchValue({
    prix: null,
    date_debut: null,
    date_fin: null,
})
}
deleteAbonnementAutoEcole(id:any){
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
        this.dataServece.deletAbonnement(id).subscribe(data=>{
        this.getAbonnement();
      })
      
    }
  })
    
}
open(btn:any, data:any) {
  const modalRef = this.modalService.open(AbonnementmodalComponent);
  modalRef.componentInstance.btn = btn;
  modalRef.componentInstance.data = data;
}
}


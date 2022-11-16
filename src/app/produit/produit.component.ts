import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { deletProduit, loadProduit } from '../state/produit/produit.actions';
import { ProduitState } from '../state/produit/produit.state';
import Swal from 'sweetalert2';
import { ProduitModalComponent } from '../modal/produit-modal/produit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit { // 
  displayedColumns: string[] = ['fournisseur', 'libelle', 'prix', 'quantite', 'description', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data:any[]=[];
  dateVal = new Date();
  dataemployee:any;
  dataProduit:any;
  constructor(private dataService: DataService,
              private store:Store<{produitA: ProduitState}>,
              private modalService: NgbModal,
    ){}

  ngOnInit(): void {
    this.getProduit();
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getProduit(){
    this.dataService.getProduit(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataProduit = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.dataProduit)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataProduit.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  getData(){
        this.store.pipe(take(1)).subscribe(store=>{
          if(!store.produitA.produit.loaded){
          this.store.dispatch(loadProduit({idAutoEcole: localStorage.getItem('autoEcole_id')}));
          }
        })
        this.store.select(state=>state.produitA.produit.produit).subscribe(produits=>{
          this.dataProduit = produits;
        })
  }

  deleteProduit(id){
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
        this.store.dispatch(deletProduit({id: id}));
        this.getProduit();
      }
    })
   
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(ProduitModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { deleteVente, loadVente } from '../state/vente/vente.actions';
import { VenteState } from '../state/vente/vente.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VenteModelComponent } from '../modal/vente-model/vente-model.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {           
  displayedColumns: string[] = ['produit', 'quantite', 'candidat', 'prixUnitaire', 'prixTotale', 'date', 'description', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataVentes:any = [];
  loadData:any = [];
  ventes:any;
  constructor(private dataService: DataService,
              private store: Store<{vente: VenteState}>,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getVentes()
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
       if(!store.vente.vente.loaded){
        console.log("load vente---------------");
          this.store.dispatch(loadVente({idAuto: localStorage.getItem('autoEcole_id')}));
       }
    })
    this.store.select(state=>state.vente.vente.vente).subscribe(ventes=>{
      this.ventes = ventes;
      console.log("ventes list*********");
      console.log(ventes);
    })
  }
   getVentes(){
    this.dataService.getVentes(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.ventes = JSON.parse(data);
      console.log(JSON.parse(data));
      this.dataSource = new MatTableDataSource(this.ventes)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.ventes.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
   }
  deletVente(id:any){
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
        this.store.dispatch(deleteVente({id: id}));
        this.getData();
      }
    })

    
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(VenteModelComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}

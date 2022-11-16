import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { deletDepenseCategorieById, loadCategoriedepense } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depense-categorie-vehicule',
  templateUrl: './depense-categorie-vehicule.component.html',
  styleUrls: ['./depense-categorie-vehicule.component.css']
})
export class DepenseCategorieVehiculeComponent implements OnInit {
  dataVehicule:any;
  displayedColumns: string[] = ['categorie', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataNote:any;
  n:any;
  constructor( private store:Store<{categorieDepense: DepenseCategorieState}>,
               private modalService: NgbModal,
               private auth:AuthService,
               private dataService:DataService
    ) { }

  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        // this.getCategorieDepenseVehicule();
        this.getData()
      }
    })
   
  }
  getCategorieDepenseVehicule(){
    this.dataService.getCategorieDepenseVehicule(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataVehicule  = JSON.parse(data)
      this.dataSource = new MatTableDataSource(this.dataVehicule)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if(this.dataVehicule){
        this.n = this.dataVehicule.reduce((acc, o) => acc + Object.keys(o).length, 0)
      }
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.categorieDepense.depenseCategorie.loaded){
        this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.categorieDepense.depenseCategorie).subscribe(categoriedepense=>{
        this.dataVehicule  = categoriedepense.categorieVehicule;
        this.dataSource = new MatTableDataSource(this.dataVehicule)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataVehicule){
          this.n = this.dataVehicule.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
    })
 
  }
  deleteDepenseCategorie(id:any){
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
        this.store.dispatch(deletDepenseCategorieById({id:id}));
        this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    
  }
  open(type:any, btn:any, data:any) {
    const modalRef = this.modalService.open(DepenseCategorieModalComponent);
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  }
}

import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deletfactures, loadfactures } from 'src/app/state/factures/factures.actions';
import { FactureState } from 'src/app/state/factures/factures.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FactureModalComponent } from 'src/app/modal/facture-modal/facture-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit { //
  displayedColumns: string[] = ['id', 'date', 'candidat', 'tva', 'montant_ht', 'montant_ttc', 'actions'];    
  dataSource!: MatTableDataSource<any>;
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  dateVal = new Date();
  factures:any = [];
  temp:any;
  constructor(private dataService: DataService,
              private store:Store<{facture:FactureState}>,
              private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.getData();
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.facture.factures.factures){
        this.store.dispatch(loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
      this.store.select(state=>state.facture.factures.factures).subscribe(factures=>{
        this.factures = factures;
        this.dataSource = new MatTableDataSource(this.factures)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.factures){
          this.n = this.factures.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
    })
    
  }
  getFacturers(){
    this.dataService.getFactures(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataLoad = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.n = this.dataLoad.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
  }
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  deletFacture(id:any){
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
        this.store.dispatch(deletfactures({id: id}));
        this.store.dispatch(loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
   
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(FactureModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  
  }
}

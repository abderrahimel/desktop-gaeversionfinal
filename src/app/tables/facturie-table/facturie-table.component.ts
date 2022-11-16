import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { FactureModalComponent } from 'src/app/modal/facture-modal/facture-modal.component';
import { deletfactures, loadfactures } from 'src/app/state/factures/factures.actions';
import { FactureState } from 'src/app/state/factures/factures.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturie-table',
  templateUrl: './facturie-table.component.html',
  styleUrls: ['./facturie-table.component.css']
})
export class FacturieTableComponent implements OnInit {
  factures:any;
  dataNote:any;
  collectionSize = 20;
  page = 1;
  pageSize = 4; 
  constructor(    private store:Store<{facture:FactureState}>,
                  private modalService: NgbModal,) { }

 ngOnInit(): void {
    this.getData()
   this.refreshCountries();
    }
    refreshCountries() {
    console.log("refreshCountries");
    this.store.select(state=>state.facture.factures.factures).subscribe(factures=>{
      this.factures = factures;
    })
     this.factures = this.factures
     .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
       console.log(this.factures);
                      }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.facture.factures.factures){
        this.store.dispatch(loadfactures({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    this.store.select(state=>state.facture.factures.factures).subscribe(factures=>{
      this.factures = factures;
    })
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
        this.getData();
      }
    })
   
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(FactureModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  
  }
}

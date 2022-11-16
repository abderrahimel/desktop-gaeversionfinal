import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { deletDepenseCategorieById, loadCategoriedepense } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depense-categorie-personnel',
  templateUrl: './depense-categorie-personnel.component.html',
  styleUrls: ['./depense-categorie-personnel.component.css']
})
export class DepenseCategoriePersonnelComponent implements OnInit {
  dataPersonnel:any;
  collectionSize = 20;
  page = 1;
  pageSize = 4; 
  constructor(  private modalService: NgbModal,
    private store:Store<{categorieDepense: DepenseCategorieState}> 
    ) { }

  ngOnInit(): void {
    this.getData()
    this.refreshCountries();
  }
  refreshCountries() {
    this.store.select(state=>state.categorieDepense.depenseCategorie).subscribe(categoriedepense=>{
      this.dataPersonnel = categoriedepense.categoriePersonnel;
    })
    this.dataPersonnel = this.dataPersonnel
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      console.log(this.dataPersonnel);
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.categorieDepense.depenseCategorie.loaded){
        this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
      }
    })
    this.store.select(state=>state.categorieDepense.depenseCategorie).subscribe(categoriedepense=>{
      this.dataPersonnel = categoriedepense.categoriePersonnel;
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
        this.getData();
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

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModalComponent } from 'src/app/modal/note-modal/note-modal.component';
import Swal from 'sweetalert2';
import { deletnoteCategorie, loadnoteCategorie } from 'src/app/state/notesCategories/notesCategories.actions';
import { take } from 'rxjs/operators';
import { DepenseCategorieState } from 'src/app/state/depenseCategorie/depenseCategorie.state';
import { deletDepenseCategorieById, loadCategoriedepense } from 'src/app/state/depenseCategorie/depenseCategorie.actions';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-depense-categorie-local-table',
  templateUrl: './depense-categorie-local-table.component.html',
  styleUrls: ['./depense-categorie-local-table.component.css']
})
export class DepenseCategorieLocalTableComponent implements OnInit {
    // @Input() collectionSize1: any;
    displayedColumns: string[] = ['categorie','actions'];
    @ViewChild('empTbSort') empTbSort = new MatSort();
    @ViewChild('paginatorFirst') paginatorFirst!: MatPaginator;    
    dataSource = new MatTableDataSource();
    dataNote:any;
   n:any;
    dataLocal:any;
    constructor( private store:Store<{categorieDepense: DepenseCategorieState}>, 
                 private modalService: NgbModal,
                 private auth:AuthService,
                 private dataService:DataService
      ) { 
  
      }
    ngOnInit(): void {
      this.auth.authStatus.subscribe(value=>{
        if(value){
          // this.getCategorieDepenseLocal();
          this.getData();
        }
      })
    }
    applyFilter(event:any){
      let value = event.target.value
      this.dataSource.filter = value.trim().toLowerCase()
    }
    getCategorieDepenseLocal(){
    this.dataService.getCategorieDepenseLocal(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      this.dataLocal = JSON.parse(data);
      this.dataSource = new MatTableDataSource(this.dataLocal)
      this.dataSource.paginator = this.paginatorFirst;
      this.dataSource.sort = this.empTbSort;
      this.n = this.dataLocal.reduce((acc, o) => acc + Object.keys(o).length, 0)
    })
   }
    getData(){
      this.store.pipe(take(1)).subscribe(store=>{
        if(!store.categorieDepense.depenseCategorie.loaded){
          this.store.dispatch(loadCategoriedepense({idAutoEcole: localStorage.getItem('autoEcole_id')}));
        }
        this.store.select(state=>state.categorieDepense.depenseCategorie).subscribe(categoriedepense=>{
          this.dataLocal  = categoriedepense.categorieLocal;
          this.dataSource = new MatTableDataSource(this.dataLocal)
          this.dataSource.paginator = this.paginatorFirst;
          this.dataSource.sort = this.empTbSort;
          if(this.dataLocal){
            this.n = this.dataLocal.reduce((acc, o) => acc + Object.keys(o).length, 0)
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
  
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModalComponent } from 'src/app/modal/note-modal/note-modal.component';
import Swal from 'sweetalert2';
import { deletnoteCategorie, loadnoteCategorie } from 'src/app/state/notesCategories/notesCategories.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-table-notes',
  templateUrl: './table-notes.component.html',
  styleUrls: ['./table-notes.component.css']
})
export class TableNotesComponent implements OnInit {
  // @Input() collectionSize1: any;

  dataNote:any;
  collectionSize = 10;
  page = 1;
  pageSize = 4; 
  //
  constructor( private store:Store <{noteCategorie: NoteCategorieState}>,
               private modalService: NgbModal,
    ) { 

    }

  ngOnInit(): void {
    this.getData()
    this.pageSize = 5;
    this.refreshCountries();
  }
  refreshCountries() {
    console.log("refreshCountries");
    this.store.select(state=>state.noteCategorie.noteCategorie.noteCategorie).subscribe(notes=>{
      this.dataNote = notes
    })
    this.dataNote = this.dataNote
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      console.log(this.dataNote);
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.noteCategorie.noteCategorie.loaded){
        this.store.dispatch(loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')}))
      }
    })
    this.store.select(state=>state.noteCategorie.noteCategorie.noteCategorie).subscribe(notes=>{
      this.dataNote = notes
      // this.COUNTRIES = notes;
    })
  }
  deletNote(id:any){
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
        this.store.dispatch(deletnoteCategorie({id: id}));
        this.getData();
      }
    })
    
  }
  open(btn:any, data:any) {
    const modalRef = this.modalService.open(NoteModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  
  }
}

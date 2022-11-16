import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { deletnoteCategorie, loadnoteCategorie } from 'src/app/state/notesCategories/notesCategories.actions';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModalComponent } from 'src/app/modal/note-modal/note-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepenseCategorieModalComponent } from 'src/app/modal/depense-categorie-modal/depense-categorie-modal.component';
import { CategorieModalComponent } from 'src/app/modal/categorie-modal/categorie-modal.component';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {//
  displayedColumns: string[] = ['categorie', 'moyen', 'note_generale','actions'];    
  dataSource!: MatTableDataSource<any>;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dateVal = new Date();
  dataNote:any;
  constructor(private dataService: DataService,
              private store:Store<{noteCategorie: NoteCategorieState}>,
              private modalService: NgbModal,
    ) { 
      
    }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.noteCategorie.noteCategorie.loaded){
        this.store.dispatch(loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')}))
      }
      this.store.select(state=>state.noteCategorie.noteCategorie.noteCategorie).subscribe(notes=>{
        this.dataNote = notes
        this.dataSource = new MatTableDataSource(this.dataNote)

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(this.dataNote){
          this.n = this.dataNote.reduce((acc, o) => acc + Object.keys(o).length, 0)
        }
      })
    })
    
  }
 getNotesCategorie(){
  this.dataService.getNotes(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    this.dataNote = JSON.parse(data);
    this.dataSource = new MatTableDataSource(this.dataNote)

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.n = this.dataNote.reduce((acc, o) => acc + Object.keys(o).length, 0)
  })
 }
 applyFilter(event:any){
  let value = event.target.value
  this.dataSource.filter = value.trim().toLowerCase()
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
        this.store.dispatch(loadnoteCategorie({idAutoEcole: localStorage.getItem('autoEcole_id')}))
      }
    })
    
  }
  open(btn:any, data:any) { // NoteModalComponent
    const modalRef = this.modalService.open(NoteModalComponent);
    modalRef.componentInstance.btn = btn;
    modalRef.componentInstance.data = data;
  
  }
  
}

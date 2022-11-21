import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { addNote, updateNote } from 'src/app/state/notesCategories/notesCategories.actions';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';
@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  dataReceive:any;
  submitted:boolean = false;
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
    moyen: new FormControl('', Validators.required),
    note_generale: new FormControl('', Validators.required),
  })

  constructor( private store:Store<{noteCategorie: NoteCategorieState}>,
               public activeModal: NgbActiveModal,
               ) { }

  ngOnInit(): void {
    this.dataReceive = this.data
    console.log("data ");
    console.log({btn: this.btn, data: this.data});
    this.form.patchValue({
      categorie: this.data?.categorie, 
      moyen: this.data?.moyen,
      note_generale: this.data?.note_generale,
    })
  }

 AddOrModifierNote(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
      let data = { categorie: this.form.value.categorie, moyen: this.form.value.moyen, note_generale: this.form.value.note_generale};
    if(this.btn === 'Ajouter'){
      // dispatch action addnote to db
      this.store.dispatch(addNote({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
    }else{
      // dispatch action updatenote db
      this.store.dispatch(updateNote({id:this.data.id, data:data}))
    }
    // close the form
    this.activeModal.dismiss('Cross click');
  }
}

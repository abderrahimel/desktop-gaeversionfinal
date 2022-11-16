import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { addNote, updateNote } from 'src/app/state/notesCategories/notesCategories.actions';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  submitted:any = false;
  note:any;
  idNote:any;
  action:any;
  send_action:any;
  dateVal = new Date();   

  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
    moyen: new FormControl('', Validators.required),
    note_generale: new FormControl('', Validators.required),
  })

  constructor(private dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private store:Store<{noteCategorie: NoteCategorieState}>

    ) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.idNote = Number(this.route.snapshot.paramMap.get('id'));
    if(this.router.url === '/update-note/' + this.idNote){
      this.action = "Modifier";
      this.send_action = true;
      this.dataService.getNoteById(this.idNote).subscribe(data=>{
        this.note = data;
         console.log(data);
         this.form.patchValue({
           categorie: this.note.categorie,
           moyen: this.note.moyen,
           note_generale: this.note.note_generale
         });
       })
    }else{
      this.action = "Ajouter";
      // id auto ecole
      this.send_action = false;
    }
    
  }

  AddOrModifierNote(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
      let data = { categorie: this.form.value.categorie, moyen: this.form.value.moyen, note_generale: this.form.value.note_generale};
    if(this.send_action){
      // dispatch action updatenote db
      this.store.dispatch(updateNote({id:this.idNote, data:data}))
    }else{
      // dispatch action addnote to db
      this.store.dispatch(addNote({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
    }
  }
 
}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { addNote } from 'src/app/state/notesCategories/notesCategories.actions';
import { NoteCategorieState } from 'src/app/state/notesCategories/notesCategories.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installation-note-categorie',
  templateUrl: './installation-note-categorie.component.html',
  styleUrls: ['./installation-note-categorie.component.css']
})
export class InstallationNoteCategorieComponent implements OnInit {
  submitted:boolean = false;
  disabled:boolean = true;

  errorNoteCategorie:any = null;
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
    moyen: new FormControl('', Validators.required),
    note_generale: new FormControl('', Validators.required),
  })
  constructor(private store:Store<{noteCategorie: NoteCategorieState}>,
              private dataservice:DataService,
              private router:Router
    ) { }

  ngOnInit(): void {
  }
  add(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data = { categorie: this.form.value.categorie, moyen: this.form.value.moyen, note_generale: this.form.value.note_generale};
    this.store.dispatch(addNote({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
    this.addOther();
  }
  next(){
    // countCategorieDepense
    this.dataservice.countNote(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      console.log("count note",JSON.parse(data));
      if(Number(JSON.parse(data)['count']) !== 0){
        console.log(JSON.parse(data));
        this.router.navigateByUrl('/dashboard');
      }else{
        this.errorNoteCategorie = "Vous devez ajouter d'abord note categories";
        return;
      }
     })
    }
    addOther(){
      this.disabled = false;
      Swal.fire({
        title: 'confirmation',
        text: "Vous voulez ajouter une autre note categorie?",
        icon: 'error',
        showCancelButton: true,
        cancelButtonText: 'annuler',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'oui'
      }).then((result) => {
        if(!result.isConfirmed) {
          this.router.navigateByUrl('/dashboard');
        }
      })
    }
}
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
    this.initialiseNext();
  }

  initialiseNext(){
     this.dataservice.countNote(localStorage.getItem('autoEcole_id')).subscribe(data=>{
      if(Number(JSON.parse(data)['count']) === 0){
        this.disabled = true;
      }else{
        this.disabled = false;
      }
     })
  }
  add(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    let data = { categorie: this.form.value.categorie, moyen: this.form.value.moyen, note_generale: this.form.value.note_generale};
    this.store.dispatch(addNote({idAutoEcole: localStorage.getItem('autoEcole_id'), data: data}));
    this.disabled = false;
    this.alertMessage("Note Categorie  bien enregistré!")
  }
  alertMessage(message:any){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: message
    })
  }
  next(){
    this.addOther()
   
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
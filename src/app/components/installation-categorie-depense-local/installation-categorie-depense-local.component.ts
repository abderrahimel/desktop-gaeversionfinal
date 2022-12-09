import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installation-categorie-depense-local',
  templateUrl: './installation-categorie-depense-local.component.html',
  styleUrls: ['./installation-categorie-depense-local.component.css']
})
export class InstallationCategorieDepenseLocalComponent implements OnInit {
  submitted:boolean = false;
  errorcategorieDepenselocal:any = null;
  disabled:boolean = true;
  type = 'local';
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
  })
  constructor(private dataservice:DataService,
              private router:Router,
    
    ) { }

  ngOnInit(): void {
    this.initialiseNext();
  }
  initialiseNext(){
    this.dataservice.countCategorieDepense(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    if(Number(JSON.parse(data)['countLocal']) === 0){
      this.disabled = true;
    }else{
      this.disabled = false; 
    }
   })
  }
  addcategorie(){
      this.submitted = true;
      if(this.form.invalid){
        return;
      }
      let data = {
        categorie: this.form.value.categorie,
        type: this.type
      }
      this.dataservice.addCategorie(localStorage.getItem('autoEcole_id'), data).subscribe(data=>{
        this.disabled = false;this.alertMessage("Categorie Local bien enregistré!")
      })
  
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
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez ajouter une autre categorie local?",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui'
    }).then((result) => {
      if(!result.isConfirmed) {
        this.router.navigateByUrl('/installation_note_categorie');
      }
    })
  }
}
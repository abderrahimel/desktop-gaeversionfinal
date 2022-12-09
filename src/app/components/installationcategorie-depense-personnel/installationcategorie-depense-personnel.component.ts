import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installationcategorie-depense-personnel',
  templateUrl: './installationcategorie-depense-personnel.component.html',
  styleUrls: ['./installationcategorie-depense-personnel.component.css']
})
export class InstallationcategorieDepensePersonnelComponent implements OnInit {
  submitted:boolean = false;
  errorcategorieDepensePersonnel:any = null;
  disabled:boolean = true;
  type = 'personnel';
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
    if(Number(JSON.parse(data)['countPersonnel']) === 0){
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
        this.alertMessage("Categorie personnel bien enregistré!")
        this.disabled = false;
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
    this.addOther();
 
  }
  errorAlert(error:any){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error,
    })
   }
  addOther(){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez ajouter une autre depense personnel?",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui'
    }).then((result) => {
      if(!result.isConfirmed) {
        this.router.navigateByUrl('/installation_categorie_depenceVehicule');
      }
    })
  }
}
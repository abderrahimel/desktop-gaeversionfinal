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
      console.log(data);
      this.dataservice.addCategorie(localStorage.getItem('autoEcole_id'), data).subscribe(data=>{
        console.log(data);this.disabled = false;this.addOther()
      })
  
  }

  next(){
  // countCategorieDepense
  this.dataservice.countCategorieDepense(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    console.log("count of categorie",JSON.parse(data));
    if(Number(JSON.parse(data)['countLocal']) === 0){
      this.errorcategorieDepenselocal = "Vous devez ajouter d'abord une categorie local";
    }else{
       console.log(JSON.parse(data));
       this.router.navigateByUrl('/installation_note_categorie');
    }
   })
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
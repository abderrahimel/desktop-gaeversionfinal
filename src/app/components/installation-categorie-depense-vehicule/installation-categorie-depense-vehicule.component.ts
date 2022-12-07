import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-installation-categorie-depense-vehicule',
  templateUrl: './installation-categorie-depense-vehicule.component.html',
  styleUrls: ['./installation-categorie-depense-vehicule.component.css']
})
export class InstallationCategorieDepenseVehiculeComponent implements OnInit {
  submitted:boolean = false;
  errorcategorieDepenseVehicule:any = null;
  type = 'vehicule';
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
        console.log(data);this.next();
      })
  
  }

  next(){
  this.dataservice.countCategorieDepense(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    console.log("count of categorie",JSON.parse(data));
    if(Number(JSON.parse(data)['countVehicule']) === 0){
      this.errorcategorieDepenseVehicule = "Vous devez ajouter d'abord une categorie vehicule";
    }else{
       console.log(JSON.parse(data));
      this.addOther()
    }
   })
  }
  addOther(){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez ajouter une autre categorie vehicule?",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui'
    }).then((result) => {
      if(!result.isConfirmed) {
        this.router.navigateByUrl('/installation_categorie_depenceLocal');
      }
    })
  }
}
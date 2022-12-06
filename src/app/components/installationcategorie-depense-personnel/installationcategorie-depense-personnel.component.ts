import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-installationcategorie-depense-personnel',
  templateUrl: './installationcategorie-depense-personnel.component.html',
  styleUrls: ['./installationcategorie-depense-personnel.component.css']
})
export class InstallationcategorieDepensePersonnelComponent implements OnInit {
  submitted:boolean = false;
  errorcategorieDepensePersonnel:any = null;
  type = 'personnel';
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
        type: this.form.value.type
      }
      this.dataservice.addCategorie(localStorage.getItem('autoEcole_id'), data).subscribe(data=>{
        console.log(data);
      })
  
  }

  next(){
  // countCategorieDepense
  this.dataservice.countCategorieDepense(localStorage.getItem('autoEcole_id')).subscribe(data=>{
    console.log("count of vehicule",JSON.parse(data));
    if(Number(JSON.parse(data)['countT']) === 0){
      this.errorcategorieDepensePersonnel = "Vous devez ajouter d'abord une categorie personnel";
    }else{
       // route to categorie vehicule
     this.router.navigateByUrl('');
    }
   })
  }
}
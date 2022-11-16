import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AutoEcoleService } from 'src/app/services/auto-ecole.service';

@Component({
  selector: 'app-depence-form',
  templateUrl: './depence-form.component.html',
  styleUrls: ['./depence-form.component.css']
})
export class DepenceFormComponent implements OnInit {
  submitted:any;
  public error:any = [];
  dateVal = new Date();
  user_data:any;
  data:any;
  categorie_depense:any;
  data_employe:any;
  id_auto_ecole:any;
  form = new FormGroup({
    categorie_depence_id:  new FormControl('', Validators.required),
    employe_id:  new FormControl('', Validators.required),
    date:  new FormControl('', Validators.required),
    montant:  new FormControl('', Validators.required),
    remarque:  new FormControl(''),
  });
  constructor(private translateService: TranslationService,
              private router: Router,
               private dataservice:DataService,
               private autoEcoleService:AutoEcoleService,
               ) { }

  ngOnInit(): void {
    this.translateService.applyLanguage();
        // user_id parameter that take  
    this.autoEcoleService.getAutoEcole(1).subscribe(ecole =>{console.log("data of ecole");console.log(ecole); this.id_auto_ecole = ecole },error => this.handleError(error));
    this.dataservice.getDepense_categorie(1).subscribe(data =>{ console.log(JSON.parse(data)); this.categorie_depense = JSON.parse(data);});
    this.dataservice.getEmploye(1).subscribe(data =>{ console.log("employees"); console.log(JSON.parse(data)); this.data_employe = JSON.parse(data);});
  }
   
    AddDepence(){
      this.submitted = true;
      if(this.form.invalid){
        console.log('formulaire invalide');
        return ;
      }
      let formData = new FormData();
      return this.dataservice.AddDepence(1,
        {
          categorie_depence_id: this.form.value.categorie_depence_id,
          employe_id: this.form.value.employe_id,
          date: this.form.value.date,
          montant: this.form.value.montant,
          remarque: this.form.value.remarque,
      })
      .subscribe( data => {
        console.log('subscribe added depense');
        console.log(data);
        this.router.navigateByUrl('/listes-depenses');
      },
                  error => this.handleError(error)
      );  
    }
    handleError(error:any){
      console.log('there is an error')
      
      console.log(error)
      
    }


}

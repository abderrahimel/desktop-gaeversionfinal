import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-categorie-depense',
  templateUrl: './categorie-depense.component.html',
  styleUrls: ['./categorie-depense.component.css']
})
export class CategorieDepenseComponent implements OnInit {
  dateVal = new Date();               
  submitted:any = false;
  form = new FormGroup({
    categorie: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  addCategorie_depense(){
    this.submitted = true;
    console.log(this.form);
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    console.log("add examen");
    console.log(this.form.value);
    let id_auto_ecole = 1;
    this.dataService.addCategorie_depense(id_auto_ecole,
      {
        categorie: this.form.value.categorie,
      }
      ).subscribe(data => {
        console.log("create categorie depense");
        console.log(data);
      },
        error => this.handleError(error)
      )

  }
  handleError(error:any){
    console.log("there is an error ");
    console.log(error);
  }
}

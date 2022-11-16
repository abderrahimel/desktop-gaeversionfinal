import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-devis-form',
  templateUrl: './devis-form.component.html',
  styleUrls: ['./devis-form.component.css']
})
export class DevisFormComponent implements OnInit {
  submitted:any = false;
  data:any;
  dateVal = new Date();   
  form = new FormGroup({
       candidat_id: new FormControl('', Validators.required),
        numero: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        societe: new FormControl('', Validators.required),
        remarque: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  AddDivis(){
    this.submitted = true;
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    console.log("add devis");
    console.log(this.form.value);
    let id_auto_ecole = 1;
    this.dataService.AddDivis(id_auto_ecole,
      {
        candidat_id: this.form.value.candidat_id,
        numero: this.form.value.numero,
        date: this.form.value.date,
        societe: this.form.value.societe,
        remarque: this.form.value.remarque,
      }
      ).subscribe(data => {
        console.log("create devis");
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

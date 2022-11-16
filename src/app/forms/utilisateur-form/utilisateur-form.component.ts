import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit {

  dateVal = new Date();               
  submitted:any = false;
  form = new FormGroup({
    employe_id: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    login: new FormControl('', Validators.required),
    mot_pass: new FormControl('', Validators.required),
  })
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  addUtilisateur(){
    this.submitted = true;
    console.log(this.form);
    if(this.form.invalid){
      console.log("form invalid ");
      return;
    }
    console.log("add utilisateur");
    console.log(this.form.value);
    let id_auto_ecole = 1;
    this.dataService.addemploye(id_auto_ecole,
      {
        employe_id: this.form.value.employe_id,
        type: this.form.value.type,
        login: this.form.value.login,
        mot_pass: this.form.value.mot_pass,
      }
      ).subscribe(data => {
        console.log("create utilisateur");
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

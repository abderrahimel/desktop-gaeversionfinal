import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  dateVal = new Date();
  submitted:any;
  activetab='contact'
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }
  sendEmail(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataService.sendEmailTosuperAdmin(this.form.value).subscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from "jquery";
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-messagerie-admin',
  templateUrl: './messagerie-admin.component.html',
  styleUrls: ['./messagerie-admin.component.css']
})
export class MessagerieAdminComponent implements OnInit {
  submitted:boolean = false;
  submitted1:boolean = false;
  dataAutoEcole:any;
  hidden:boolean = false;
  url:any = '';
  form1 = new FormGroup({       
    object: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    fichier: new FormControl('', Validators.required),
  })
  form2 = new FormGroup({       
    object: new FormControl('', Validators.required),
    id_autoEcole: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    liste: new FormControl('', Validators.required),
    fichier: new FormControl('', Validators.required),
  })
  constructor(
     private auth: AuthService,
    private dataService: DataService) { }
  
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getAllAutoEcole();
      }
    })
  }
  getAllAutoEcole(){
    this.dataService.getAllAutoEcole().subscribe(data =>{
      console.log(data);
      this.dataAutoEcole = data;
    })
  }
  changeBorder(ident:any){
    if(ident === 1){
      $('#envoi').css("background", "black");
      $('#envoi').css("color", "white");
      this.hidden = false;
      $('#envoiSpecifier').css("background", "white");
      $('#envoiSpecifier').css("color", "black");
    }else{
      this.hidden = true;
      $('#envoiSpecifier').css("background", "black");
      $('#envoiSpecifier').css("color", "white");
      $('#envoi').css("background", "white");
      $('#envoi').css("color", "black");
    }
    
  }
  fileChangeEvent(e:any)
  {
      if(e.target.files && e.target.files[0])
      {    
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]); // read file as data url
          reader.onload = (event) =>{
            console.log("base64");
            console.log(reader.result);
            this.url = reader.result;
          }
      }
       
  }
  EnvoyereMail(){
    console.log("send to one");
    this.submitted = true;
    if(this.form1.invalid){
      console.log("form invalid");
      return ;
    }
    // send data to api
    this.dataService.send({
      fichier: this.url,
      object: this.form2.value.object,
      id_autoEcole: this.form2.value.id_auto_ecole,
      message: this.form2.value.message,
      liste: this.form2.value.liste,
    }).subscribe(data=>console.log(data))



  }
  EnvoyeretoAll(){
    console.log("send to all");
    this.submitted1 = true;
    if(this.form1.invalid){
      console.log("form invalid");
      return ;
    }
    // send data to api
    this.dataService.sendtoAll({
      fichier: this.url,
      object: this.form1.value.object,
      message: this.form1.value.message,
    }).subscribe(data=>console.log(data))
  
  }
}

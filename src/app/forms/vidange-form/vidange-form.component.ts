import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vidange-form',
  templateUrl: './vidange-form.component.html',
  styleUrls: ['./vidange-form.component.css']
})
export class VidangeFormComponent implements OnInit {
  submitted:any = false;
  dateVal = new Date();
  base64Img_img_facture:any;
  vehiculesData:any;
  employeData:any;
  form = new FormGroup({
    vehicule_id:new FormControl('', Validators.required),
    employe_id:new FormControl('', Validators.required),
    fournisseur_id :new FormControl('', Validators.required),
    montant:new FormControl('', Validators.required),
    date_vidange_p:new FormControl('', Validators.required),
    date_vidange:new FormControl('', Validators.required),
    img_facture:new FormControl('', Validators.required), 
  
  })
  constructor(private dataservice: DataService, ) { }

  ngOnInit(): void {
    let autoEcole_id= 1;
    this.dataservice.getVehicules(autoEcole_id).subscribe(data =>{
      console.log("list vehicules");
          console.log(JSON.parse(data));
          this.vehiculesData = JSON.parse(data);
    });
    this.dataservice.getEmploye(autoEcole_id).subscribe(data =>{
      console.log("employee");
      console.log(JSON.parse(data));
      this.employeData = JSON.parse(data);
    })
  }
  AddVidange(){
    console.log("add vidange");
    this.submitted = true;
    if(this.form.invalid){
      console.log("formulaire invalid");
      return;
    }
    let autoEcole_id = 1;
    console.log({
      vehicule: this.form.value.vehicule_id,
      employe_id: this.form.value.employe_id,
      fournisseur_id : this.form.value.fourniseur,
      montant: this.form.value.montant,
      date_vidange_p: this.form.value.date_vidange_p,
      date_vidange: this.form.value.date_vidange,
      img_facture: this.base64Img_img_facture,
     });
    // this.dataservice.addVidange(autoEcole_id, {
    //   vehicule: this.form.value.vehicule_id,
    //   employe_id: this.form.value.employe_id,
    //   	fournisseur_id : this.form.value.fourniseur,
    //   montant: this.form.value.montant,
    //   date_vidange_p: this.form.value.date_vidange_p,
    //   date_vidange: this.form.value.date_vidange,
    //   img_facture: this.base64Img_img_facture,
    //  }).subscribe(data => {
    //    console.log("add vidange to table ");
    //   console.log(data);
    // },
    //    error => this.handlerror(error)
    // ) 
  
  }
  handlerror(error:any){
    console.log("there is an error about send data vidange");
    console.log(error);
  }
  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                    const imgBase64Path = e.target.result;
                    this.base64Img_img_facture = imgBase64Path;
                  
                    
            };
        };
  
        reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}

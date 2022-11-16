import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadMoniteurAdminAction } from 'src/app/state/moniteuradmin/moniteuradmi.action';
import { MoniteuradminState } from 'src/app/state/moniteuradmin/moniteuradmin.state';
@Component({
  selector: 'app-moniteur-adminmodal',
  templateUrl: './moniteur-adminmodal.component.html',
  styleUrls: ['./moniteur-adminmodal.component.css']
})
export class MoniteurAdminmodalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  base64Img_image:any = '';
  submitted:boolean = false;
  show:boolean = true;
  form = new FormGroup({   
    nom: new FormControl('', Validators.required),   
    description: new FormControl('', Validators.required),
    salaire: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required), 
    image: new FormControl(''), 
  });
  constructor(public activeModal: NgbActiveModal,
              private dataService:DataService,
              private store: Store<{moniteuradmin: MoniteuradminState}>,
    ) { }

  ngOnInit(): void {
    if(this.btn === 'detail'){
      this.show = false
    }
    if(this.btn === 'Ajouter'){
      this.show = true
    }
    if(this.btn === 'Modifier'){
      this.show = true
    }
    this.form.patchValue({
      nom: this.data?.nom,   
      description: this.data?.description,   
      salaire: this.data?.salaire,   
      date: this.data?.date,   
  })
  }
  
  fileChangeEvent(event: any) {
  if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
                  const imgBase64Path = e.target.result;
                  this.base64Img_image = imgBase64Path;
                
                  
          };
      };

      reader.readAsDataURL(event.target.files[0]);
  }
}
gestionMoniteurJob(){
  this.submitted = true;
  if(this.form.invalid ){
    return;
  }
  if(this.btn === 'Modifier'){
    // update new moniteur
    this.dataService.updateMoniteurJob(this.data.id, {
      image: this.base64Img_image,
      nom: this.form.value.nom,   
      description: this.form.value.description,   
      salaire: this.form.value.salaire,   
      date: this.form.value.date,   
    }).subscribe(data=>{
    });
  }else{
    this.dataService.addMoniteurJob({
      image: this.base64Img_image,
      nom: this.form.value.nom,   
      description: this.form.value.description,   
      salaire: this.form.value.salaire,   
      date: this.form.value.date,   
    }).subscribe(data=>{
    });
  }
  this.store.dispatch(loadMoniteurAdminAction());
  this.activeModal.dismiss('Cross click');
}

}

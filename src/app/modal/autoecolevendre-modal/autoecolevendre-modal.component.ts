import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadautoecolevendreaction } from 'src/app/state/autoecolevendre/autoecolevendre.action';
import { AutoecolevendreState } from 'src/app/state/autoecolevendre/autoecolevendre.state';
@Component({
  selector: 'app-autoecolevendre-modal',
  templateUrl: './autoecolevendre-modal.component.html',
  styleUrls: ['./autoecolevendre-modal.component.css']
})
export class AutoecolevendreModalComponent implements OnInit {
  @Input() type: any;
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  show:boolean = true
  base64Img_image:any;
  form = new FormGroup({   
    titre: new FormControl('', Validators.required),   
    description: new FormControl('', Validators.required),
    prix: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required), 
    image: new FormControl(''), 
  });
  constructor(public activeModal: NgbActiveModal,
              private store: Store<{autoecolevendre: AutoecolevendreState}>,
              private dataservice: DataService
    ) { }

  ngOnInit(): void {
    if(this.btn === 'detail'){
      this.show = false;
    }
    if(this.btn === 'Modifier'){
      this.show = true;
    }
    if(this.btn === 'Ajouter'){
      this.show = true;
    }
    this.form.patchValue({
      titre: this.data?.titre,   
      description: this.data?.description,   
      prix: this.data?.prix,   
      date: this.data?.date,   
  });
  }

  fileChangeEvent(event: any) {
    console.log(event.target.value);
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
  gestionAutoEcole(){
      this.submitted = true;
      if(this.form.invalid ){
        console.log("form invalid");
        return;
      }
      if(this.btn === 'Modifier'){
        this.dataservice.updateAutoecoleVendre(this.data.id, {
          image: this.base64Img_image,
          titre: this.form.value.titre,      
          description: this.form.value.description,   
          prix: this.form.value.prix,   
          date: this.form.value.date,   
        }).subscribe(data=>{
          console.log("update moniteur to database", data);
        });
      }else{
        this.dataservice.addAutoecoleVendre({
          image: this.base64Img_image,
          titre: this.form.value.titre,   
          description: this.form.value.description,   
          prix: this.form.value.prix,   
          date: this.form.value.date,   
        }).subscribe(data=>{
          console.log("added moniteur to database", data)
        });
      }
      this.store.dispatch(loadautoecolevendreaction());
      this.activeModal.dismiss('Cross click');
  }
}

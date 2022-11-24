import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { BlogState } from 'src/app/state/blog/blog.state';
import { loadblogadminaction } from 'src/app/state/blog/bnlog.actions';

@Component({
  selector: 'app-blogmodal',
  templateUrl: './blogmodal.component.html',
  styleUrls: ['./blogmodal.component.css']
})
export class BlogmodalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  submitted:boolean = false;
  base64Img_image:any;
 form:any;
  constructor(public activeModal: NgbActiveModal,
              private dataServece: DataService,
              private store: Store<{blog: BlogState}>
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    if(this.btn === 'Ajouter'){
      this.createFormadd();
    }else{
      this.createFormupdate();
    }
    this.form.patchValue({
      titre: this.data?.titre,
      description: this.data?.description
    });
  }
  createFormupdate(){
    this.form = new FormGroup({           
      titre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  }
  createFormadd(){
    this.form = new FormGroup({           
      titre: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }
  fileChangeEvent(event: any) {
    console.log(event);
   if (event.target.files && event.target.files[0]) {
       const reader = new FileReader();
       reader.onload = (e: any) => {
           const image = new Image();
           image.src = e.target.result;
           image.onload = rs => {
                   this.base64Img_image = e.target.result;
                   
                   
           };
       };
 
       reader.readAsDataURL(event.target.files[0]);
   }
 }
 blog(){
  this.submitted = true;
     if(this.form.invalid){
       return;
     }
     console.log({
      titre:this.form.value.titre,
      description: this.form.value.description,
      image: this.base64Img_image
     });
      if(this.btn === 'Ajouter'){
        this.dataServece.addblog({
          titre:this.form.value.titre,
          description: this.form.value.description,
          image: this.base64Img_image
         }).subscribe(data=>{
         })
      }else{
        this.dataServece.updateblog(this.data.id, {
          titre:this.form.value.titre,
          description: this.form.value.description,
          image: this.base64Img_image
         }).subscribe(data=>{
         })
      }
      this.store.dispatch(loadblogadminaction());
      this.activeModal.dismiss('Cross click');
    
}
}

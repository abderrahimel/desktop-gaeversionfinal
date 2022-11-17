import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { DataService } from 'src/app/services/data.service';
import { loadministerielleaction } from 'src/app/state/ministerielle/ministerielle.actions';
import { MinisterielleState } from 'src/app/state/ministerielle/ministerielle.sate';

@Component({
  selector: 'app-ministeriellemodal',
  templateUrl: './ministeriellemodal.component.html',
  styleUrls: ['./ministeriellemodal.component.css']
})
export class MinisteriellemodalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  base64Img_image:any = '';
  submitted:boolean = false;
  add_type:boolean = false;
  url:any = '';
  form = new FormGroup({ 
    category: new FormControl('', Validators.required),   
    titre: new FormControl('', Validators.required),
    lien: new FormControl('', Validators.required),
    fichier: new FormControl('', [Validators.required]), 
  });
  
  constructor(public activeModal: NgbActiveModal,
              private dataService: DataService,
              private store: Store<{ministerielle: MinisterielleState}>,
    ) { }

  ngOnInit(): void {
    
    this.form.patchValue({
      titre: this.data?.titre,   
      category: this.data?.category,   
      lien: this.data?.lien,   
    });
  }
  otherType(){
    this.add_type = ! this.add_type;
    if(this.add_type){
      $('#type2').css("display", "none");
      $('#authertype').css("display", "block");
    }else{
      $('#type2').css("display", "block");
      $('#authertype').css("display", "none");
    }
  }
 

  gestionAutoEcole(){
      this.submitted = true;
      if(this.form.invalid ){
        console.log("form invalid");
        return;
      }
      console.log({
        titre: this.form.value.titre,   
        category: this.form.value.category,   
        lien: this.form.value.lien,   
        fichier: this.url, 
      });
      if(this.data !== null){
        this.dataService.updateNoteMinisterielle(this.data.id, {
          titre: this.form.value.titre,   
          category: this.form.value.category,   
          lien: this.form.value.lien,   
          fichier: this.url, 
        }).subscribe(data=>{
           this.activeModal.dismiss('Cross click');
        });
      }else{   
        this.dataService.addNoteMinisterielle({
          titre: this.form.value.titre,    
          category: this.form.value.category,   
          lien: this.form.value.lien,   
          fichier: this.url, 
        }).subscribe(data=>{
          this.store.dispatch(loadministerielleaction())
          this.activeModal.dismiss('Cross click');
        });
      }
      
  }

  fileChangeEvent(e:any)
  {
      if(e.target.files && e.target.files[0])
      {    
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]); // read file as data url
          reader.onload = (event) =>{
            this.url = reader.result;
          }
      }
       
  }

}

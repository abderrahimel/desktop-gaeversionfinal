import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addPaiment, updatePaiment } from 'src/app/state/peimentCandidat/paimentCandidat.actions';
import { PaimentCandidatState } from 'src/app/state/peimentCandidat/peimentCandidat.state';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CandidatState } from 'src/app/state/candidat/candidat.state';


@Component({
  selector: 'app-paiment-candidat-modal',
  templateUrl: './paiment-candidat-modal.component.html',
  styleUrls: ['./paiment-candidat-modal.component.css']
})
export class PaimentCandidatModalComponent implements OnInit {
  @Input() btn: any;
  @Input() data: any;
  @Input() idcandidat: any;
  hidden:any = false;
  submitted:boolean = false;
  base64Img_image:any;
  id:any;
  form = new FormGroup({ 
    date: new FormControl('', Validators.required),
    montant: new FormControl('', Validators.required),
    banque: new FormControl(''),
    type: new FormControl(''),
    numero: new FormControl(''),
    image: new FormControl(''),
    remarque: new FormControl(''),
  })
  constructor( private store:Store<{paimentCandidat: PaimentCandidatState, candidat:CandidatState,}>,
              private route: ActivatedRoute,
              public activeModal: NgbActiveModal,

    ) { }

  ngOnInit(): void {
    console.log("data candidat");
    console.log(this.data);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.form.patchValue({
      date: this.data?.date,
      montant: this.data?.montant,
      banque: this.data?.nom_banque,
      type: this.data?.type_p,
      numero: this.data?.numero,
      remarque: this.data?.remarque,
    });
    if(this.data?.type === 'espece'){
      this.hidden = true;
    }
  }
  fileChangeEvent(e: any) {

    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                       this.base64Img_image = e.target.result;
            };
        };

        reader.readAsDataURL(e.target.files[0]);
    }
}
AddOrUpdatepaiment(){
  this.submitted = true;
  if(this.form.invalid){
    console.log("form invalid ");
    return;
  }
  let idC = Number(this.route.snapshot.paramMap.get('id'));
  let data = {
    date: this.form.value.date,
    montant: this.form.value.montant,
    banque: this.form.value.banque,
    type: this.form.value.type,
    numero: this.form.value.numero,
    remarque: this.form.value.remarque,
    image: this.base64Img_image,
  };
  if(this.btn === 'Ajouter'){  // 
      // dispatch  action addPaiment
      this.store.dispatch(addPaiment({idAutoEcole:localStorage.getItem('autoEcole_id'), idCandidat: this.idcandidat, data}));
      this.activeModal.dismiss('Cross click');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Paiement bien enregistré!'
      })
   }else{
      // dispatch action    updatePaiment
      this.store.dispatch(updatePaiment({idPaiment: this.data.id, data}));
      this.activeModal.dismiss('Cross click');
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Paiement bien modifier!'
      })
     }
     //
    
     //
}
setHidden(e:any){
  if(e.target.value != 'espece'){
    this.hidden = true;
  }else{
    this.hidden = false;
  }
}
}
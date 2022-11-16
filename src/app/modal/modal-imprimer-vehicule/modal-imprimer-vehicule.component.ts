import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-imprimer-vehicule',
  templateUrl: './modal-imprimer-vehicule.component.html',
  styleUrls: ['./modal-imprimer-vehicule.component.css']
})
export class ModalImprimerVehiculeComponent implements OnInit {
  submitted:boolean = false;
  dataLoad:any;
  total:any =0;
  @Input() data: any;
  @ViewChild('Imprimer') Imprimer;
  form = new FormGroup({  
    date_debut: new FormControl('', Validators.required), 
    date_fin: new FormControl('', Validators.required), 
  });
  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    this.dataLoad = this.data
    this.dataLoad.map(data=> { this.total += Number(data.montant);console.log(this.total);});
  }

  date_debut(e){
    this.total = 0
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataLoad = this.dataLoad.filter((data:any) => data?.date > this.form.value.date_debut );
    this.dataLoad.map(data=> { this.total += Number(data.montant);console.log(this.total);});
  }
  date_fin(e){
    this.total = 0
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.dataLoad = this.data.filter((data:any) =>  data?.date < this.form.value.date_fin);
    this.dataLoad.map(data=>  {this.total += Number(data.montant);console.log(this.total)});

  }
}

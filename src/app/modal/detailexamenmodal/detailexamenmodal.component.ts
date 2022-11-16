import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detailexamenmodal',
  templateUrl: './detailexamenmodal.component.html',
  styleUrls: ['./detailexamenmodal.component.css']
})
export class DetailexamenmodalComponent implements OnInit {
  @Input() data: any;
  form = new FormGroup({
    candidat: new FormControl(''),
    categorie: new FormControl(''),
    moniteur_pratique: new FormControl(''),
    date_examen: new FormControl(''),
    date_depot: new FormControl(''),
  })
  constructor(public activeModal: NgbActiveModal,
             private dataService: DataService,
    ) { }

  ngOnInit(): void {
       this.form.patchValue({
        candidat: this.data?.candidat?.nom_fr + " " + this.data?.candidat?.prenom_fr,
        categorie: this.data?.categorie,
        moniteur_pratique: this.data?.moniteur?.nom + " " +  this.data?.moniteur?.prenom,
        date_examen: this.data?.date_examen,
        date_depot: this.data?.date_depot,
       });
  }

}

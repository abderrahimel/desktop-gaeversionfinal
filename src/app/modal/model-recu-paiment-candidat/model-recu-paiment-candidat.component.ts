import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-model-recu-paiment-candidat',
  templateUrl: './model-recu-paiment-candidat.component.html',
  styleUrls: ['./model-recu-paiment-candidat.component.css']
})
export class ModelRecuPaimentCandidatComponent implements OnInit {
  @Input() data: any;
  @Input() autoecole: any;
  @Input() candidat: any;
  @Input() user: any;
  dateOperation:any;
  @ViewChild('Imprimer') Imprimer;
  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    var mydate = new Date();
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var year = mydate.getFullYear();
    var d = mydate.getDate();
    var monthShortNames =  ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre","décembre"];
    this.dateOperation =  d + " " + monthShortNames[month] + " " + year;
  }

}

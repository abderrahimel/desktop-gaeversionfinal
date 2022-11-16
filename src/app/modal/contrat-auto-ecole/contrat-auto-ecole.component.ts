import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contrat-auto-ecole',
  templateUrl: './contrat-auto-ecole.component.html',
  styleUrls: ['./contrat-auto-ecole.component.css']
})
export class ContratAutoEcoleComponent implements OnInit {
  @Input() data: any;
 @ViewChild('Imprimer') Imprimer;
   months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  }
  date_inscriptioncontrat:any;
  constructor( public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    console.log("data auto ecole");console.log(this.data);
    var mydate = new Date();
    let date = mydate.toString().split(' ')
    let m = date[1]
     this.date_inscriptioncontrat = date[3]+'/'+ this.months[m] +'/'+ date[2];
     console.log(this.date_inscriptioncontrat);
  }

}

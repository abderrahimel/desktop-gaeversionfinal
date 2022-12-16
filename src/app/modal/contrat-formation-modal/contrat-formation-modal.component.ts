import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contrat-formation-modal',
  templateUrl: './contrat-formation-modal.component.html',
  styleUrls: ['./contrat-formation-modal.component.css']
})
export class ContratFormationModalComponent implements OnInit {
    @Input() data: any;
    @Input() autoecole: any;
    @Input() user: any;
  dateOperation:any;
  date_inscriptioncontrat:any;
  @ViewChild('Imprimer') Imprimer;
  constructor(public activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
    const months = {
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
    var mydate = new Date();
    let date = mydate.toString().split(' ')
    let m = date[1]
     this.date_inscriptioncontrat = date[3]+'/'+ months[m] +'/'+ date[2];
  }

}
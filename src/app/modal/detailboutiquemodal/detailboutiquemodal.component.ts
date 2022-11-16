import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-detailboutiquemodal',
  templateUrl: './detailboutiquemodal.component.html',
  styleUrls: ['./detailboutiquemodal.component.css']
})
export class DetailboutiquemodalComponent implements OnInit {
  @Input() data: any;
  constructor(public activeModal: NgbActiveModal,
    
    ) { }

  ngOnInit(): void {
  }

}

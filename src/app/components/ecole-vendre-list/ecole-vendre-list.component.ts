import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ecole-vendre-list',
  templateUrl: './ecole-vendre-list.component.html',
  styleUrls: ['./ecole-vendre-list.component.css']
})
export class EcoleVendreListComponent implements OnInit {
  dateVal = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}

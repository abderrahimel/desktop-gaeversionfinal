import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare var $;
@Component({
  selector: 'app-plan-pratique',
  templateUrl: './plan-pratique.component.html',
  styleUrls: ['./plan-pratique.component.css']
})
export class PlanPratiqueComponent implements OnInit, AfterViewInit {
  @ViewChild('dataTable', {static: false}) table;

  dateVal = new Date();
  pratique_data:any;
  dataTable:any;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
}

}


 
 
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef, AfterViewInit
} from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import { AuthService } from "src/app/services/auth/auth.service";


@Component({
  selector: 'app-monitors',
  templateUrl: './monitors.component.html',
  styleUrls: ['./monitors.component.css']
})
export class MonitorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  moniteurs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
 actualites:any;
  constructor(private dataService:DataService,
    private auth:AuthService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        this.getMoniteurJob()
      }
    })
  }
  ngAfterViewInit(): void {
    this.dataSource  =  new MatTableDataSource<any>(this.actualites);
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }
  getMoniteurJob(){
    this.dataService.getMoniteurJob().subscribe(data=>{
      this.actualites = JSON.parse(data)
      this.actualites.map(blog=>{
        blog.created_at = blog?.created_at.split('T')[0];
        if(blog.description.length > 107){
          blog.description = blog.description.substring(0, 107) + '...';
        }
      });
       this.dataSource  =  new MatTableDataSource<any>(this.actualites);
       this.dataSource.data = this.actualites
       this.changeDetectorRef.detectChanges();
       this.dataSource.paginator = this.paginator;
       this.moniteurs = this.dataSource.connect();
    })
  }
 
  applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  onchangeInput(e:any){
    if(e.target.value === ''){
      this.dataSource = new MatTableDataSource(this.actualites);
    }else{
        let filterData = _.filter(this.actualites, (item)=>{
             return item.titre.toLowerCase() == e.target.value.toLowerCase();
         
        })
        this.dataSource = new MatTableDataSource(filterData);
    }
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.moniteurs = this.dataSource.connect();
  
  }
}

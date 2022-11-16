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
import { Observable, of } from "rxjs";
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash';
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: 'app-ecoles',
  templateUrl: './ecoles.component.html',
  styleUrls: ['./ecoles.component.css']
})
export class EcolesComponent  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  blogs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
 actualites:any;
  constructor(private dataService:DataService,
              private auth: AuthService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.auth.authStatus.subscribe( value =>{
      if(value){
        this.getBlogs()
      }else{
        this.blogs = of([]);
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
    getBlogs(){
     
    this.dataService.getAbonnementAutoEcole().subscribe(data=>{
      this.actualites = data
      this.actualites.map(blog=>blog.created_at = blog?.created_at.split('T')[0]);
       this.dataSource  =  new MatTableDataSource<any>(this.actualites);
       this.dataSource.data = this.actualites
       this.changeDetectorRef.detectChanges();
       this.dataSource.paginator = this.paginator;
       this.blogs = this.dataSource.connect();
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
    this.blogs = this.dataSource.connect();
  
  }
}

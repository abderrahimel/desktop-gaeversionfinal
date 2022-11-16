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

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent  implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  blogs!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
 actualites:any;
  constructor(private dataService:DataService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getBlogs()
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
    this.dataService.getBlogs().subscribe(data=>{
      this.actualites = JSON.parse(data)
      this.actualites.map(blog=>{
        blog.created_at = blog?.created_at.split('T')[0];
        blog.titre = blog.titre.substring(0, 20) + '...';
        blog.description = blog.description.substring(0, 70) + '...';
      });
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

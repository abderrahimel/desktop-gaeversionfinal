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
import { loadVehiculeOccasion } from "src/app/state/vehiculeOccasion/vehiculeOccasion.actions";
import { Store } from "@ngrx/store";
import { VehiculeOccasionState } from "src/app/state/vehiculeOccasion/vehiculeOccasion.state";
import { take } from "rxjs/operators";

@Component({
  selector: 'app-vehicule-occasions',
  templateUrl: './vehicule-occasions.component.html',
  styleUrls: ['./vehicule-occasions.component.css']
})
export class VehiculeOccasionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  vendres!: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
 actualites:any;
 nvehiculeOccasion:any;
 vehiculeOccasion:any;
 slideConfig = {slidesToShow: 1,
  infinite: true,
  variableWidth: true,
  outerEdgeLimit: true,
  nextArrow: '<div style=\'position: absolute; top: 35%; right: 5px; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-right"></i></div>',
  prevArrow: '<div style=\'position: absolute; top: 35%; left: 5px; z-index: 1; cursor: pointer;color:red; border-radius:50%;padding:7px;border:1px solid rgb(252, 248, 248);background:rgb(252, 248, 248)\' class=\'next-slide\'><i class="fa fa-angle-double-left"></i></div>',};
  constructor(private dataService:DataService,
    private auth:AuthService,
              private changeDetectorRef: ChangeDetectorRef,
              private store:Store<{vehiculeOccasion: VehiculeOccasionState}>
              ) {
  }

  ngOnInit() {
    this.auth.authStatus.subscribe(value=>{
      if(value){
        // this.getVehiculeOccasion()
        this.getData()
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
  getVehiculeOccasion(){
    this.dataService.getVehiculeOccasion().subscribe(data=>{
      this.actualites = data
      this.actualites.map(blog=>{
        blog.created_at = blog?.created_at.split('T')[0];
        if(blog.description.length > 107){
          blog.description = blog.description.substring(0, 107) + '...';
          blog.titre = blog.titre.substring(0, 107) + '...';
        }
      });
       this.dataSource  =  new MatTableDataSource<any>(this.actualites);
       this.dataSource.data = this.actualites
       this.changeDetectorRef.detectChanges();
       this.dataSource.paginator = this.paginator;
       this.vendres = this.dataSource.connect();
    })
  }
  getData(){
    this.store.pipe(take(1)).subscribe(store=>{
     
      if(!store.vehiculeOccasion.vehiculeOccasion.loaded){
        this.store.dispatch(loadVehiculeOccasion());
      }

    })
    this.store.select(state=>state.vehiculeOccasion.vehiculeOccasion.vehiculeOccasion).subscribe(vehiculeOccasion=>{
      this.vehiculeOccasion = vehiculeOccasion;
      if(this.vehiculeOccasion){
        this.nvehiculeOccasion = this.vehiculeOccasion.reduce((acc, o) => acc + Object.keys(o).length, 0);
      }else{
        this.nvehiculeOccasion = 0
      }
    })
  }
  trackByIdvehicule(index: number, item: any) {
    return item.id
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
    this.vendres = this.dataSource.connect();
  
  }
  addSlide() {
  }
      
  removeSlide() {
  }
      
  slickInit(e) {
  }
      
  breakpoint(e) {
  }
  
  afterChange(e) {
  }
  
  beforeChange(e) {
  }  
}

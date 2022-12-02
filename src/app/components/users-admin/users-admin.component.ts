import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, StoreFeatureModule } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data.service';
import { loadusersaction } from 'src/app/state/users/users.actions';
import { UsersState } from 'src/app/state/users/users.state';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit,AfterViewInit {              
  displayedColumns: string[] = ['login', 'email', 'type', 'ville', 'fixe', 'gsm', 'actions'];    
  dataSource = new MatTableDataSource();
  posts:any;
  n:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataLoad:any;
  allAutoEcole:any;
  dateVal = new Date();
  users:any;
  dataOfUser:any = [];
  constructor(private dataService: DataService,
              private store:Store<{users: UsersState}>,
              private auth:AuthService
    ) { }

  ngOnInit(): void {
     this.auth.authStatus.subscribe(value=>{
      if(value){
        this.loadUsers();
      }
     })
  }
  ngAfterViewInit() {
    
   }
   applyFilter(event:any){
    let value = event.target.value
    this.dataSource.filter = value.trim().toLowerCase()
  }
  loadUsers(){
    this.store.pipe(take(1)).subscribe(store=>{
      if(!store.users.users.loaded){
        this.store.dispatch(loadusersaction());
      }
    })
    this.store.select(state=>state.users.users.users).subscribe(users=>{
      this.dataOfUser = users;
      this.dataSource = new MatTableDataSource(this.dataOfUser)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getusers(){
    this.dataService.getUsersAutoEcole().subscribe(data=>{
      this.dataLoad = data;
      this.dataSource = new MatTableDataSource(this.dataLoad)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  deletUser(id:any){
    Swal.fire({
      title: 'confirmation',
      text: "Vous voulez vraiment confirmer la suppression !",
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'annuler',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'oui, supprimer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteUser(id).subscribe(data =>{
          this.store.dispatch(loadusersaction());
        }) 
      }
    })
 
  }
}    

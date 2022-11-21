import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  dateVal = new Date();
  form = new FormGroup({});
  constructor(private dataService:DataService,
              public toastr: ToastrService,
              private router:Router
    ) { }

  ngOnInit(): void {
    // this.dataService.getData().subscribe(data=>console.log(data));
  }
  resendEmail(){
    this.dataService.resendEmail().subscribe(data=>{
      this.showSuccess();
    })
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/login');
  }
  showSuccess(){
    this.toastr.success('veuillez vérifier votre email', '', {
   timeOut: 3000,
 });
   }
}

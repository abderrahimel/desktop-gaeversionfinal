import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  dateVal = new Date();
  form = new FormGroup({});
  constructor(private dataService:DataService,
    public toastr: ToastrService
    ) { }

  ngOnInit(): void {
    // this.dataService.getData().subscribe(data=>console.log(data));
  }
  resendEmail(){
    this.dataService.resendEmail().subscribe(data=>{
      this.showSuccess();
    })
  }

  showSuccess(){
    this.toastr.success('veuillez vérifier votre email', '', {
   timeOut: 3000,
 });
   }
}

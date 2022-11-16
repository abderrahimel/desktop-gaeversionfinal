import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoEcoleService {

  constructor(private httpclient: HttpClient) { }
  getAutoEcole(user_id:any){
    return this.httpclient.get<any[]>('http://127.0.0.1:8000/all-auto-ecole/'+user_id);
  }
  insertAutoEcole(data:any){
    return this.httpclient.post('https://api.j2hb.com/add-auto-ecole',data);
   
  }
}

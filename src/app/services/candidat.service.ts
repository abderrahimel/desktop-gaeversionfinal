import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({    
  providedIn: 'root'
})
export class CandidatService {
  api:string = 'http://127.0.0.1:8000';
  constructor( private http: HttpClient,private _router:Router) { }
  
  getCandidat(id_auto_ecole:any){
    return this.http.get<any[]>('http://127.0.0.1:8000/auto-ecole/'+id_auto_ecole+'/candidat');
  }
  getCandidatById(id_candidat:any){
    return this.http.get<any[]>('http://127.0.0.1:8000/candidat/'+ id_candidat);
  }
  getListCandidat(list_candidat:any){
    return this.http.get<any[]>('http://127.0.0.1:8000/auto-ecole/listCandidat/'+list_candidat);
  }
  getCandidatHistorique(id_auto_ecole:any){
    return this.http.get<any[]>('http://127.0.0.1:8000/auto-ecole/'+id_auto_ecole+'/historiquecandidat');
  }

  getarchivecandidat(id_auto_ecole:any){
    return this.http.get<any[]>('http://127.0.0.1:8000/auto-ecole/'+id_auto_ecole+'/archivecandidat');
  }

  insertCandidat(data:any, id:any){ 
    return this.http.post('https://api.j2hb.com/add-candidat/'+id,data);
  }
  newcandidat(idautoecole:any, data:any){
    return this.http.post(this.api+'/add-candidat/'+idautoecole, data, { responseType: 'text'})
  }
  updatecandidat(id:any, data:any)
   {
    return this.http.put(this.api+'/update-candidat/'+id, data, { responseType: 'text'})
   } 
 AddOrUpdateCandidat(is_update:any, data:any, id_ecoleOrCandidat:any){
    if(is_update){
      return this.http.put(this.api+'/update-candidat/'+id_ecoleOrCandidat, data, { responseType: 'text'})
    }else{
      return this.http.post(this.api+'/add-candidat/'+id_ecoleOrCandidat, data, { responseType: 'text'})
    }
  }
  getPaimentsCandidats(ecole_id:any){
    // /auto-ecole/{ecole_id}/paiementCandidat
    return this.http.get(this.api + '/auto-ecole/'+ecole_id+'/paiementCandidat')
}
  deleteCandidat(id:any){
    return this.http.delete(this.api+'/delete-candidat/'+id);
  }
  desactiverCandidat(id:any){
    return this.http.post(this.api+'/desactiver-candidat/'+id, { responseType: 'text'});
  }
  activerCandidat(id:any){
    return this.http.post(this.api+'/activer-candidat/'+id, { responseType: 'text'});
  }
  recuperer(id:any){
    return this.http.post(this.api+'/recuperer-candidat/'+id, { responseType: 'text'});
  }
}

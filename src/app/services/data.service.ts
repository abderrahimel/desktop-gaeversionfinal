import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  headers:any;
  requestOptions:any;
  auth_token:any;
  api:string = 'http://127.0.0.1:8000';

  constructor(private httpclient: HttpClient, private log: AuthService) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `18|Spckr2i5P9LLASsCMTSyuJzMC8xpu5kNzaIDjzpT`
    });
    this.requestOptions = { headers: this.headers };
  }

  id= this.log.getId();
  getPresenceTByCour(id:any, ecole_id){
    return this.httpclient.get( this.api + '/auto-ecole/' + ecole_id +'/get-presence-cour-theoriqueByCour/' + id, { responseType: 'text'});
  }
  modifier(idAutoecole:any, data:any){
    return this.httpclient.put(this.api + '/modifier-auto-ecole/'+ idAutoecole, data, { responseType: 'text'});
  }
  forgotPassword(data:any){
    return this.httpclient.post(this.api + '/forgot-password', data, { responseType: 'text'});
  }
  resendEmail(){
    return this.httpclient.post(this.api + '/email/verification-notification', { responseType: 'text'});
  }
  verifyPin(data:any){
    return this.httpclient.post(this.api + '/verify/pin', data, { responseType: 'text'});
  }
  resetPass(data:any){
    return this.httpclient.post(this.api + '/reset-password', data, { responseType: 'text'});
  }
  getPresencecourPByIdCour(ecole_id:any, id:any){
    return this.httpclient.get( this.api + '/auto-ecole/' + ecole_id +'/get-presence-cour-pratiqueByCour/' + id, { responseType: 'text'});
  }
  getVehicule(){
    return this.httpclient.get<any[]>('https://api.j2hb.com/vehicule/'+this.id);
  }
  getVehicules(ecole_id:any){   
    return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/vehicule', { responseType: 'text'});
  }    
  getVisiteTechnique(id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+id+'/visite-technique', { responseType: 'text'});
  }
  getVidange(id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+id+'/vidange', { responseType: 'text'});
  }
  // assurance
  getAssurance(id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+id+'/assurance', { responseType: 'text'});
  }
  getPresenceCourPratique(ecole_id:any){
    return this.httpclient.get(this.api+'/auto-ecole/'+ ecole_id +'/get-presence-cour-pratique');
  } 
 currentAutoEcoleid(){
  return this.httpclient.get('http://localhost:8000/current-auto-ecole-id');
 }
  addPresenceCourPratique(id_auto_ecole:any, data:any){
    return this.httpclient.post(this.api + '/add-presence-cour-pratique/'+ id_auto_ecole, data, { responseType: 'text'});
  }
  add_UpdateProduit(add_or_update:any, id:any, data:any){
    if(add_or_update){
      return this.httpclient.put(this.api + '/update-produit/'+ id, data, { responseType: 'text'});
    }else{
      return this.httpclient.post(this.api + '/add-produit/'+ id, data, { responseType: 'text'});
    }

  }
  sendEmailTosuperAdmin(data:any){
    return this.httpclient.post(this.api + '/send-email-toSuperAdmin', data, { responseType: 'text'});
  }
  addProduit(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-produit/'+ idAutoEcole, data, { responseType: 'text'});
  }
  updateProduit(id:any, data:any){ 
    return this.httpclient.put(this.api + '/update-produit/'+ id, data, { responseType: 'text'});
  }
  deleteAbsenceVente(id:any){
    return this.httpclient.delete(this.api + '/delete-produit/'+ id, {responseType: 'text'});
  }
  deleteProduit(id:any){
    return this.httpclient.delete(this.api + '/delete-produit/'+ id, {responseType: 'text'});
  }
  deleteVente(id:any){
    return this.httpclient.delete(this.api + '/delete-vente/'+ id, {responseType: 'text'});
  }
  getProduit(id_autoecole){
    return this.httpclient.get(this.api + '/auto-ecole/' + id_autoecole +'/produit', { responseType: 'text'});
  }
 
  getProductById(id:any){ 
      return this.httpclient.get(this.api + '/produit/' + id, { responseType: 'text'});
  }
  getProduitById(id:any){
    return this.httpclient.get(this.api + '/produit/' + id, { responseType: 'text'});
  }
  getVenteById(id:any){
    return this.httpclient.get(this.api + '/vente/' + id, { responseType: 'text'});
  }
 
  addVente(id:any, data:any){
    return this.httpclient.post(this.api + '/add-vente/'+ id, data, { responseType: 'text'});
  }
  updateVente(id:any, data:any){
    return this.httpclient.put(this.api + '/update-vente/'+ id, data, { responseType: 'text'});
  }
  getProduitCandidats(idAutoEcole:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + idAutoEcole + '/get-produit-candidats', { responseType: 'text'});
  }

  getVentes(auto_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + auto_id + '/vente', { responseType: 'text'});
  }

  addOrUpdateDepense(id:any, is_update:any, btn:any, auto_id:any, data){
    if(is_update === false){
      if(btn === 0){
        return this.httpclient.post(this.api + '/add-depence/'+ auto_id, data, { responseType: 'text'});
      }else if(btn === 1){
        return this.httpclient.post(this.api + '/add-depence-vehicule/'+ auto_id, data, { responseType: 'text'});
      }else{
        return this.httpclient.post(this.api + '/add-depence-local/'+ auto_id, data, { responseType: 'text'});
      }
    }else{
      return this.httpclient.put(this.api + '/update-depence/'+ id, data, { responseType: 'text'});
    }
   
  }
  addDepenseLocal(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-depence-local/'+ idAutoEcole, data, { responseType: 'text'});
  }
  addDepensePersonnel(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-depence/'+ idAutoEcole, data, { responseType: 'text'});
  }
  updateDepensePersonnel(id:any, data:any){
    return this.httpclient.put(this.api + '/update-depence/'+ id, data, { responseType: 'text'});
  }
  addDepenselocal(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-depence-local/'+ idAutoEcole, data, { responseType: 'text'});
  }
  updateDepenselocal(id:any, data:any){
    return this.httpclient.put(this.api + '/update-depence-local/'+ id, data, { responseType: 'text'});
  }
  addDepensevehicule(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-depence-vehicule/'+ idAutoEcole, data, { responseType: 'text'});
  }
  updateDepensevehicule(id:any, data:any){
    return this.httpclient.put(this.api + '/update-depence-vehicule/'+ id, data, { responseType: 'text'});
  }
  getDepensePersonnel(auto_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + auto_id + '/depence');
  }
  getDepenceVehicule(id_auto_ecole:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + id_auto_ecole +'/depence-vehicule');
  }
  getDepenseCategoriesById(id:any){
    return this.httpclient.get(this.api + '/categorie-depence/' + id);
  }
  getDepenceLocal(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + ecole_id + '/depence-local');
  }
  getDepenseLocal(id:any){
    return this.httpclient.get(this.api + '/depence-local/' + id);
  }
  updateDepenceLocal(id:any, data:any){
    return this.httpclient.put(this.api + '/update-depence-local/'+ id, data, { responseType: 'text'});
  }
  deletDepenceLocal(id:any){
    return this.httpclient.delete(this.api + '/delete-depence-local/'+id);
  }
  depenceVehicule(id:any){
    return this.httpclient.get(this.api + '/depence-vehicule/' + id);
  }
  updateDepenceVehicule(id:any, data:any){
    return this.httpclient.put(this.api + '/update-depence-vehicule/'+ id, data, { responseType: 'text'});
  }
  deleteVehiculeDepence(id:any){
    return this.httpclient.delete(this.api + '/delete-depence-vehicule/'+id);
  }
  addCategorie(id_autoEcole:any, data:any){
    return this.httpclient.post(this.api +'/add-categorie-depence/' + id_autoEcole, data, { responseType: 'text'});
  }
  getCategories(id_auto_ecole:any){ 
      return this.httpclient.get(this.api + '/auto-ecole/' + id_auto_ecole + '/categorie-depence');
  }

  getPresenceCourTheorique(ecole_id:any){  
    return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/presence-cour-theorique', { responseType: 'text'});
  }

  deleteDepenseCategorie(id:any){
    return this.httpclient.delete(this.api + '/delete-categorie-depence/'+id);
  }
  getCategorieDepenseVehicule(idAuto:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + idAuto + '/categorie-depence-vehicule', { responseType: 'text'});
  }
  getCategorieDepensePersonnel(idAuto:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + idAuto + '/categorie-depence-personnel', { responseType: 'text'});
  }
  getCategorieDepenseLocal(idAuto:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + idAuto + '/categorie-depence-local', { responseType: 'text'});
  }
updateDepenseCategorie(id:any, data:any){
    return this.httpclient.put(this.api + '/update-categorie-depence/'+id, data, { responseType: 'text'});
}
  deletPresenceCourT(id:any){
    return this.httpclient.delete(this.api + '/delete-presence-cour-theorique/'+id);
  }
  deletPresenceCourP(id:any){
    return this.httpclient.delete(this.api + '/delete-presence-cour-pratique/'+id);
  }
  getPresencePByIdCour(id:any){
    return this.httpclient.get( this.api + '/get-presence-cour-pratiqueByCour/' + id, { responseType: 'text'});
  }
  ModifierPresenceCourTheorique(id_presence:any, data:any){
   
      return this.httpclient.put(this.api + '/update-presence-cour-theorique/'+ id_presence, data, { responseType: 'text'});
   
   
  }
  ModifierPresenceCourPratique(id_presence:any, data:any){
    return this.httpclient.put(this.api + '/update-cour-presence-pratique/'+id_presence, data, { responseType: 'text'});
  }

  getMoniteurP(ecole_id:any){
    return this.httpclient.get( this.api + '/auto-ecole/'+ecole_id+'/moniteur-pratiquetrash')
  }
  getMoniteursP(ecole_id:any){
    return this.httpclient.get( this.api + '/auto-ecole/'+ecole_id+'/moniteur-pratique')
  }
  getPresenceCouP(ecole_id:any){
    return this.httpclient.get( this.api + '/auto-ecole/'+ecole_id+'/presence-cour-pratique')
  }
  getAutoEcoleByIdUser(userId:any){
    return this.httpclient.get( this.api + '/auto-ecole-user/' + userId);
  }
  getMoniteurtById(id:any){
    return this.httpclient.get( this.api + '/moniteur-theorique/'+id)
  }
  getMoniteurpById(id:any){
    return this.httpclient.get( this.api + '/moniteur-pratique/'+id)
  }
  getCourPById(id:any){
    return this.httpclient.get( this.api + '/cour-pratique/'+id)
  }
  getCategoriePermis(ecole_id:any){
    return this.httpclient.get( this.api + '/auto-ecole/'+ ecole_id + '/categorie-permis')
  }
  getCategoriePermisById(id:any){
    return this.httpclient.get( this.api + '/categorie-permis/'+ id);
  }
  getMoniteurT(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/moniteur-theorique')
  }

  getDepense(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/depence');
  }
  getAbsence(ecole_id:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/'+ ecole_id +'/absence', { responseType: 'text'});
  }
  updateAbsence(id:any, data:any){
    return this.httpclient.put(this.api + '/update-absence/'+ id, data, { responseType: 'text'});
  }
  getAbsenceById(id:any){
    return this.httpclient.get(this.api + '/absence/'+ id, { responseType: 'text'});
  }
  getExamen(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ ecole_id + '/examen');
  }
  getExamenReussi(ecole_id:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/' + ecole_id + '/candidat-reussi', { responseType: 'text'});
  } 
  getExamenNoReussi(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/' + ecole_id + '/candidat-Noreussi', { responseType: 'text'});
  }
  getEmploye(ecole_id:any){  //
    return this.httpclient.get(this.api + '/auto-ecole/' + ecole_id + '/employe', { responseType: 'text'});
  }
  getEmployeById(id:any){  //
    return this.httpclient.get(this.api + '/employe/' + id , { responseType: 'text'});
  }
  getCourTheorique(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ ecole_id +'/cour-theorique', { responseType: 'text'});
  }
  getCourPratique(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ ecole_id +'/cour-pratique', { responseType: 'text'});
  } 
  getCourTById(id:any){
    return this.httpclient.get(this.api + '/cour-theorique/'+ id , { responseType: 'text'});
  }
  getDepense_categorie(ecole_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ ecole_id +'/categorie-depence', { responseType: 'text'});
  }
  getDepense_categorieById(id:any){
    return this.httpclient.get(this.api + '/categorie-depence/'+ id, { responseType: 'text'});
  }
  getDepence(id:any){
    return this.httpclient.get(this.api + '/depence/'+ id, { responseType: 'text'});
  }
  getvehiculeById(id:any){
    return this.httpclient.get(this.api + '/vehicule/'+ id, { responseType: 'text'});
  }
  insertCandidat(data:any){
    return this.httpclient.post('https://api.j2hb.com/add-candidat/2',data);
  
  }

  getCandidat(auto_id:any){
      return this.httpclient.get(this.api + '/auto-ecole/'+ auto_id + '/candidatTrash', { responseType: 'text'});
  }
  getCandidatsBasic(auto_id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ auto_id + '/getCandidatsBasic', { responseType: 'text'});
} 
getCandidatsSupplementaire(auto_id:any){
  return this.httpclient.get(this.api + '/auto-ecole/'+ auto_id + '/getCandidatsSupplementaire', { responseType: 'text'});
}
getCandidats(auto_id:any){
  return this.httpclient.get(this.api + '/auto-ecole/'+ auto_id + '/getCandidats', { responseType: 'text'});
}
  getCandidatById(id:any){
    return this.httpclient.get(this.api + '/candidat/'+ id, { responseType: 'text'});
  }
  insertVehicule(data){
    return this.httpclient.post('https://api.j2hb.com/add-vehicule/'+this.id,data);
  }
  insertAbsence(id_auto_ecole:any, data:any){
    return this.httpclient.post(this.api + '/add-absence/'+ id_auto_ecole, data, { responseType: 'text'});
  }
  addCoursTheorique(is_update:any, auto_id:any, id:any, data:any){
    if(is_update){ 
      return this.httpclient.put(this.api + '/auto-ecole/' + auto_id + '/update-presence-cour-theorique/'+id, data, { responseType: 'text'});
    }else{
      return this.httpclient.post(this.api + '/add-cour-theorique/'+id, data, { responseType: 'text'});
    }  
  }
  addCourTheorique(id:any, data:any){
    return this.httpclient.post(this.api + '/add-cour-theorique/'+id, data, { responseType: 'text'});
  }
  updateCourTheorique(id:any,auto_id:any, data:any){
    return this.httpclient.put(this.api + '/auto-ecole/' + auto_id +'/update-cour-theorique/' + id, data, { responseType: 'text'});
  }
  addCourPratique(auto_id:any, is_update:any, id:any, data:any){
    if(is_update){
      return this.httpclient.put(this.api + '/auto-ecole/'+ auto_id +'/update-cour-pratique/'+id, data, { responseType: 'text'});
    }else{
      return this.httpclient.post(this.api + '/add-cour-pratique/'+id,data);
    }  
  }  
  adCourPratique(id:any, data:any){
    return this.httpclient.post(this.api + '/add-cour-pratique/'+id,data);
  }
  updatecourpratique(auto_id:any,id:any, data:any){
    return this.httpclient.put(this.api + '/auto-ecole/'+ auto_id +'/update-cour-pratique/'+id, data, { responseType: 'text'});
  }
  addVidange(ecole_id:any, data:any){
    return this.httpclient.post(this.api + '/add-cour-pratique/'+ecole_id,data);
  }
  addNoteCandidat(idExamen:any, data:any){
        return this.httpclient.post(this.api + '/add-note-candidat/' + idExamen,data, { responseType: 'text'});
  }
  deletCourT(id:any){
    return this.httpclient.delete(this.api + '/delete-cour-theorique/'+id);
  }
  deletCourP(id:any){
    return this.httpclient.delete(this.api + '/delete-cour-pratique/'+id);
  }
  deleteEmployee(id:any){
    return this.httpclient.delete(this.api + '/delete-employe/'+id);
  }

  updateEmploye(id:any, data:any){
    return this.httpclient.put(this.api + '/update-employe/'+id, data, { responseType: 'text'});
  }

  deletDepense(id:any){
    return this.httpclient.delete(this.api + '/delete-depence/'+id);
  }

   deleteDepenseLocal(id:any){
    return this.httpclient.delete(this.api + '/delete-depence-local/'+id);
   }
  deletedepensep(id:any){
     return this.httpclient.delete(this.api + '/delete-depence/'+id);
  }

  deleteVehicule(id:any){
    return this.httpclient.delete(this.api + '/delete-vehicule/'+id);
  }
  AddOrModifierVehicule(is_update:any, id:any, data:any){
    if(is_update){
        return this.httpclient.put(this.api + '/update-vehicule/'+id, data, { responseType: 'text'});
    }else{
        return this.httpclient.post(this.api + '/add-vehicule/'+id, data, { responseType: 'text'});
    }
  }  
  advehicule(id:any, data:any){
    return this.httpclient.post(this.api + '/add-vehicule/'+id, data, { responseType: 'text'});
  }
  upvehicule(id:any, data:any){
    return this.httpclient.put(this.api + '/update-vehicule/'+id, data, { responseType: 'text'});
  }
  addExamen(idAutoEcole:any, data:any){
    return this.httpclient.post(this.api + '/add-examen/'+idAutoEcole, data, { responseType: 'text'});
  }
  updateExamen(id:any, data:any){
    return this.httpclient.put(this.api + '/update-examen/'+id, data, { responseType: 'text'});
  }
  deleteExamen(id:any){
    return this.httpclient.delete(this.api + '/delete-examen/'+id);
  }
  getExamenById(id:any){
    return this.httpclient.get(this.api + '/examen/'+id);
  }
  deleteAbsence(id:any){
    return this.httpclient.delete(this.api + '/delete-absence/'+id);
  }
  addemploye(auto_ecole_id:any, data:any){
    return this.httpclient.post( this.api +'/add-employe/'+auto_ecole_id, data, { responseType: 'text'});
  } 
  updateMoniteur(id:any, data:any){
    return this.httpclient.put(this.api + '/update-moniteur/'+ id, data, { responseType: 'text'})
  }
  add_orUpdatefacture(id:any, is_add:any, data:any){
    if(is_add){
        return this.httpclient.post(this.api + '/add-facture/'+id, data, { responseType: 'text'});
    }else{ 
        return this.httpclient.put(this.api + '/update-facture/'+ id, data, { responseType: 'text'})
    }
  }

  addFacture(idAutoEcole:any, data:any){ 
    return this.httpclient.post(this.api + '/add-facture/' + idAutoEcole, data, { responseType: 'text'});
  }
  updateFacture(id:any, data:any){
    return this.httpclient.put(this.api + '/update-facture/'+ id, data, { responseType: 'text'})
  }
  deletFacture(id:any){
    return this.httpclient.delete(this.api + '/delete-facture/'+id);
  }
  AddDepence(auto_ecole_id:any, data:any){
    return this.httpclient.post(this.api + '/add-depence/'+auto_ecole_id, data, { responseType: 'text'});
  }
  AddDivis(auto_ecole_id:any, data:any){ 
    return this.httpclient.post(this.api + '/add-devis/'+auto_ecole_id, data, { responseType: 'text'});
  }
  getFactureById(id:any){
    return  this.httpclient.get(this.api + '/facture/'+id);
  }
  AddOrModifierNote(action:any,id:any, data:any){ 
    if(action){
      return this.httpclient.put(this.api + '/update-note/'+ id, data, { responseType: 'text'})
    }else{
      return this.httpclient.post( this.api + '/add-notes/' + id, data, { responseType: 'text'});
    }
  } 
  addNote(idautoEcole:any, data:any){
    return this.httpclient.post( this.api + '/add-notes/' + idautoEcole, data, { responseType: 'text'});
  }
  
  updateNote(id:any, data:any){
    return this.httpclient.put(this.api + '/update-note/'+ id, data, { responseType: 'text'})
  }

  getNotes(auto_ecole_id:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/'+auto_ecole_id +'/get-notes/', { responseType: 'text'});
  }

  getFactures(auto_ecole_id:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/'+auto_ecole_id +'/get-factures', { responseType: 'text'});
  } 

  deleteNote(id:any){
    return this.httpclient.delete(this.api + '/delete-note-categorie/'+id);
  }
  getNoteById(id:any){
     return  this.httpclient.get(this.api + '/get-note-categorie/'+id);
  }
   AddPaiment(auto_ecole_id:any, id_candidat:any, data:any){ 
    return this.httpclient.post(this.api + '/auto-ecole/'+auto_ecole_id +'/add-paiementCandidat/' + id_candidat , data, { responseType: 'text'});
  } 

  getPaimentCandidat(auto_ecole_id:any, id_candidat:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/'+auto_ecole_id +'/get-paiementCandidat/' + id_candidat, { responseType: 'text'});
  } 
  getPaimentCandidatById(id:any){ 
    return this.httpclient.get(this.api + '/paiementCandidat/'+id, { responseType: 'text'});
  } 
  getPaiementCandidats(autoEcoleId:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ autoEcoleId +'/paiementCandidat', { responseType: 'text'});
  }
  deletepaimentCandidat(id:any){
    return this.httpclient.delete(this.api + '/delete-paiment-candidat/'+id);
  }
  AddOrUpdatepaiment(is_update:any, id:any, id_candidat:any, data:any){
  
    if(is_update){
      return this.httpclient.put(this.api+'/update-paiment-candidat/'+id, data, { responseType: 'text'})
    }else{
      return this.httpclient.post(this.api + '/auto-ecole/'+id +'/add-paiementCandidat/' + id_candidat , data, { responseType: 'text'});
    }
  }

  addPaiment(idAutoEcole:any, idCandidat:any, data:any){
    return this.httpclient.post(this.api + '/auto-ecole/' + idAutoEcole +'/add-paiementCandidat/' + idCandidat , data, { responseType: 'text'});
  } 

  updatePaiment(id:any, data:any){
    return this.httpclient.put(this.api+'/update-paiment-candidat/'+id, data, { responseType: 'text'})
  }
  addCategorie_depense(auto_ecole_id:any, data:any){ 
    return this.httpclient.post(this.api + '/add-categorie-depence/'+auto_ecole_id, data, { responseType: 'text'});
  }
  addMoniteurT(autID:any, data:any){
    return this.httpclient.post(this.api + '/add-moniteur-theorique/'+ autID, data, { responseType: 'text'});
  }
  updateMoniteurT(id:any, data:any){
    return this.httpclient.put(this.api+'/update-moniteur-theorique/'+id, data, { responseType: 'text'})
  }
updateMoniteurP(id:any, data:any){
  return this.httpclient.put(this.api+'/update-moniteur-pratique/'+id, data, { responseType: 'text'})
}
  deleteMoniteurT(id:any){
    return this.httpclient.delete(this.api + '/delete-moniteur-theorique/'+id, { responseType: 'text'});
  }
  deleteMoniteurP(id:any){
    return this.httpclient.delete(this.api + '/delete-moniteur-pratique/'+id, { responseType: 'text'});
  }
  addMoniteurP(auto_ecole_id:any, data:any){
    return this.httpclient.post(this.api + '/add-moniteur-pratique/'+auto_ecole_id, data, { responseType: 'text'});
   }  
   setLogo(id_autoEcole:any, data:any){
       return this.httpclient.put(this.api + '/auto-ecole/' + id_autoEcole + '/set-auto-ecole-logo', data, {responseType: 'text'});
   } 
   setPass(user_id:any, data:any){
    return this.httpclient.put(this.api + '/auto-ecole/' + user_id + '/set-user-pass', data, {responseType: 'text'});
    } 
  setEmail(data:any){ 
    return this.httpclient.put(this.api + '/reset-email', data, {responseType: 'text'});
  }
  
  getUserById(id:any){
    return this.httpclient.get(this.api + '/user/'+ id);
  }
  getUsersAutoEcole(){
    return this.httpclient.get(this.api + '/user');
  }
  test(){
    return this.httpclient.get('http://localhost:8000/test');
  }
  getUser(){
     return this.httpclient.get(this.api+`/logged`);
  }
  deleteUser(id:any){
    return this.httpclient.delete(this.api + '/delete-user/'+ id);
  }
  getLogo(id_aut:any){ 
    return this.httpclient.get(this.api + '/auto-ecole/' + id_aut + '/logo-auto-ecole');
  }
  getAllAutoEcole(){
    return this.httpclient.get(this.api + '/all-auto-ecole-admin');
  }
  getAutoEcoleApprover(){
    return this.httpclient.get(this.api + '/get-auto-ecoles-approuve');
  }
  getAbonnementAutoEcole(){
    return this.httpclient.get(this.api + '/get-abonnement-auto-ecoles');
  }
  getArchiveAutoEcole(){
    return this.httpclient.get(this.api + '/archive-auto-ecole');
  }
  recuperAutoEcole(id:any){ 
    return this.httpclient.post(this.api + '/recuperer-auto-ecole/'+id, { responseType: 'text'});
  }
  getAutoEcoleById(id:any){
    return this.httpclient.get(this.api + '/auto-ecole/'+ id);
  }
  getAutoEcoleByIdDeleted(id){
    return this.httpclient.get(this.api + '/get-auto-ecole-deleted/'+ id);
  }
  deletAutoEcole(id:any){
    return this.httpclient.delete(this.api + '/delete-auto-ecole/' + id);
  }
  getDataSuper(){
    return this.httpclient.get(this.api + '/superadmin/data', {responseType: 'text'});
  }
  getAutoEcolesEnAttente(){
    return this.httpclient.get(this.api + '/superadmin/auto-ecoles-en-attente', {responseType: 'text'});
  }
  approver(id:any){
    return this.httpclient.put(this.api + '/approver-auto-ecole/' +id , {responseType: 'text'});
  }
  desapprover(id:any){ 
    return this.httpclient.put(this.api + '/desapprover-auto-ecole/' +id , {responseType: 'text'});
  }
  getAllProduit(){
    return this.httpclient.get(this.api + '/get-produit-admin', {responseType: 'text'});
  }
  getProduitAdminById(id:any){
    return this.httpclient.get(this.api + '/get-produit-by-id/' + id);
  }
  getBoutique(){
    return this.httpclient.get<any[]>(this.api + '/get-boutique');
  }
  getVehiculeOccasion(){
    return this.httpclient.get<any[]>(this.api + '/get-vehicule-occassion');
  }
  deleteProduitAdmin(id:any){
    return this.httpclient.delete(this.api + '/delete-produit-admin/'+id, {responseType:'text'});
  }
  newProduit(data:any){
    return this.httpclient.post(this.api + '/new-produit',data, {responseType: 'text'});
  }
  getBlogs(){
    return this.httpclient.get(this.api + '/get-blogs', {responseType: 'text'});
  }
  getBlogById(id:any){
    return this.httpclient.get(this.api + '/get-blogId/'+ id);
  }
  UpdateBlog(id:any, data:any){
    return this.httpclient.put(this.api + '/update-blog-admin/' + id, data, {responseType: 'text'});
  }
  deletBlog(id:any){
    return this.httpclient.delete(this.api + '/delete-blog/'+id, {responseType:'text'});
  }

  addblog(data:any){
    return this.httpclient.post(this.api + '/new-blog', data, {responseType:'text'});
  }
  updateblog(id:any, data:any){
    return this.httpclient.put(this.api + '/update-blog-admin/' + id, data, {responseType: 'text'});
  }
getAbonnements(){
  return this.httpclient.get(this.api + '/get-abonnement-auto-ecoles', {responseType: 'text'});
}
getAbonnementById(id:any){
  return this.httpclient.get(this.api + '/get-abonnement/' + id, {responseType: 'text'});
}


newAbonnement(auto_id:any){
  return this.httpclient.post(this.api + '/auto-ecole/' + auto_id+ '/abonnement', {responseType: 'text'});
}
deletAbonnement(id:any){
  return this.httpclient.delete(this.api + '/delete-Abonnement/' + id, {responseType: 'text'});
}
getAbonnementAutoEcoles(id:any){
  return this.httpclient.get(this.api + '/get-abonnement-auto-ecole/' + id, {responseType: 'text'});
}

getabonnementByIdAUtoEcole(id:any){
  return this.httpclient.get(this.api + '/get-abonnement-autoEcole-id-autoEcole/' + id, {responseType: 'text'});
}

updateabonnement(id:any, data:any){
    return this.httpclient.put(this.api + '/update-abonnement-auto-ecole/' + id,data, {responseType: 'text'}); 
}

getIdAbonnement(idAutoEcole:any){ 
  return this.httpclient.get(this.api + '/get-id-abonnement-auto-ecole/' + idAutoEcole, {responseType: 'text'});
}

getMoniteurJobById(id:any){
  return this.httpclient.get(this.api + '/get-moniteurJob-admin/' + id, {responseType: 'text'});
}
getMoniteurJob(){
  return this.httpclient.get(this.api + '/get-moniteursJob-admin', {responseType: 'text'});
}
updateMoniteurJob(id:any, data:any){
  return this.httpclient.put(this.api + '/update-moniteurJob-admin/' + id, data, {responseType: 'text'});
}
addMoniteurJob(data:any){
  return this.httpclient.post(this.api + '/add-moniteursJob-admin', data, {responseType:'text'});
}
deleteMoniteurJob(id:any){
  return this.httpclient.delete(this.api + '/delete-moniteurJob-admin/'+id, {responseType:'text'});
}

getAutoecoleVendreById(id:any){
  return this.httpclient.get(this.api + '/get-autoecole-vendre-admin/' + id, {responseType: 'text'});
}
getAutoecoleVendre(){
  return this.httpclient.get(this.api + '/get-autoecole-vendre-admin', {responseType: 'text'});
}
updateAutoecoleVendre(id:any, data:any){
  return this.httpclient.put(this.api + '/update-autoecole-vendre-admin/' + id, data, {responseType: 'text'});
}
addAutoecoleVendre(data:any){ 
  return this.httpclient.post(this.api + '/add-autoecole-vendre-admin', data, {responseType:'text'});
}
deleteAutoecoleVendre(id:any){
  return this.httpclient.delete(this.api + '/delete-autoecole-vendre-admin/'+id, {responseType:'text'});
}

getNoteMinisterielleById(id:any){
  return this.httpclient.get(this.api + '/get-note-ministerielle/' + id, {responseType: 'text'});
}
getPdf(url:any){
  return this.httpclient.get(url);
}
getNoteMinisterielle(){
  return this.httpclient.get(this.api + '/get-note-ministerielle', {responseType: 'text'});
}

updateNoteMinisterielle(id:any, data:any){ 
  return this.httpclient.put(this.api + '/update-note-ministerielle/' + id, data, {responseType: 'text'});
}
addNoteMinisterielle(data:any){ 
  return this.httpclient.post(this.api + '/add-note-ministerielle', data, {responseType:'text'});
}
deleteNoteMinisterielle(id:any){
  return this.httpclient.delete(this.api + '/delete-note-ministerielle/'+id, {responseType:'text'});
}
// // absence moniteur theorique 

getAbsenceMoniteurTheorique(ecole_id:any){
  return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/absence-moniteur-theorique', {responseType: 'text'});
}

getAbsenceMoniteurTheoriqueById(id:any){
  return this.httpclient.get(this.api + '/absence-moniteur-theorique' + id, {responseType: 'text'});
}

addAbsenceMoniteurTheorique(ecole_id:any, data:any){
  return this.httpclient.post(this.api + '/add-absence-moniteur-theorique/'+ecole_id , data, {responseType:'text'});
}
updateAbsenceMoniteurTheorique(id:any, data:any){
  return this.httpclient.put(this.api + '/update-absence-moniteur-theorique/' + id, data, {responseType: 'text'});
}
deleteAbsenceTheorique(id:any){
  return this.httpclient.delete(this.api + '/delete-absence-moniteur-theorique/'+id, {responseType:'text'});
}
// // absence moniteur pratique 

getAbsenceMoniteurPratique(ecole_id:any){
  return this.httpclient.get(this.api + '/auto-ecole/'+ecole_id+'/absence-moniteur-pratique', {responseType: 'text'});
}

getAbsenceMoniteurPratiqueById(id:any){
  return this.httpclient.get(this.api + '/absence-moniteur-pratique' + id, {responseType: 'text'});
}

addAbsenceMoniteurPratique(ecole_id:any, data:any){
  return this.httpclient.post(this.api + '/add-absence-moniteur-pratique/'+ecole_id , data, {responseType:'text'});
}
updateAbsenceMoniteurPratique(id:any, data:any){
  return this.httpclient.put(this.api + '/update-absence-moniteur-pratique/' + id, data, {responseType: 'text'});
}
deleteAbsencePratique(id:any){
  return this.httpclient.delete(this.api + '/delete-absence-moniteur-pratique/'+id, {responseType:'text'});
}

getData() {
  return this.httpclient.get(this.api+`/logged`);
}
send(data:any){
  return this.httpclient.post(this.api+`/send-email-auto-ecole`, data, {responseType:'text'});
}
sendtoAll(data:any){
  return this.httpclient.post(this.api+`/send-to-all-email-auto-ecoles`, data, {responseType:'text'});
}
}

// Route::get('/auto-ecole/{ecole_id}/candidat-reussi', [ExamenController::class,'getCandidatReussi']);
// Route::get('/auto-ecole/{ecole_id}/candidat-Noreussi', [ExamenController::class,'getCandidatNoreussi']);
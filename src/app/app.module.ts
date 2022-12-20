import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SlideBarComponent } from './components/slide-bar/slide-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HttpClient , HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CandidatComponent } from './components/candidat/candidat.component';
import { CandidatFormComponent } from './forms/candidat-form/candidat-form.component';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { CoursPratiqueComponent } from './cours-pratique/cours-pratique.component';
import { ExamenComponent } from './examen/examen.component';
import { DepenceComponent } from './depence/depence.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoEcoleComponent } from './components/auto-ecole/auto-ecole.component';
import { AutoEcoleFormComponent } from './forms/auto-ecole-form/auto-ecole-form.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ButtonsCoursesComponent } from './components/buttons-courses/buttons-courses.component';
import { AuthInterceptor } from './models/auth/auth-interceptor';
import { ProduitComponent } from './produit/produit.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { DossierComponent } from './dossier/dossier.component';
import { FactureComponent } from './caisse/facture/facture.component';
import { RecetteComponent } from './caisse/recette/recette.component';
import { PaiementComponent } from './paiement/paiement.component';
import { CategorieDepenseComponent } from './config/categorie-depense/categorie-depense.component';
import { CategoriePermisComponent } from './config/categorie-permis/categorie-permis.component';
import { LangueComponent } from './config/langue/langue.component';
import { AbsenceComponent } from './absence/absence.component';
import { CandidatTrsfComponent } from './transition/candidat-trsf/candidat-trsf.component';
import { CaisseTrsfComponent } from './transition/caisse-trsf/caisse-trsf.component';
import { VehiculeTrsfComponent } from './transition/vehicule-trsf/vehicule-trsf.component';
import { ProduitTrsfComponent } from './transition/produit-trsf/produit-trsf.component';
import { ConfigTrsfComponent } from './transition/config-trsf/config-trsf.component';
import { HeaderComponent } from './components/header/header.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeadertopComponent } from './components/headertop/headertop.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { EcolesComponent } from './components/ecoles/ecoles.component';
import { NgImageSliderModule } from 'ng-image-slider';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { PrevDirective } from './prev.directive';
import { NextDirective } from './next.directive';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderloggedComponent } from './components/headerlogged/headerlogged.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { MenuSlideComponent } from './components/menu-slide/menu-slide.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { PlanTheoriqueComponent } from './components/plan-theorique/plan-theorique.component';
import { PlanPratiqueComponent } from './components/plan-pratique/plan-pratique.component';
import { VidangeComponent } from './components/vidange/vidange.component';
import { AbsenceListeComponent } from './components/absence-liste/absence-liste.component';
import { DevisComponent } from './caisse/devis/devis.component';
import { NotesComponent } from './configuration/notes/notes.component';
import { DepensesCategoriesComponent } from './configuration/depenses-categories/depenses-categories.component';
import { UtilisateursComponent } from './configuration/utilisateurs/utilisateurs.component';
import { MoniteurFormComponent } from './forms/moniteur-form/moniteur-form.component';
import { FacturationFormComponent } from './forms/facturation-form/facturation-form.component';
import { PaimentCandidatFormComponent } from './forms/paiment-candidat-form/paiment-candidat-form.component';
import { PresenceComponent } from './components/presence/presence.component';
import { ResultsCandidatsComponent } from './components/results-candidats/results-candidats.component';
import { PresencePratiqueComponent } from './components/presence-pratique/presence-pratique.component';
import { AdminComponent } from './admin/admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ArchiveAutoEcoleComponent } from './components/archive-auto-ecole/archive-auto-ecole.component';
import { AbonnementAutoEcoleComponent } from './components/abonnement-auto-ecole/abonnement-auto-ecole.component';
import { AdminBoutiqueComponent } from './components/admin-boutique/admin-boutique.component';
import { BlogAdminComponent } from './components/blog-admin/blog-admin.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { MessagerieAdminComponent } from './components/messagerie-admin/messagerie-admin.component';
import { ApprouveAdminComponent } from './components/approuve-admin/approuve-admin.component';
import { AutoEcoleEnAttenteComponent } from './components/auto-ecole-en-attente/auto-ecole-en-attente.component';
import { DetailAutoEcoleComponent } from './detail-auto-ecole/detail-auto-ecole.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { storageSyncMetaReducer } from 'ngrx-store-persist';
import { userReducer } from './state/user/user.reducer';
import { autoEcoleReducer } from './state/autoEcole/autoEcole.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user/user.effects';
import { candidatReducer } from './state/candidat/candidat.reducer';
import { vehiculeReducer } from './state/vehicule/vehicule.reducer';
import { VehiculeEffects } from './state/vehicule/vehicule.effect';
import { CandidatsEffects } from './state/candidat/candidat.effect';
import { examenReducer } from './state/examen/examen.reducer';
import { ExamenEffects } from './state/examen/examen.effects';
import { employeReducer } from './state/employe/employe.reducer';
import { EmployeEffects } from './state/employe/employe.effect';
import { absenceReducer } from './state/absence/absence.reducer';
import { AbsenceEffects } from './state/absence/absence.effect';
import { MoniteurComponent } from './components/moniteur/moniteur.component';
import { moniteurReducer } from './state/moniteur/moniteur.reducer';
import { courReducer } from './state/cours/cours.reducer';
import { MoniteurEffects } from './state/moniteur/moniteur.effect';
import { candidatPaimentReducer } from './state/peimentCandidat/paimentCandidat.reducer';
import { PaimentCandidatEffects } from './state/peimentCandidat/paimentCandidat.effect';
import { CoursEffects } from './state/cours/cours.effects';
import { ArchivecandidatEffects } from './state/archivecandidat/archivecandidat.effect';
import { archivecandidatReducer } from './state/archivecandidat/archivecandidat.reducer';
import { historiquecandidatReducer } from './state/historiquecandidat/historiquecandidat.reducer';
import { HistoriqueCandidatEffects } from './state/historiquecandidat/historiquecandidat.effect';
import { presencecourReducer } from './state/presencecours/presencecours.reducer';
import { PresencecourEffects } from './state/presencecours/presencetheorique.effect';
import { produitReducer } from './state/produit/produit.reducer';
import { ProduitsEffects } from './state/produit/produit.effect';
import { venteReducer } from './state/vente/vente.reducer';
import { VenteEffects } from './state/vente/vente.effects';
import { depenseReducer } from './state/depenses/depense.reducer';
import { DepenseEffects } from './state/depenses/depense.effect';
import { CategorieDepenseEffects } from './state/depenseCategorie/depenseCategorie.effect';
import { categorieDepenseReducer } from './state/depenseCategorie/depenseCategorie.reducer';
import { noteCategorieReducer } from './state/notesCategories/notesCategories.reducers';
import { NoteCategorieEffects } from './state/notesCategories/notesCategories.effect';
import { factureReducer } from './state/factures/factures.reducers';
import { FactureEffects } from './state/factures/factures.effect';
import { ProduitCandidatEffects } from './state/produitCandidat/produitCandidat.effect';
import { produitCandidatReducer } from './state/produitCandidat/produitCandidat.reducer';
import { coursSupplementaireReducer } from './state/coursSupplementaire/coursSupplementaire.reducers';
import { coursSupplementaireEffects } from './state/coursSupplementaire/coursSupplementaire.effect';
import { AdminMoniteurComponent } from './components/admin-moniteur/admin-moniteur.component';
import { AutoEcoleVendreComponent } from './components/auto-ecole-vendre/auto-ecole-vendre.component';
import { NoteMinisterielleComponent } from './components/note-ministerielle/note-ministerielle.component';
import { DepenseCategorieModalComponent } from './modal/depense-categorie-modal/depense-categorie-modal.component';
import { NoteModalComponent } from './modal/note-modal/note-modal.component';
import { FactureModalComponent } from './modal/facture-modal/facture-modal.component';
import { DepenseModelComponent } from './modal/depense-model/depense-model.component';
import { VenteModelComponent } from './modal/vente-model/vente-model.component';
import { ProduitModalComponent } from './modal/produit-modal/produit-modal.component';
import { AbsenceMoniteurModalComponent } from './modal/absence-moniteur-modal/absence-moniteur-modal.component';
import { MoniteurModalComponent } from './modal/moniteur-modal/moniteur-modal.component';
import { PaimentCandidatModalComponent } from './modal/paiment-candidat-modal/paiment-candidat-modal.component';
import { CourTheoriqueModalComponent } from './modal/cour-theorique-modal/cour-theorique-modal.component';
import { CourPratiqueModalComponent } from './modal/cour-pratique-modal/cour-pratique-modal.component';
import { PresenceTheoriquemodalComponent } from './modal/presence-theoriquemodal/presence-theoriquemodal.component';
import { VehiculeModalComponent } from './modal/vehicule-modal/vehicule-modal.component';
import { EmployeeModalComponent } from './modal/employee-modal/employee-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { DetailexamenmodalComponent } from './modal/detailexamenmodal/detailexamenmodal.component';
import { UpdateexamenmodalComponent } from './modal/updateexamenmodal/updateexamenmodal.component';
import { NoteexamenModalComponent } from './modal/noteexamen-modal/noteexamen-modal.component';
import { DepenselocalmodalComponent } from './modal/depenselocalmodal/depenselocalmodal.component';
import { DepensevehiculemodalComponent } from './modal/depensevehiculemodal/depensevehiculemodal.component';
import { DepensepersonnelmodalComponent } from './modal/depensepersonnelmodal/depensepersonnelmodal.component';
import { AbonnementmodalComponent } from './modal/abonnementmodal/abonnementmodal.component';
import { AbonementEffects } from './state/abonnement/abonnement.effect';
import { abonnemtReducer } from './state/abonnement/abonnemt.reducer';
import { ProduitAdminmodalComponent } from './modal/produit-adminmodal/produit-adminmodal.component';
import { DetailboutiquemodalComponent } from './modal/detailboutiquemodal/detailboutiquemodal.component';
import { MoniteurAdminmodalComponent } from './modal/moniteur-adminmodal/moniteur-adminmodal.component';
import { MoniteuradminEffects } from './state/moniteuradmin/moniteuradmin.effect';
import { moniteuradminReducer } from './state/moniteuradmin/moniteuradmin.reducers';
import { AutoecolevendreEffects } from './state/autoecolevendre/autoecolevendre.effect';
import { autoecolevendreReducer } from './state/autoecolevendre/autoecolevendre.reducer';
import { AutoecolevendreModalComponent } from './modal/autoecolevendre-modal/autoecolevendre-modal.component';
import { ministerielleReducer } from './state/ministerielle/ministerielle.reducer';
import { MinisterielleEffects } from './state/ministerielle/ministerielle.effect';
import { MinisteriellemodalComponent } from './modal/ministeriellemodal/ministeriellemodal.component';
import { BlogmodalComponent } from './modal/blogmodal/blogmodal.component';
import { BlogsEffects } from './state/blog/blog.effect';
import { blogReducer } from './state/blog/blog.reducers';
import { UsersEffects } from './state/users/users.effect';
import { usersReducer } from './state/users/users.reducers';
import { DetailautoecolemodalComponent } from './modal/detailautoecolemodal/detailautoecolemodal.component';
import { SuperAdminEffects } from './state/dataSuperAdmin/dataSuperAdmin.effects';
import { superAdminReducer } from './state/dataSuperAdmin/dataSuperAdmin.reducers';
import { AutoecolesEffects } from './state/autoecoles/autoecoles.effects';
import { autoecolesReducer } from './state/autoecoles/autoecoles.reducers';
import { autoEcolesEnAttenteReducer } from './state/autoecolesEnAttente/autoecolesEnAttente.reducers';
import { AutoecolesEnAttenteEffects } from './state/autoecolesEnAttente/autoecolesEnAttente.effects';
import { AutoecolesApproverEffects } from './state/autoecolesApprover/autoecolesApprover.effect';
import { autoEcolesApproverReducer } from './state/autoecolesApprover/autoecolesApprover.reducers';
import { ProduitSuperAdminEffects } from './state/produitSuperAdmin/produitSuperAdmin.effect';
import { produitSuperAdminReducer } from './state/produitSuperAdmin/produitSuperAdmin..reducers';
import { MenuSBComponent } from './components/menu-sb/menu-sb.component';
import { TableNotesComponent } from './tables/table-notes/table-notes.component';
import { DepenseCategorieLocalTableComponent } from './tables/depense-categorie-local-table/depense-categorie-local-table.component';
import { DepenseCategorieVehiculeComponent } from './tables/depense-categorie-vehicule/depense-categorie-vehicule.component';
import { DepenseCategoriePersonnelComponent } from './tables/depense-categorie-personnel/depense-categorie-personnel.component';
import { FacturieTableComponent } from './tables/facturie-table/facturie-table.component';
import { RecetteProduitCandidatTableComponent } from './tables/recette-produit-candidat-table/recette-produit-candidat-table.component';
import { DepenseInfoComponent } from './components/depense-info/depense-info.component';
import { RecetteInfoComponent } from './components/recette-info/recette-info.component';
import { UpdateAutoEcoleComponent } from './components/update-auto-ecole/update-auto-ecole.component';
import { AutoEcoleEffect } from './state/autoEcole/autoEcole.effects';
import { MatSliderModule } from '@angular/material/slider';
import { MinistreNotesComponent } from './components/ministre-notes/ministre-notes.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DuplicateDirective } from './duplicate.directive';
import { LogicielGaePlusComponent } from './components/logiciel-gae-plus/logiciel-gae-plus.component';
import { DetailProduitComponent } from './components/detail-produit/detail-produit.component';
import { VehiculeOccasionsComponent } from './components/vehicule-occasions/vehicule-occasions.component';
import { MonitorsComponent } from './components/monitors/monitors.component';
import { EcoleVendreListComponent } from './components/ecole-vendre-list/ecole-vendre-list.component';
import { MinistreNotesListeComponent } from './components/ministre-notes-liste/ministre-notes-liste.component';
import { ReinitialisePasswordComponent } from './components/reinitialise-password/reinitialise-password.component';
import { VerifyPinComponent } from './components/verify-pin/verify-pin.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PresencePratiqueModalComponent } from './modal/presence-pratique-modal/presence-pratique-modal.component';
import { AbsenceMoniteurComponent } from './components/absence-moniteur/absence-moniteur.component';
import { UpdateMoniteurAbsenceModalComponent } from './modal/update-moniteur-theorique-modal/update-moniteur-absence-modal.component';
import { AddAbsenceMoniteurComponent } from './modal/add-absence-moniteur/add-absence-moniteur.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { TableCandidatsSupplementaireComponent } from './tables/table-candidats-supplementaire/table-candidats-supplementaire.component';
import { TableDepenseLocalComponent } from './tables/table-depense-local/table-depense-local.component';
import { TableDepenseVehiculeComponent } from './tables/table-depense-vehicule/table-depense-vehicule.component';
import { TableDepensePersonnelComponent } from './tables/table-depense-personnel/table-depense-personnel.component';
import { TableCoursSupplementaireComponent } from './tables/table-cours-supplementaire/table-cours-supplementaire.component';
import { TableRecettePermisComponent } from './tables/table-recette-permis/table-recette-permis.component';
import { TableRecetteGeneraleComponent } from './tables/table-recette-generale/table-recette-generale.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { SafePipePipe } from './safe-pipe.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DetailBlogComponent } from './components/detail-blog/detail-blog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import { DetailEcoleComponent } from './components/detail-ecole/detail-ecole.component';
import { EcolesVendreComponent } from './components/ecoles-vendre/ecoles-vendre.component';
import { DetailEcoleVendreComponent } from './components/detail-ecole-vendre/detail-ecole-vendre.component';
import { DetailMonitorComponent } from './components/detail-monitor/detail-monitor.component';
import { BoutiqueEffects } from './state/boutique/boutique.effects';
import { boutiqueReducer } from './state/boutique/boutique.reducers';
import { VehiculeOccasionEffects } from './state/vehiculeOccasion/vehiculeOccasion.effects';
import { vehiculeOccasionReducer } from './state/vehiculeOccasion/vehiculeOccasion.reducers';
import { MoniteurJobEffects } from './state/moniteurJob/moniteurJob.effects';
import { moniteurJobReducer } from './state/moniteurJob/moniteurJob.reducers';
import { AutoEcoleWithAbonnementEffects } from './state/autoEcoleWithAbonnement/autoEcoleWithAbonnement.effects';
import { autoecolewithabonnementReducer } from './state/autoEcoleWithAbonnement/autoEcoleWithAbonnement.reducers';
import { TokenInterceptorService } from './token-interceptor.service';
import { CategorieModalComponent } from './modal/categorie-modal/categorie-modal.component';
import { NgxPrintModule } from 'ngx-print';
import { ModalImprimerLocalComponent } from './modal/modal-imprimer-local/modal-imprimer-local.component';
import { ModalImprimerVehiculeComponent } from './modal/modal-imprimer-vehicule/modal-imprimer-vehicule.component';
import { ModalImprimerPersonnelComponent } from './modal/modal-imprimer-personnel/modal-imprimer-personnel.component';
import { ModalImprimerDepenseComponent } from './modal/modal-imprimer-depense/modal-imprimer-depense.component';
import { AbsenceEmployeEffects } from './state/absenceEmploye/absenceEmploye.effect';
import { absenceEmployeReducer } from './state/absenceEmploye/absenceEmploye.reducer';
import { DetailExamenComponent } from './modal/detail-examen/detail-examen.component';
import { VehiculeDetailModelComponent } from './modal/vehicule-detail-model/vehicule-detail-model.component';
import { ModelRecuPaimentCandidatComponent } from './modal/model-recu-paiment-candidat/model-recu-paiment-candidat.component';
import { ContratFormationModalComponent } from './modal/contrat-formation-modal/contrat-formation-modal.component';
import { CertificatFormationModalComponent } from './modal/certificat-formation-modal/certificat-formation-modal.component';
import { CarteCandidatModalComponent } from './modal/carte-candidat-modal/carte-candidat-modal.component';
import { BodyDashboardComponent } from './components/body-dashboard/body-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs'; 
import {MatMenuModule} from '@angular/material/menu';
import { ContratAutoEcoleComponent } from './modal/contrat-auto-ecole/contrat-auto-ecole.component';
import { AbsenceMoniteurPratiqueEffects } from './state/absenceMoniteurPrarique/absenceMoniteurPratique.effect';
import { absenceMoniteurPratiqueReducer } from './state/absenceMoniteurPrarique/absenceMoniteurPratique.reducer';
import { moniteurPratiqueReducer } from './state/moniteurPratique/moniteurPratique.reducer';
import { MoniteurPratiqueEffects } from './state/moniteurPratique/moniteurPratique.effect';
import { ExamenNoReussiEffects } from './state/examenNoreussi/examenNoreussi.effects';
import { ExamenReussiEffects } from './state/examenreussi/examenreussi.effects';
import { examenreussiReducer } from './state/examenreussi/examenreussi.reducer';
import { examenNoreussiReducer } from './state/examenNoreussi/examenNoreussi.reducer';
import { visiteTechniqueReducer } from './state/visiteTechnique/visiteTechnique.reducer';
import { VisiteTechniqueEffects } from './state/visiteTechnique/visiteTechnique.effects';
import { vidangeReducer } from './state/vidange/vidange.reducer';
import { VidangeEffects } from './state/vidange/vidange.effects';
import { assuranceReducer } from './state/assurance/assurance.reducer';
import { AssuranceEffects } from './state/assurance/assurance.effects';
import { VenteComponent } from './vente/vente.component';
import { InstallationComponent } from './components/installation/installation.component';
import { InstallationMoniteursComponent } from './components/installation-moniteurs/installation-moniteurs.component';
import { InstallationcategorieDepensePersonnelComponent } from './components/installationcategorie-depense-personnel/installationcategorie-depense-personnel.component';
import { InstallationCategorieDepenseVehiculeComponent } from './components/installation-categorie-depense-vehicule/installation-categorie-depense-vehicule.component';
import { InstallationCategorieDepenseLocalComponent } from './components/installation-categorie-depense-local/installation-categorie-depense-local.component';
import { InstallationNoteCategorieComponent } from './components/installation-note-categorie/installation-note-categorie.component';

export function httpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
};
const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    MoniteurComponent,
    AppComponent,
    LoginComponent,
    SlideBarComponent,
    CandidatComponent,
    CandidatFormComponent,
    CoursPratiqueComponent,
    ExamenComponent,
    PresenceComponent,
    DepenceComponent,
    AutoEcoleComponent,
    AutoEcoleFormComponent,
    VehiculeComponent,
    EmployeeComponent,
    ButtonsCoursesComponent,
    ProduitComponent,
    ProduitFormComponent,
    DossierComponent,
    FactureComponent,
    RecetteComponent,
    PaiementComponent,
    CategorieDepenseComponent,
    CategoriePermisComponent,
    LangueComponent,
    AbsenceComponent,
    CandidatTrsfComponent,
    CaisseTrsfComponent,
    VehiculeTrsfComponent,
    ProduitTrsfComponent,
    ConfigTrsfComponent,
    HeaderComponent,
    SignUpComponent,
    HeadertopComponent,
    AproposComponent,
    EcolesComponent,
    BoutiqueComponent,
    ContactComponent,
    BlogComponent,
    PrevDirective,
    NextDirective,
    DashboardComponent,
    HeaderloggedComponent,
    ParametresComponent,
    MenuSlideComponent,
    HistoriqueComponent,
    ArchiveComponent,
    PlanTheoriqueComponent,
    PlanPratiqueComponent,
    VidangeComponent,
    AbsenceListeComponent,
    DepenceComponent,
    DevisComponent,
    NotesComponent,
    DepensesCategoriesComponent,
    UtilisateursComponent,
    MoniteurFormComponent,
    FacturationFormComponent,
    PaimentCandidatFormComponent,
    ResultsCandidatsComponent,
    PresencePratiqueComponent,
    AdminComponent,
    VenteComponent,
    MenuAdminComponent,
    ArchiveAutoEcoleComponent,
    AbonnementAutoEcoleComponent,
    AdminBoutiqueComponent,
    BlogAdminComponent,
    UsersAdminComponent,
    MessagerieAdminComponent,
    ApprouveAdminComponent,
    AutoEcoleEnAttenteComponent,
    DetailAutoEcoleComponent,
    AdminMoniteurComponent,
    AutoEcoleVendreComponent,
    NoteMinisterielleComponent,
    DepenseCategorieModalComponent,
    NoteModalComponent,
    FactureModalComponent,
    DepenseModelComponent,
    VenteModelComponent,
    ProduitModalComponent,
    AbsenceMoniteurModalComponent,
    MoniteurModalComponent,
    PaimentCandidatModalComponent,
    CourTheoriqueModalComponent,
    CourPratiqueModalComponent,
    PresenceTheoriquemodalComponent,
    VehiculeModalComponent,
    EmployeeModalComponent,
    DetailexamenmodalComponent,
    UpdateexamenmodalComponent,
    NoteexamenModalComponent,
    DepenselocalmodalComponent,
    DepensevehiculemodalComponent,
    DepensepersonnelmodalComponent,
    AbonnementmodalComponent,
    ProduitAdminmodalComponent,
    DetailboutiquemodalComponent,
    MoniteurAdminmodalComponent,
    AutoecolevendreModalComponent,
    MinisteriellemodalComponent,
    BlogmodalComponent,
    DetailautoecolemodalComponent,
    MenuSBComponent,
    TableNotesComponent,
    DepenseCategorieLocalTableComponent,
    DepenseCategorieVehiculeComponent,
    DepenseCategoriePersonnelComponent,
    FacturieTableComponent,
    RecetteProduitCandidatTableComponent,
    DepenseInfoComponent,
    RecetteInfoComponent,
    UpdateAutoEcoleComponent,
    MinistreNotesComponent,
    CarouselComponent,
    DuplicateDirective,
    LogicielGaePlusComponent,
    DetailProduitComponent,
    VehiculeOccasionsComponent,
    MonitorsComponent,
    EcoleVendreListComponent,
    MinistreNotesListeComponent,
    ReinitialisePasswordComponent,
    VerifyPinComponent,
    ResetPasswordComponent,
    PresencePratiqueModalComponent,
    AbsenceMoniteurComponent,
    UpdateMoniteurAbsenceModalComponent,
    AddAbsenceMoniteurComponent,
    VerifyAccountComponent,
    TableCandidatsSupplementaireComponent,
    TableDepenseLocalComponent,
    TableDepenseVehiculeComponent,
    TableDepensePersonnelComponent,
    TableCoursSupplementaireComponent,
    TableRecettePermisComponent,
    TableRecetteGeneraleComponent,
    SafePipePipe,
    DetailBlogComponent,
    DetailEcoleComponent,
    EcolesVendreComponent,
    DetailEcoleVendreComponent,
    DetailMonitorComponent,
    CategorieModalComponent,
    ModalImprimerLocalComponent,
    ModalImprimerVehiculeComponent,
    ModalImprimerPersonnelComponent,
    ModalImprimerDepenseComponent,
    DetailExamenComponent,
    VehiculeDetailModelComponent,
    ModelRecuPaimentCandidatComponent,
    ContratFormationModalComponent,
    CertificatFormationModalComponent,
    CarteCandidatModalComponent,
    BodyDashboardComponent,
    ContratAutoEcoleComponent,
    InstallationComponent,
    InstallationMoniteursComponent,
    InstallationcategorieDepensePersonnelComponent,
    InstallationCategorieDepenseVehiculeComponent,
    InstallationCategorieDepenseLocalComponent,
    InstallationNoteCategorieComponent,
  ],
  imports: [
    MatMenuModule,
    MatTabsModule,
    NgxPrintModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    DragDropModule,
    MatSortModule,
    MatIconModule,
    MatRadioModule,
    SlickCarouselModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSortModule,
    MatSelectModule,
    HighchartsChartModule,
    IvyCarouselModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSliderModule,
    NgImageSliderModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    NgWizardModule.forRoot(ngWizardConfig),
    EffectsModule.forRoot([
      UserEffects,
      VehiculeEffects,
      CandidatsEffects,
      ExamenEffects,
      EmployeEffects,
      AbsenceEffects,
      MoniteurEffects,
      PaimentCandidatEffects,
      CoursEffects,
      ArchivecandidatEffects,
      HistoriqueCandidatEffects,
      PresencecourEffects,
      ProduitsEffects,
      VenteEffects,
      DepenseEffects,
      CategorieDepenseEffects,
      NoteCategorieEffects,
      FactureEffects,
      ProduitCandidatEffects,
      coursSupplementaireEffects,
      AbonementEffects,
      MoniteuradminEffects,
      MinisterielleEffects,
      AutoecolevendreEffects,
      BlogsEffects,
      UsersEffects,
      SuperAdminEffects,
      AutoecolesEffects,
      AutoecolesEnAttenteEffects,
      AutoecolesApproverEffects,
      ProduitSuperAdminEffects,
      AutoEcoleEffect,
      BoutiqueEffects,
      VehiculeOccasionEffects,
      MoniteurJobEffects,
      AutoEcoleWithAbonnementEffects,
      AbsenceEmployeEffects,
      AbsenceMoniteurPratiqueEffects,
      MoniteurPratiqueEffects,
      ExamenNoReussiEffects,
      ExamenReussiEffects,
      VisiteTechniqueEffects,
      VidangeEffects,
      AssuranceEffects
    ]),
    StoreModule.forRoot({
      user: userReducer,
      autoEcole: autoEcoleReducer,
      candidat: candidatReducer,
      vehicule: vehiculeReducer,
      examen: examenReducer,
      employe: employeReducer,
      absence: absenceReducer,
      absenceEmploye:absenceEmployeReducer,
      moniteur: moniteurReducer, 
      cour: courReducer,
      paimentCandidat: candidatPaimentReducer,
      archivecandidat: archivecandidatReducer,
      historiquecandidat: historiquecandidatReducer,
      presencecour: presencecourReducer,
      produitA:produitReducer,
      vente: venteReducer,
      depense: depenseReducer,
      categorieDepense: categorieDepenseReducer,
      noteCategorie   :noteCategorieReducer,
      facture: factureReducer,
      produitCandidat: produitCandidatReducer,
      coursRecette: coursSupplementaireReducer,
      abonement: abonnemtReducer,
      moniteuradmin: moniteuradminReducer,
      autoecolevendre: autoecolevendreReducer,
      ministerielle: ministerielleReducer,
      blog: blogReducer,
      users: usersReducer,
      dataSuperAdmin: superAdminReducer,
      autoecoles: autoecolesReducer,
      autoecolesEnAttente: autoEcolesEnAttenteReducer,
      autoecolesApprover: autoEcolesApproverReducer,
      produitSuperAdmin: produitSuperAdminReducer,
      boutique: boutiqueReducer,
      vehiculeOccasion: vehiculeOccasionReducer,
      moniteurJob: moniteurJobReducer,
      autoEcoleWithAbonnement: autoecolewithabonnementReducer,
      absenceMoniteurPratique: absenceMoniteurPratiqueReducer,
      moniteurPratique:moniteurPratiqueReducer,
      examenreussi: examenreussiReducer,
      examenNoreussi:examenNoreussiReducer,
      visiteTechnique: visiteTechniqueReducer,
      vidange:vidangeReducer,
      assurance:assuranceReducer
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production
    }),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage : 'en-FR',
      loader:{
        provide : TranslateLoader,
        useFactory :httpLoaderFactory,
        deps : [ HttpClient]
      }
    }),
    NgbModule,
    
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})

export class AppModule { }
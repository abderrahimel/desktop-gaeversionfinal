import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatComponent } from './components/candidat/candidat.component';
import { LoginComponent } from './components/login/login.component';
import { CoursPratiqueComponent } from './cours-pratique/cours-pratique.component';
import { DepenceComponent } from './depence/depence.component';
import { ExamenComponent } from './examen/examen.component';
import { CandidatFormComponent } from './forms/candidat-form/candidat-form.component';
import { CoursTheoriqueFormComponent } from './forms/cours-theorique-form/cours-theorique-form.component';
import { DepenceFormComponent } from './forms/depence-form/depence-form.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { VehiculeComponent } from './components/vehicule/vehicule.component';
import { ProduitComponent } from './produit/produit.component';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { PaiementComponent } from './paiement/paiement.component';
import { FactureComponent } from './caisse/facture/facture.component';
import { RecetteComponent } from './caisse/recette/recette.component';
import { VenteComponent } from './vente/vente.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AproposComponent } from './components/apropos/apropos.component';
import { EcolesComponent } from './components/ecoles/ecoles.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ParametresComponent } from './components/parametres/parametres.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { PlanTheoriqueComponent } from './components/plan-theorique/plan-theorique.component';
import { PlanPratiqueComponent } from './components/plan-pratique/plan-pratique.component';
import { VidangeComponent } from './components/vidange/vidange.component';
import { AbsenceformComponent } from './forms/absence/absence.component';
import { AbsenceListeComponent } from './components/absence-liste/absence-liste.component';
import { DevisComponent } from './caisse/devis/devis.component';
import { NotesComponent } from './configuration/notes/notes.component';
import { DepensesCategoriesComponent } from './configuration/depenses-categories/depenses-categories.component';
import { UtilisateursComponent } from './configuration/utilisateurs/utilisateurs.component';
import { VidangeFormComponent } from './forms/vidange-form/vidange-form.component';
import { MoniteurFormComponent } from './forms/moniteur-form/moniteur-form.component';
import { FacturationFormComponent } from './forms/facturation-form/facturation-form.component';
import { DevisFormComponent } from './forms/devis-form/devis-form.component';
import { PaimentCandidatFormComponent } from './forms/paiment-candidat-form/paiment-candidat-form.component';
import { PresenceComponent } from './components/presence/presence.component';
import { ResultsCandidatsComponent } from './components/results-candidats/results-candidats.component';
import { PresenceFormComponent } from './forms/presence-form/presence-form.component';
import { PresencePratiqueFormComponent } from './forms/presence-pratique-form/presence-pratique-form.component';
import { PresencePratiqueComponent } from './components/presence-pratique/presence-pratique.component';
import { ProtectRouteGuardGuard } from './protect-route-guard.guard';
import { AdminComponent } from './admin/admin.component';
import { AutoEcoleComponent } from './components/auto-ecole/auto-ecole.component';
import { ArchiveAutoEcoleComponent } from './components/archive-auto-ecole/archive-auto-ecole.component';
import { AbonnementAutoEcoleComponent } from './components/abonnement-auto-ecole/abonnement-auto-ecole.component';
import { AdminBoutiqueComponent } from './components/admin-boutique/admin-boutique.component';
import { BlogAdminComponent } from './components/blog-admin/blog-admin.component';
import { UsersAdminComponent } from './components/users-admin/users-admin.component';
import { ApprouveAdminComponent } from './components/approuve-admin/approuve-admin.component';
import { AutoEcoleEnAttenteComponent } from './components/auto-ecole-en-attente/auto-ecole-en-attente.component';
import { DetailAutoEcoleComponent } from './detail-auto-ecole/detail-auto-ecole.component';
import { MessagerieAdminComponent } from './components/messagerie-admin/messagerie-admin.component';
import { SuperAdminGuardGuard } from './super-admin-guard.guard';
import { AutoAdminGuardGuard } from './auto-admin-guard.guard';
import { RouteResolver } from './resolvers/route.resolver';
import { MoniteurComponent } from './components/moniteur/moniteur.component';
import { AdminMoniteurComponent } from './components/admin-moniteur/admin-moniteur.component';
import { AutoEcoleVendreComponent } from './components/auto-ecole-vendre/auto-ecole-vendre.component';
import { NoteMinisterielleComponent } from './components/note-ministerielle/note-ministerielle.component';
import { DepenseInfoComponent } from './components/depense-info/depense-info.component';
import { RecetteInfoComponent } from './components/recette-info/recette-info.component';
import { UpdateAutoEcoleComponent } from './components/update-auto-ecole/update-auto-ecole.component';
import { MinistreNotesComponent } from './components/ministre-notes/ministre-notes.component';
import { LogicielGaePlusComponent } from './components/logiciel-gae-plus/logiciel-gae-plus.component';
import { DetailProduitComponent } from './components/detail-produit/detail-produit.component';
import { EcoleVendreListComponent } from './components/ecole-vendre-list/ecole-vendre-list.component';
import { VehiculeOccasionsComponent } from './components/vehicule-occasions/vehicule-occasions.component';
import { MonitorsComponent } from './components/monitors/monitors.component';
import { MinistreNotesListeComponent } from './components/ministre-notes-liste/ministre-notes-liste.component';
import { ReinitialisePasswordComponent } from './components/reinitialise-password/reinitialise-password.component';
import { VerifyPinComponent } from './components/verify-pin/verify-pin.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AbsenceMoniteurComponent } from './components/absence-moniteur/absence-moniteur.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';
import { DetailBlogComponent } from './components/detail-blog/detail-blog.component';
import { DetailEcoleComponent } from './components/detail-ecole/detail-ecole.component';
import { EcolesVendreComponent } from './components/ecoles-vendre/ecoles-vendre.component';
import { DetailEcoleVendreComponent } from './components/detail-ecole-vendre/detail-ecole-vendre.component';
import { DetailMonitorComponent } from './components/detail-monitor/detail-monitor.component';
import { InstallationComponent } from './components/installation/installation.component';
import { InstallationMoniteursComponent } from './components/installation-moniteurs/installation-moniteurs.component';
import { InstallationcategorieDepensePersonnelComponent } from './components/installationcategorie-depense-personnel/installationcategorie-depense-personnel.component';
import { InstallationCategorieDepenseVehiculeComponent } from './components/installation-categorie-depense-vehicule/installation-categorie-depense-vehicule.component';
import { InstallationCategorieDepenseLocalComponent } from './components/installation-categorie-depense-local/installation-categorie-depense-local.component';
import { InstallationNoteCategorieComponent } from './components/installation-note-categorie/installation-note-categorie.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'forgot-password', component: ReinitialisePasswordComponent, pathMatch: 'full' },
  { path: 'verify/pin', component: VerifyPinComponent, pathMatch: 'full' },
  { path: 'reset-password', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'register', component: SignUpComponent, pathMatch: 'full' },
  { path: 'j2hb', component: AproposComponent, pathMatch: 'full' },
  { path: 'installation_vehicule', component: InstallationComponent, pathMatch: 'full' },
  { path: 'installation_moniteurs', component: InstallationMoniteursComponent, pathMatch: 'full' },
  { path: 'installation_categorie_depencePersonnel', component: InstallationcategorieDepensePersonnelComponent, pathMatch: 'full' },
  { path: 'installation_categorie_depenceVehicule', component: InstallationCategorieDepenseVehiculeComponent, pathMatch: 'full' },
  { path: 'installation_categorie_depenceLocal', component: InstallationCategorieDepenseLocalComponent, pathMatch: 'full' },
  { path: 'installation_note_categorie', component: InstallationNoteCategorieComponent, pathMatch: 'full' },
  { path: 'ecoles', component: EcolesComponent, pathMatch: 'full' },
  { path: 'boutique-j2hb', component: BoutiqueComponent, pathMatch: 'full' },
  { path: 'ecoles-vendre', component: EcolesVendreComponent, pathMatch: 'full' },
  { path: 'detail-ecole-vendre/:id', component: DetailEcoleVendreComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  { path: 'detail-produit/:id', component: DetailProduitComponent, pathMatch: 'full' },
  { path: 'apropos', component: LogicielGaePlusComponent, pathMatch: 'full' },
  { path: 'actualite', component: BlogComponent, pathMatch: 'full' },
  { path: 'actualite/:id', component: DetailBlogComponent, pathMatch: 'full' },
  { path: 'detail-ecole/:id', component: DetailEcoleComponent, pathMatch: 'full' },
  { path: 'vehicule-occasion', component: VehiculeOccasionsComponent, pathMatch: 'full' },
  { path: 'monitors-job', component: MonitorsComponent, pathMatch: 'full' },
  { path: 'detail-monitor/:id', component: DetailMonitorComponent, pathMatch: 'full' },
  { path: 'ministre_notes', component: MinistreNotesComponent, pathMatch: 'full' },
  { path: 'ministre_notes/:id', component: MinistreNotesListeComponent, pathMatch: 'full' },
  { path: 'email/verify', component: VerifyAccountComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'admin-moniteur', component: AdminMoniteurComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'admin-ecole-vendre', component: AutoEcoleVendreComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'notes_min', component: NoteMinisterielleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'gestion-auto-ecole', component: AutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'archive-auto-ecole', component: ArchiveAutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'abonnement', component: AbonnementAutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'admin-boutique', component: AdminBoutiqueComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'blog', component: BlogAdminComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'messagerie', component: MessagerieAdminComponent, pathMatch: 'full' },
  { path: 'gestion-users', component: UsersAdminComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'gestion-approuve-ecole', component: ApprouveAdminComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'gestion-enattente-ecole', component: AutoEcoleEnAttenteComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'detail-auto-ecole/:id', component: DetailAutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'detail-auto-ecole/:id/archive', component: DetailAutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, SuperAdminGuardGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'listes-moniteurs', component: MoniteurComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'candidat', component: CandidatComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'historique-candidats', component: HistoriqueComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'archive-candidat', component: ArchiveComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'parametres', component: ParametresComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'candidat_form', component: CandidatFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'candidat/:id', component: CandidatFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-examens', component: ExamenComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'ajouter-cour', component: CoursTheoriqueFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-cours', component: PlanTheoriqueComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-presencesC', component: PresenceComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },  
  { path: 'listes-presences', component: PresencePratiqueComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'update-presence/:id', component: PresenceFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'update-presence-pratique/:id', component: PresencePratiqueFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'cours-modifier/:id', component: CoursTheoriqueFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-conduitdes', component: PlanPratiqueComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-conduites', component: CoursPratiqueComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-resultatV', component: ResultsCandidatsComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-depenses', component: DepenceComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'depense_form', component: DepenceFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-employees', component: EmployeeComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'vehicule', component: VehiculeComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'monitors', component: MonitorsComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'ecole-vendre', component: EcoleVendreListComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard, SuperAdminGuardGuard]},
  { path: 'listes-vidange', component: VidangeComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'ajouter-vidange', component: VidangeFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'depense-info/:id', component: DepenseInfoComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'produit_form', component: ProduitFormComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'produit_form/:id', component: ProduitFormComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'produit', component: ProduitComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'update-moniteur-theorique/:id', component: MoniteurFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'update-moniteur-pratique/:id', component: MoniteurFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-paiement/:id', component: PaiementComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'form-paiementCandidat/:id', component: PaimentCandidatFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'form-paiement/:id', component: PaimentCandidatFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'paiement/:id', component: PaimentCandidatFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'ajouter-moniteur', component: MoniteurFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard]},
  { path: 'listes-factures', component: FactureComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-notes', component: NotesComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-recettes', component: RecetteComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'recette-info/:id', component: RecetteInfoComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-devis', component: DevisComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'nouvel-devis', component: DevisFormComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'ajoute-facture', component: FacturationFormComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'update-facture/:id', component: FacturationFormComponent, canActivate: [ProtectRouteGuardGuard] },
  { path: 'ajouter-absence', component: AbsenceformComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'update-absence/:id', component: AbsenceformComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-absences', component: AbsenceListeComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-absencesM', component: AbsenceMoniteurComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'vente', component: VenteComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-depense-categories', component: DepensesCategoriesComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'auto-ecole', component: UpdateAutoEcoleComponent, canActivate: [ProtectRouteGuardGuard, AutoAdminGuardGuard] },
  { path: 'listes-utilisateurs', component: UtilisateursComponent, canActivate: [ProtectRouteGuardGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteResolver]
})
export class AppRoutingModule { }
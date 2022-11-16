import { createAction, props } from "@ngrx/store";


export const loadproduitCandidat = createAction('[produitCandidat] load produit Candidat to store', props<{idAutoEcole:any}>());
export const loadproduitCandidatToStore = createAction('[produitCandidat] load produit Candidat to store', props<{payload:any}>());


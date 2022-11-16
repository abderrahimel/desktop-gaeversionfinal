import { createAction, props } from "@ngrx/store";


export const loadProduit = createAction('[produit] load produit to store', props<{idAutoEcole:any}>());
export const loadProduitToStore = createAction('[produit] load produit to store', props<{payload:any}>());
export const deletProduit = createAction('[produit] delet produit by id', props<{id:any}>());
export const addProduit = createAction('[produit] add produit by id', props<{idAutoEcole:any, data:any}>());
export const updateProduit = createAction('[produit] update produit by id', props<{id:any, data:any}>());

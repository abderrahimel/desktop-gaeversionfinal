import { createAction, props } from "@ngrx/store";

export const loadProduitSuperAdmin = createAction('[ProduitSuperAdmin] load Produit Super Admin'); 
export const loadProduitSuperAdmintostoreaction = createAction("[ProduitSuperAdmin] load Produit Super Admin to store", props<{payload:any}>()); 
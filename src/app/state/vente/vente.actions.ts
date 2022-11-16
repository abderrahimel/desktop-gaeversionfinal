import { createAction, props } from "@ngrx/store";

export const loadVente = createAction('[vente] load vente to store', props<{idAuto:any}>());
export const loadVenteToStore = createAction('[vente] load vente to store', props<{payload:any}>());
export const deleteVente = createAction('[vente] delete vente by id', props<{id:any}>());

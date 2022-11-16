import { createAction, props } from "@ngrx/store";


export const loadfactures = createAction('[factures] load factures to store', props<{idAutoEcole:any}>());
export const loadfacturesToStore = createAction('[factures] load factures to store', props<{payload:any}>());
export const deletfactures = createAction('[factures] delet facture categorie by id', props<{id:any}>());
export const addfactures = createAction('[factures] add  to the db', props<{idAutoEcole:any, data:any}>());
export const updatefactures = createAction('[factures] update facture to the db', props<{id:any, data:any}>());

